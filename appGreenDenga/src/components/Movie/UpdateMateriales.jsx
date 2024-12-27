import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MaterialesService from "../../services/MaterialesService";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { ChromePicker } from "react-color";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";


export function UpdateMateriales () {

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

    const materialesSchema = yup.object({
        nombre: yup.string().matches(/^[A-Za-z]+$/, 'Ingrese solo letras').required("El nombre es requerido"),
        descripcion: yup.string().required("La descripcion es requerida"),
        unidad_medida: yup.string().required("La unidad de medida es requerida"),
        precio: yup.number().required("El precio es requerido"),
        color: yup.string().required("El color es requerido"),
      });

      const navigate = useNavigate();

    const { id } = useParams();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {
          nombre: "",
          descripcion: "",
          unidad_medida: "",
          precio: 0,
          color: "",
        },
        resolver: yupResolver(materialesSchema),
      });      

    const [showColorPicker, setShowColorPicker] = useState(false);

    useEffect(() => {
      MaterialesService.getMaterialesById(id)
        .then((response) => {
          console.log("Datos recibidos de la API:", response.data.results);
          const materialData = response.data.results[0];

          // Ajustar los valores de precio y color según la estructura real
          setValue("precio", materialData.precio_ecomoneda);
          setValue("color", materialData.color_hexadecimal);

          // Establecer los valores restantes del formulario
          Object.entries(materialData).forEach(([key, value]) => {
            if (key !== "precio_ecomoneda" && key !== "color_hexadecimal") {
              setValue(key, value);
            }
          });
    
          console.log(response.data);
          setError(response.error);
          setLoaded(true);


        })
        .catch((error) => {
          console.log(error);
          setError(error);
          throw new Error("Respuesta no válida del servidor");
        });
    }, [id, setValue]);

  const onSubmit = (data) => {
    // Lógica para crear o actualizar el material usando el servicio
    if (id) {
      MaterialesService.updateMateriales(data);
      Swal.fire({
        icon: "success",
        title: "Actualizacion Exitosa",
        showConfirmButton: false,
        timer: 4000,
      }).then(() => {
        // Redirigir después de que SweetAlert2 se cierre
        navigate("/");
      });
    } else {
      MaterialesService.createMateriales(data);
    }
  };

  // Si ocurre un error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  return (
    <>
    {/*encType="multipart/form-data" paso adicional para imagenes */}
    <form onSubmit={handleSubmit(onSubmit, onError)} encType="multipart/form-data" noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Actualizar el material de reciclaje
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
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="descripcion"
                    label="Descripción"
                    error={Boolean(errors.descripcion)}
                    helperText={
                      errors.descripcion ? errors.descripcion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="unidad_medida"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="unidad_medida"
                    label="Unidad de medida"
                    error={Boolean(errors.unidad_medida)}
                    helperText={
                      errors.unidad_medida ? errors.unidad_medida.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="precio"
                    label="Precio (Eco-Moneda)"
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowColorPicker((prevShowColorPicker) => !prevShowColorPicker)}
                      >
                        Color
                      </Button>
                      {showColorPicker && (
                        <div
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                          }}
                        >
                          <ChromePicker
                            color={field.value}
                            onChange={(color) => setValue('color', color.hex)}                            
                          />
                        </div>
                      )}
                      <TextField {...field} type="hidden" />
                    </>
                  )}
                />
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