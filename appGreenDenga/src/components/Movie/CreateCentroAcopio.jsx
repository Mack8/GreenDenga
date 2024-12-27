import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText, IconButton, MenuItem, Tooltip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useFieldArray } from "react-hook-form";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import CentroAcopioService from "../../services/CentroAcopioService";
import EstadoService from "../../services/EstadoService";
import UsuariosService from "../../services/UsuariosService";
import MaterialesService from "../../services/MaterialesService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


export function CreateCentroAcopio() {
  // Inicializa el estado y esquema de validación
  const centroAcopioSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    provincia: yup.string().required("La provincia es requerida"),
    canton: yup.string().required("El cantón es requerido"),
    direccion: yup.string().required("La dirección es requerida"),
    telefono: yup.string().required("El teléfono es requerido"),
    horario_atencion: yup
      .string()
      .required("El horario de atención es requerido"),
  });

  const navigate = useNavigate();

  const [estados, setEstados] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState();

  useEffect(() => {
    EstadoService.getEstados()
      .then((response) => {
        setEstados(response.data.results);
        console.log(estados)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [usuariosAdministradores, setUsuariosAdministradores] = useState([]);
  const [selectedUsuarioAdministrador, setSelectedUsuarioAdministrador] =
    useState("");

  useEffect(() => {
    UsuariosService.getByTipoUsuario(1)
      .then((response) => {
        setUsuariosAdministradores(response.data.results);
        console.log(usuariosAdministradores);
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
        console.log(materiales)
      })
      .catch((error) => {
        console.error(error);
        setLoadedMateriales(true);
      });
  }, []);


 

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      provincia: "",
      canton: "",
      direccion: "",
      telefono: "",
      horario_atencion: "",
      usuario_administrador: "",
      estado: "",
      materiales: [],
    },
    resolver: yupResolver(centroAcopioSchema),
  });

  const [error, setError] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiales",
  });

  // Acción submit
  const onSubmit = (formData) => {
    CentroAcopioService.createCentroAcopio(formData)
      .then((response) => {
        setError(response.error);
        Swal.fire({
          icon: "success",
          title: "Creado con exito",
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

  // Si ocurre un error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Crear Centro de Acopio
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
          {usuariosAdministradores.length > 0 ? (
            usuariosAdministradores.map((usuario) => (
              <MenuItem key={usuario.id} value={usuario.id}>
                {usuario.nombre_completo}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              No hay usuarios disponibles
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
              {fields.map((field, index) => (
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
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
