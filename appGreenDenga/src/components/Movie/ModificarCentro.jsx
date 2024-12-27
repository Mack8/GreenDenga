import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import CentroAcopioService from "../../services/CentroAcopioService";
import EstadoService from "../../services/EstadoService";
import UsuariosService from "../../services/UsuariosService";
import MaterialesService from "../../services/MaterialesService";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export function UpdateCentroAcopio() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id || null;

  const centroAcopioSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    provincia: yup.string().required("La provincia es requerida"),
    canton: yup.string().required("El cantón es requerido"),
    direccion: yup.string().required("La dirección es requerida"),
    telefono: yup.string().required("El teléfono es requerido"),
    horario_atencion: yup
      .string()
      .required("El horario de atención es requerido"),
    estado: yup.string().required("El estado es requerido"),
    usuario_administrador: yup
      .string()
      .required("El usuario administrador es requerido"),
    materiales: yup.array().min(1, "Debes seleccionar al menos un material"),
  });

  const [values, setValores] = useState();

  useEffect(() => {
    if (id !== undefined && !isNaN(Number(id))) {
      CentroAcopioService.getCentroAcopioById(Number(id))
        .then((response) => {
          console.log(response);
          setValores(response.data.results[0]);
          const materialesArray = response.data.results[0].materiales
            .split(",")
            .map(Number);
          setValue("materiales", materialesArray);
          setError(response.error);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [id]);

  const [estados, setEstados] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(1);

  useEffect(() => {
    EstadoService.getEstados()
      .then((response) => {
        setEstados(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [usuariosAdministradores, setUsuariosAdministradores] = useState([]);
  const [selectedUsuarioAdministrador, setSelectedUsuarioAdministrador] =
    useState("1");

  useEffect(() => {
    UsuariosService.obtenerOtrosAdministradores(id)
      .then((response) => {
        setUsuariosAdministradores(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [materiales, setMateriales] = useState([]);
  const [loadedMateriales, setLoadedMateriales] = useState(false);

  useEffect(() => {
    MaterialesService.getMateriales()
      .then((response) => {
        setMateriales(response.data.results);
        setLoadedMateriales(true);
      })
      .catch((error) => {
        console.error(error);
        setLoadedMateriales(true);
      });
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      provincia: "",
      canton: "",
      direccion: "",
      telefono: "",
      horario_atencion: "",
      estado: "",
      usuario_administrador: "",
      materiales: [],
    },
    values,
    resolver: yupResolver(centroAcopioSchema),
  });

  const [error, setError] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiales",
  });

  const onSubmit = (formData) => {
    console.log(formData);

    CentroAcopioService.updateCentroAcopio(formData)
      .then((response) => {
        setError(response.error);
        Swal.fire({
          icon: "success",
          title: "Actualizacion Exitosa",
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          
          navigate("/");
        });
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  };

  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Modificar Centro de Acopio
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="provincia"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="provincia"
                    label="Provincia"
                    error={Boolean(errors.provincia)}
                    helperText={
                      errors.provincia ? errors.provincia.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="canton"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="canton"
                    label="Cantón"
                    error={Boolean(errors.canton)}
                    helperText={errors.canton ? errors.canton.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="direccion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="direccion"
                    label="Dirección"
                    error={Boolean(errors.direccion)}
                    helperText={
                      errors.direccion ? errors.direccion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="telefono"
                    label="Teléfono"
                    error={Boolean(errors.telefono)}
                    helperText={errors.telefono ? errors.telefono.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="horario_atencion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="horario_atencion"
                    label="Horario de Atención"
                    error={Boolean(errors.horario_atencion)}
                    helperText={
                      errors.horario_atencion
                        ? errors.horario_atencion.message
                        : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <Controller
              name="usuario_administrador"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="usuario_administrador"
                  label="Usuario Administrador"
                  size="small"
                  fullWidth
                >
                  {usuariosAdministradores.map((usuario) => (
                    <MenuItem key={usuario.id} value={usuario.id}>
                      {usuario.nombre_completo}
                    </MenuItem>
                  ))}

                  {usuariosAdministradores.length === 1 && (
                    <MenuItem value="" disabled>
                      No hay más administradores disponibles
                    </MenuItem>
                  )}
                </TextField>
              )}
            />
          </FormControl>
        </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="estado"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    id="estado"
                    label="Estado"
                    size="small"
                    fullWidth
                  >
                    {estados.map((estado) => (
                      <MenuItem key={estado.id} value={estado.id}>
                        {estado.estado}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedMateriales &&
                fields.map((field, index) => (
                  <div
                    key={field.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem", // Espacio inferior reducido
                    }}
                  >
                    <Controller
                      name={`materiales[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          id={`materiales[${index}]`}
                          label="Materiales"
                          size="small"
                          fullWidth
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
                    <IconButton color="secondary" onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => append({})}
              >
                Agregar Material
              </Button>
            </FormControl>
          </Grid>

          {/* Agrega otros campos y componentes similares */}
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
