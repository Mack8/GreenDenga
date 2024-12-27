import { useEffect, useState } from "react";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { CalendarMonth, HouseOutlined, Info, NumbersOutlined, PlaceOutlined } from '@mui/icons-material'
import CentroAcopioService from "../../services/CentroAcopioService";

export function ListCentroAcopio () {
  //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    //Llamar al API y obtener la lista de peliculas
    CentroAcopioService.getCentroAcopio()
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )
  },[])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>     
     {data && data.map((item)=>(  
          <Grid item xs={4} key={item.id}   >
            <Card>              
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  <HouseOutlined/> {item.nombre}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <PlaceOutlined/> {item.provincia}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <NumbersOutlined /> {item.telefono}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <CalendarMonth /> {item.horario_atencion}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <IconButton component={Link} to={`/centroacopio/${item.id}`} aria-label='Detalle' sx={{ ml: 'auto' }}>
                  <Info/>
                </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
       ))}
    </Grid>
  )
}
