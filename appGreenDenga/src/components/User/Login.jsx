// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast'
import UsuariosService from '../../services/UsuariosService'
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export function Login () {

  const {saveUser} =useContext(UserContext)



  const navigate = useNavigate()
  
  // Esquema de validación
  const loginSchema = yup.object({
    correo_electronico: yup.string()
      .required('El email es requerido')
      .email('Formato email'),
      contraseña: yup.string()
      .required('El password es requerido')
  })
  const { control, handleSubmit, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      correo_electronico: '',
      contraseña: '',
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  
  const [error, setError] = useState('');
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      
      UsuariosService.loginUser(DataForm)
        .then(response => {
          console.log("Respuesta del servidor",response)
          if (response.data.results != null && response.data.results != 'undefined' && 
            response.data.results != 'Usuario no valido') {
            saveUser(response.data.results);
  
            //Usuario valido o identificado
            //Guardar el token
            saveUser(response.data.results);
  
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido, usuario',
              showConfirmButton: false,
              timer: 4000,
            });
  
            return navigate('/');
          } else {
              Swal.fire({
                icon: 'error',
                title: 'Usuario o contraseña incorrecta',
                showConfirmButton: false,
                timer: 4000,
              });
            
          }
        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error('Respuesta no válida del servidor');
          }
        });
  
    } catch (e) {
      // handle your error
    }
  }
  
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='correo_electronico'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='correo_electronico'
                    label='correo_electronico'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='contraseña'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='contraseña'
                    label='contraseña'
                    type='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Login</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
