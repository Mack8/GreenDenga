  import React, { useState, useEffect  } from "react";
  import FormControl from "@mui/material/FormControl";
  import Grid from "@mui/material/Grid";
  import Typography from "@mui/material/Typography";
  import { useForm, Controller } from "react-hook-form";
  import TextField from "@mui/material/TextField";
  import Button from "@mui/material/Button";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { toast } from "react-hot-toast";
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import { useNavigate } from "react-router-dom";
import CuponesService from "../../services/CuponesService";
import { format } from 'date-fns';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


  export function CreateCupones() {
    // Inicializa el estado y esquema de validación
    const cuponesSchema = yup.object({
      nombre: yup.string().matches(/^[A-Za-z\s]+$/, 'Ingrese solo letras').required("El nombre es requerido"),
      descripcion: yup.string().required("La descripcion es requerida"),
      imagen: yup.string().required("La imagen es requerido"),
      categoria: yup.string().required("La categoria es requerida"),
      fecha_inicio: yup.date().required("la fecha de inicio es requerida"),
      fecha_fin: yup.date().required("La fecha de finalización es requerida"),
      cantidad_eco_monedas: yup.number().required("la cantidad de eco monedas es requerida").typeError('Ingrese un número válido')        
    });

    const navigate = useNavigate();

    const {
      control,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
        nombre: "",
        descripcion: "",
        imagen: "",
        categoria: "",
        fecha_inicio: null,
        fecha_fin: null,
        cantidad_eco_monedas: 0,
      },
      resolver: yupResolver(cuponesSchema),
    });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [error, setError] = useState(null);
    const [fieldImage, setFieldImage] = useState(null); 

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
      if(!file){
        return null;
      }
      try{
        const formData = new FormData();
        formData.append('imagen', file);
        setValue("imagen", file.name);
        setImageUrl(file.name);

        const response = await fetch('http://localhost:81/api/ImangeHandler', {
          method: 'POST',
          body: formData,
        })
        const imageUrl = await response.text();
        console.log('Imagen subida!', imageUrl);
        return file.name;          
      } catch(error){
        console.error('Error a la hora de subir la imagen');
        throw new Error ('Error a la hora de subir la imagen');
      }
    };

    // Acción submit
    function onSubmit (formData) {
      const formattedFormData = {
        ...formData,
        fecha_inicio: format(startDate, 'yyyy-MM-dd'), // Usa startDate en lugar de formData.fecha_inicio
        fecha_fin: format(endDate, 'yyyy-MM-dd'),     // Usa endDate en lugar de formData.fecha_fin
      };
      console.log(formattedFormData);
      CuponesService.createCupones(formattedFormData)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Cupon creado con éxito",
              showConfirmButton: false,
              timer: 4000,
            }).then(() => {
              // Redirigir después de que SweetAlert2 se cierre
              navigate("/");
            });
          } else if (response.status === 400) {
            toast.error(response.results, {
              duration: 4000,
              position: "top-center",
            });
            // Posiblemente también puedes manejar la redirección o cualquier otra lógica aquí
          }
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }

    // Si ocurre un error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);

    

    if (error) return <p>Error: {error.message}</p>;
    return (
      <>
      {/*encType="multipart/form-data" paso adicional para imagenes */}
      <form onSubmit={handleSubmit(onSubmit, onError)} encType="multipart/form-data" noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                Crear un cupón de canje
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
            {/*Imagen!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <Grid item xs={12} sm={2}>
              <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <div>
              <Button
                  variant="contained"
                  component="label"
                >
                  Imagen
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  onClick={handleUpload}
                >
                  Guardar 
                </Button>
                  {file && (
              <div>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            )}

            {imageUrl && (
              <div>
                <h2>Imágen subida</h2>
              </div>
            )}
            </div>
            </FormControl>
            </Grid>
            {/*Cierre Imagen!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
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
                  dateFormat="yyyy/MM/dd"
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
                  dateFormat="yyyy/MM/dd"
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
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
