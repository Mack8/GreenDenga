import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import recycling from "../../assets/recycling.jpg";
import MaterialesService from "../../services/MaterialesService";
import CuponesService from "../../services/CuponesService";

export function DetailCupones() {
  const routeParams = useParams();
  //console.log(routeParams)

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  //Solicitud API para obtener una pelicula
  useEffect(() => {
    CuponesService.getCuponesById(routeParams.id)
      .then((response) => {
        console.log("Datos recibidos de la API:", response.data.results);
        setData(response.data.results[0]);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Grid container spacing={2}>
          <Grid item={true} xs={5}>
            <Box
              component="img"
              sx={{
                borderRadius: "4%",
                maxWidth: "100%",
                height: "auto",
              }}
              
              src={CuponesService.getImage(data.imagen)}
            />
          </Grid>
          <Grid item={true} xs={7} justifyConten='center'>
            <Typography variant="h4" component="h1" gutterBottom>
              <Box fontWeight="bold" display="inline">
              </Box>{" "}
              {data.nombre}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              <Box fontWeight="bold" display="inline">
                {data.descripcion}
              </Box>
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Precio: {data.cantidad_eco_monedas}
              </Box>
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Categoria:
              </Box>{" "}
              {data.categoria}
            </Typography>      
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
