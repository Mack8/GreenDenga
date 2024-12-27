
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import UsuariosService from '../../services/UsuariosService'

export function SignupAdmin() {
    const navigate = useNavigate();

    // Esquema de validación
    const loginSchema = yup.object({
      nombre_completo: yup.string().trim().required('El nombre completo es requerido'),
      identificacion: yup.string().trim().required('La identificación es requerida'),
      correo_electronico: yup.string().trim().email('Formato de correo electrónico inválido').required('El correo electrónico es requerido'),
      telefono: yup.string().trim().required('El teléfono es requerido').matches(/^\d+$/, 'Número de teléfono inválido'),
      direccion_Provincia: yup.string().trim().required('La provincia es requerida'),
      direccion_Canton: yup.string().trim().required('El cantón es requerido'),
      direccion_Distrito: yup.string().trim().required('El distrito es requerido'),
      contraseña: yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres'),
    });
    

    const { control, handleSubmit, setValue, formState: { errors } } =
        useForm({
            // Valores iniciales
            defaultValues: {
                correo_electronico: '',
                nombre_completo: '',
                identificacion: "",
                direccion_Provincia: "",
                direccion_Canton: "",
                direccion_Distrito: "",
                telefono: "",
                contraseña: '',
                tipo_usuario: 1,
                saldo: 0,
                totalCanjeado: 0,
                totalRecibidos: 0,
            },
            // Asignación de validaciones
            resolver: yupResolver(loginSchema)
        });

    const [error, setError] = useState('');
    const notify = () => toast.success('Usuario registrado', {
        duration: 4000,
        position: 'top-center'
    });

    // Acción submit
    const onSubmit = (formData) => {
        try {
            console.log(formData);

            // Registrar usuario
            UsuariosService.createUser(formData)
                .then(response => {
                    console.log(response);
                    notify();
                    return navigate('/user/login/');
                })
                .catch(error => {
                    if (error instanceof SyntaxError) {
                        console.log(error);
                        setError(error);
                        throw new Error('Respuesta no válida del servidor');
                    }
                });

        } catch (e) {
            // manejar el error
        }
    }

    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);

    if (error) return <p>Error: {error.message}</p>;

    return (
      <>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
              <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                      <Typography variant='h5' gutterBottom>
                          Registrar Usuario
                      </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='nombre_completo'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='nombre_completo'
                                      label='Nombre Completo'
                                      error={Boolean(errors.nombre_completo)}
                                      helperText={errors.nombre_completo ? errors.nombre_completo.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='identificacion'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='identificacion'
                                      label='Cédula'
                                      error={Boolean(errors.identificacion)}
                                      helperText={errors.identificacion ? errors.identificacion.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='correo_electronico'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='correo_electronico'
                                      label='Correo Electrónico'
                                      error={Boolean(errors.correo_electronico)}
                                      helperText={errors.correo_electronico ? errors.correo_electronico.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='telefono'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='telefono'
                                      label='Teléfono'
                                      error={Boolean(errors.telefono)}
                                      helperText={errors.telefono ? errors.telefono.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='direccion_Provincia'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='direccion_Provincia'
                                      label='Provincia'
                                      error={Boolean(errors.direccion_Provincia)}
                                      helperText={errors.direccion_Provincia ? errors.direccion_Provincia.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='direccion_Canton'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='direccion_Canton'
                                      label='Cantón'
                                      error={Boolean(errors.direccion_Canton)}
                                      helperText={errors.direccion_Canton ? errors.direccion_Canton.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='direccion_Distrito'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='direccion_Distrito'
                                      label='Distrito'
                                      error={Boolean(errors.direccion_Distrito)}
                                      helperText={errors.direccion_Distrito ? errors.direccion_Distrito.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                          <Controller
                              name='contraseña'
                              control={control}
                              render={({ field }) => (
                                  <TextField
                                      {...field}
                                      id='contraseña'
                                      label='Contraseña'
                                      type='password'
                                      error={Boolean(errors.contraseña)}
                                      helperText={errors.contraseña ? errors.contraseña.message : ' '}
                                  />
                              )}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Registrar</Button>
                  </Grid>
              </Grid>
          </form>
      </>
  );
}