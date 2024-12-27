import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import WalletService from '../../services/WalletService';

export function WalletView() {
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const admin = userData?.id;


  // Inicializamos data como un objeto con propiedades predeterminadas
  const [data, setData] = useState({
    saldo: '',
    totalCanjeado: '',
    totalRecibidos: '',
  });

  // Error del API
  const [error, setError] = useState('');
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Llamar al API y obtener la lista de películas
    WalletService.getById(admin)
      .then((response) => {
        setData(response.data.results[0] || data); // Actualizamos solo las propiedades necesarias
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [admin, data]);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <Typography variant='h5' gutterBottom>
        Información de la Billetera Virtual
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant='body1'>
            Usuario: {data?.usuario}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>Saldo: {data.saldo}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Total Canjeado: {data.totalCanjeado}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Total Recibidos: {data.totalRecibidos}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
