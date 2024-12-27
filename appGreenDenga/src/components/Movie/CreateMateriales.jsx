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
  import MaterialesService from "../../services/MaterialesService";
  import { ChromePicker } from "react-color";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


  export function CreateMateriales() {
    // Inicializa el estado y esquema de validación
    const materialesSchema = yup.object({
      nombre: yup.string().required("El nombre es requerido"),
      descripcion: yup.string().required("La descripcion es requerida"),
      imagen: yup.string().required("La imagen es requerido"),
      unidad_medida: yup.string().required("La unidad de medida es requerida"),
      precio: yup.number().required("El precio es requerido").max(5000),
      color: yup.string().required("El color es requerido"),
    });

    const navigate = useNavigate();

    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: {
        nombre: "",
        descripcion: "",
        imagen: "",
        unidad_medida: "",
        precio: 0,
        color: "",
      },
      resolver: yupResolver(materialesSchema),
    });

    const [error, setError] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
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
      console.log(formData);
      MaterialesService.createMateriales(formData)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Creado con exito",
              showConfirmButton: false,
              timer: 4000,
            }).then(() => {
              
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

    useEffect(() => {
      console.log(fieldImage);
    }, [fieldImage]);

    if (error) return <p>Error: {error.message}</p>;
    return (
      <>
      {/*encType="multipart/form-data" paso adicional para imagenes */}
        <form onSubmit={handleSubmit(onSubmit, onError)} encType="multipart/form-data" noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                Crear un nuevo material de reciclaje
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
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
    </>
);
}