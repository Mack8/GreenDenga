import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import CentroAcopioService from "../../services/CentroAcopioService";
import UsuariosService from "../../services/UsuariosService";
import MaterialesService from "../../services/MaterialesService";
import CanjeService from "../../services/CanjeService";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate,Route} from "react-router-dom";

export function CreateCanjeForm() {
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const admin = userData?.id;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    fecha_canje: yup.date().required("La fecha del canje es requerida"),
    cliente: yup.string().required("El cliente es requerido"),
    centro_acopio: yup.string().required("El centro de acopio es requerido"),
    detalles: yup.array().of(
      yup.object().shape({
        tipo_material: yup.string().required("El material es requerido"),
        cantidad: yup.number().positive().required("La cantidad es requerida"),
      })
    ),
  });

  const [materiales, setMateriales] = useState([]);
  const [centrosAcopio, setCentrosAcopio] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadedMateriales, setLoadedMateriales] = useState(false);
  const [loadedCentrosAcopio, setLoadedCentrosAcopio] = useState(false);
  const [loadedClientes, setLoadedClientes] = useState(false);
  const [centroAcopioSeleccionadoId, setCentroAcopioSeleccionadoId] =
    useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);


  

  useEffect(() => {
    CentroAcopioService.getByAdministrador(admin)
      .then((response) => {
        setCentrosAcopio(response.data.results);
        setLoadedCentrosAcopio(true);
        setCentroAcopioSeleccionadoId(response.data.results.id);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setLoadedCentrosAcopio(true);
      });

    UsuariosService.get()
      .then((response) => {
        setClientes(response.data.results);
        setLoadedClientes(true);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setLoadedClientes(true);
      });
  }, []);

  useEffect(() => {
    if (centroAcopioSeleccionadoId) {
      MaterialesService.getMaterialesByCentroAcopio(centroAcopioSeleccionadoId)
        .then((response) => {
          setMateriales(response.data.results);
          console.log(response.data.results);
          setLoadedMateriales(true);
        })
        .catch((error) => {
          console.error(error);
          setLoadedMateriales(true);
        });
    }
  }, [centroAcopioSeleccionadoId]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fecha_canje: "",
      cliente: "",
      centro_acopio: centroAcopioSeleccionadoId,
      detalles: [],
    },
  });

  useEffect(() => {
    // Establecer la fecha actual como valor predeterminado
    setValue("fecha_canje", format(new Date(), "yyyy-MM-dd"));
  }, [setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "detalles",
  });

  const calculateSubtotal = (index) => {
    const cantidad = Number(watch(`detalles[${index}].cantidad`)) || 0;
    const tipoMaterialId = watch(`detalles[${index}].tipo_material`) || "";
    const material = materiales.find((m) => m.id === tipoMaterialId);
    const precioMaterial = material ? parseFloat(material.precio_ecomoneda) : 0;
    const subtotal = cantidad * precioMaterial;
    return isNaN(subtotal) ? 0 : subtotal;
  };

  const calculateTotal = () => {
    let total = 0;
    fields.forEach((_, index) => {
      total += calculateSubtotal(index);
    });
    return total;
  };

  const getPrecioMaterial = (tipoMaterialId) => {
    const material = materiales.find((m) => m.id === tipoMaterialId);
    return material ? parseFloat(material.precio_ecomoneda).toFixed(2) : "N/A";
  };

  useEffect(() => {
    fields.forEach((_, index) => {
      setValue(`detalles[${index}].subtotal`, calculateSubtotal(index));
    });
  }, [fields, watch, setValue]);

  useEffect(() => {
    setValue("Total", calculateTotal());
  }, [fields, watch, setValue]);

  const prepareFormData = (data) => {
    // Convertir la fecha a un formato adecuado para el backend
    const fechaCanje = format(new Date(data.fecha_canje), "yyyy-MM-dd");

    // Calcular el subtotal para cada detalle
    const detalles = data.detalles.map((detalle) => ({
      ...detalle,
      subtotal: calculateSubtotal(data.detalles.indexOf(detalle)),
    }));

    // Calcular el total sumando los subtotales
    const total = calculateTotal();

    return {
      ...data,
      fecha_canje: fechaCanje,
      detalles: detalles,
      Total: total,
    };
  };

  const handleMaterialChange = (index, selectedMaterialId) => {
    if (selectedMaterialId && loadedMateriales) {
      const material = materiales.find((m) => m.id === selectedMaterialId);
      const precioMaterial = material
        ? parseFloat(material.precio_ecomoneda).toFixed(2)
        : "N/A";

      setValue(`detalles[${index}].cantidad`, 1);
      setValue(`detalles[${index}].subtotal`, calculateSubtotal(index));
      setValue(`detalles[${index}].precio_ecomoneda`, precioMaterial);
    }
  };

  const onSubmit = (data) => {
    console.log("Submit button clicked!");
    const formData = prepareFormData(data);
    console.log(data);
    CanjeService.createCanje(formData)
      .then((response) => {
        console.log("Canje creado con éxito:", response.data);

        // Mostrar SweetAlert2 con un temporizador
        Swal.fire({
          icon: "success",
          title: "Canje creado con éxito",
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          // Redirigir después de que SweetAlert2 se cierre
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Error al crear el canje:", error);
        Swal.fire({
          icon: "error",
          title: "Error al crear el canje",
          showConfirmButton: false,
          timer: 4000,
        });
      });
  };

  const handleCentroAcopioChange = (event) => {
    // Lógica para manejar el cambio en el centro de acopio
    const selectedCentroAcopioId = event.target.value;
    setCentroAcopioSeleccionadoId(selectedCentroAcopioId);
  };

  const handleClienteChange = (event) => {
    const selectedClienteId = event.target.value;
    const cliente = clientes.find((c) => c.id === selectedClienteId);
    setSelectedCliente(cliente);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Crear Canje
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Controller
              name="cliente"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Cliente"
                  error={Boolean(errors.cliente)}
                  helperText={errors.cliente?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleClienteChange(e);
                  }}
                >
                  {loadedClientes &&
                    clientes.map((cliente) => (
                      <MenuItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre_completo}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Controller
              name="selectedClienteNombre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  value={
                    selectedCliente ? selectedCliente.correo_electronico : ""
                  }
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Controller
              name="selectedClienteIdentificacion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Identificación"
                  value={selectedCliente ? selectedCliente.identificacion : ""}
                  InputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Controller
              name="fecha_canje"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label=""
                  error={Boolean(errors.fechaCanje)}
                  helperText={errors.fechaCanje?.message}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Controller
              name="centro_acopio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Centro de Acopio"
                  error={Boolean(errors.centro_acopio)}
                  helperText={errors.centro_acopio?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCentroAcopioChange(e);
                  }}
                >
                  {loadedCentrosAcopio &&
                    centrosAcopio &&
                    centrosAcopio.map((centro) => (
                      <MenuItem key={centro.id} value={centro.id}>
                        {centro.nombre}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <TextField
              name="total"
              type="text"
              label="Total"
              value={calculateTotal().toFixed(2)} // Formatear a dos decimales
              disabled
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: Boolean(calculateTotal()) }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Detalles del Canje
          </Typography>
        </Grid>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name={`detalles[${index}].tipo_material`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Material"
                        error={Boolean(
                          errors.detalles &&
                            errors.detalles[index] &&
                            errors.detalles[index].tipo_material
                        )}
                        helperText={
                          errors.detalles &&
                          errors.detalles[index] &&
                          errors.detalles[index].tipo_material
                        }
                        onChange={(e) => {
                          field.onChange(e);
                          handleMaterialChange(index, e.target.value);
                        }}
                      >
                        {loadedMateriales &&
                          materiales.map((material) => (
                            <MenuItem key={material.id} value={material.id}>
                              {material.nombre}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Precio Material"
                    value={getPrecioMaterial(
                      watch(`detalles[${index}].tipo_material`)
                    )}
                    disabled
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={3}>
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name={`detalles[${index}].cantidad`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Cantidad"
                        fullWidth
                        defaultValue={1} // Valor por defecto de 1
                        error={Boolean(
                          errors.detalles &&
                            errors.detalles[index] &&
                            errors.detalles[index].cantidad
                        )}
                        helperText={
                          errors.detalles &&
                          errors.detalles[index] &&
                          errors.detalles[index].cantidad
                        }
                        onChange={(e) => {
                          field.onChange(e);
                          const newCantidad = parseInt(e.target.value, 10);
                          if (newCantidad === 0) {
                            remove(index); // Eliminar detalle si la cantidad es 0
                          }
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Subtotal"
                    value={calculateSubtotal(index)}
                    disabled
                  />
                </FormControl>
              </Grid>

              
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => append({})}
              startIcon={<AddIcon />}
            >
              Agregar Detalle
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Guardar Canje
      </Button>
    </form>
  );
}
