import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CuponesService from "../../services/CuponesService";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";


export function UpdateCupones () {


  const navigate = useNavigate();

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

    const cuponesSchema = yup.object({
        nombre: yup.string().matches(/^[A-Za-z\s]+$/, 'Ingrese solo letras').required("El nombre es requerido"),
        descripcion: yup.string().required("La descripcion es requerida"),
        categoria: yup.string().required("La categoria es requerida"),
        fecha_inicio: yup.date().required("la fecha de inicio es requerida"),
        fecha_fin: yup.date().required("La fecha de finalización es requerida"),
        cantidad_eco_monedas: yup.number().required("la cantidad de eco monedas es requerida").typeError('Ingrese un número válido')        
      });

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
          categoria: "",
          fecha_inicio: null,
          fecha_fin: null,
          cantidad_eco_monedas: 0,
        },
        resolver: yupResolver(cuponesSchema),
      });

    

    useEffect(() => {
      CuponesService.getCuponesById(id)
        .then((response) => {
          console.log("Datos recibidos de la API:", response.data.results);
          const cuponesData = response.data.results[0];

          // Ajustar los valores de cantidad_eco_monedas según la estructura real
          setValue("cantidad_eco_monedas", cuponesData.cantidad_eco_monedas);

          

          // Establecer los valores restantes del formulario
          Object.entries(cuponesData).forEach(([key, value]) => {
            if (key !== "cantidad_eco_monedas" && key !== "imagen") {
              setValue(key, value);
            }
          });

          // Inicializar las fechas
          setStartDate(new Date(cuponesData.fecha_inicio));
          setEndDate(new Date(cuponesData.fecha_fin));

          
    
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

  const onSubmit =  async (data) => {
    const formattedFormData = {
      ...data,
      fecha_inicio: format(startDate, 'yyyy-MM-dd'), // Usa startDate en lugar de formData.fecha_inicio
      fecha_fin: format(endDate, 'yyyy-MM-dd'),     // Usa endDate en lugar de formData.fecha_fin
    };
    // Lógica para crear o actualizar el cupon usando el servicio
    if (id) {
      CuponesService.updateCupones(formattedFormData);
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
      CuponesService.CreateCupones(formattedFormData);
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
              Actualizar el cupón
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
                name="categoria"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="categoria"
                    label="Categoria"
                    error={Boolean(errors.categoria)}
                    helperText={
                      errors.categoria ? errors.categoria.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="cantidad_eco_monedas"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="cantidad_eco_monedas"
                    label="Precio (Eco-Moneda)"
                    error={Boolean(errors.cantidad_eco_monedas)}
                    helperText={errors.cantidad_eco_monedas ? errors.cantidad_eco_monedas.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <label>Fecha de Inicio:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setValue('fecha_inicio', date); // Establecer el valor en el estado del formulario
                }}
                dateFormat="yyyy-MM-dd"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <label>Fecha Final:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setValue('fecha_fin', date); // Establecer el valor en el estado del formulario
                }}
                dateFormat="yyyy-MM-dd"
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