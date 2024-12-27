import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'


export function Home () {

  

  return (

    

    <Container sx={{ p: 2 }} maxWidth='sm'>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom
      >
        GreenDenga!
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' paragraph>
        Consulta toda la información sobre nuestras sucursales de reciclaje y que materiales aceptamos!
      </Typography>
    </Container>
  )
}