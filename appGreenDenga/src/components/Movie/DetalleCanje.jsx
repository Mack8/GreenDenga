import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CanjeService from '../../services/CanjeService';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export function DetalleCanje() {
  const routeParams = useParams();



  const estiloFactura = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const estiloEncabezado = {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'green',
  };

  const estiloTabla = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const estiloCelda = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  };

  const estiloCeldaEncabezado = {
    ...estiloCelda,
    backgroundColor: '#333',
    fontWeight: 'bold',
    color: 'white',
  };

  const estiloTotalEcoMonedas = {
    textAlign: 'right', // Alineación a la derecha
    marginTop: '20px', // Espacio superior
    color: 'green',
  };

  const [data, setData] = useState(null);
  const [totalEcoMonedas, setTotalEcoMonedas] = useState(0);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canjeId = routeParams.id;

    if (!isNaN(canjeId)) {
      CanjeService.getDetalle(canjeId)
        .then((response) => {
          if (response && response.results) {
            const canjeData = response.results;
            setData(canjeData);

            console.log(canjeData)
            setLoaded(true);
          } else {
            setError('Datos no válidos en la respuesta');
            setLoaded(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          throw new Error('Respuesta no válida del servidor');
        });
    } else {
      setError('ID de canje no válido');
      setLoaded(false);
    }
  }, [routeParams.id]);

  useEffect(() => {
    if (data && data.detalles) {
      const totalEcoMonedas = data.detalles.reduce((total, detalle) => {
        return total + detalle.cantidad * detalle.precio;
      }, 0);
      setTotalEcoMonedas(totalEcoMonedas);
    }
  }, [data]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }}>
      {data && (
        <div style={estiloFactura}>
          <div style={estiloEncabezado}>
            <Typography variant='h4' component='h1' gutterBottom>
              Detalles del Canje
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Fecha de Canje: {data.fecha_canje}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Cliente: {data.nombre_usuario}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              Centro de Acopio: {data.nombre_centro_acopio}
            </Typography>
          </div>
          <div>
            <table style={estiloTabla}>
              <thead>
                <tr>
                  <th style={estiloCeldaEncabezado}>Tipo de Material</th>
                  <th style={estiloCeldaEncabezado}>Valor en Eco-monedas</th>
                  <th style={estiloCeldaEncabezado}>Cantidad</th> 
                  <th style={estiloCeldaEncabezado}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {data.detalles.map((detalle) => (
                  <tr key={detalle.id}>
                    <td style={estiloCelda}>{detalle.nombre_tipo_material}</td>
                    <td style={estiloCelda}>{detalle.precio} x {detalle.medida}</td>
                    <td style={estiloCelda}>{detalle.cantidad}</td>              
                    <td style={estiloCelda}>{(detalle.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={estiloTotalEcoMonedas}>
            <Typography variant='subtitle1' gutterBottom>
              Total de Eco-monedas Ganadas: {totalEcoMonedas.toFixed(0)}
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
}