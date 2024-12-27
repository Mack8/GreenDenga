import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import recycling from "../../assets/recycling.jpg";
import CentroAcopioService from "../../services/CentroAcopioService";
import UsuariosService from "../../services/UsuariosService";
import MaterialesService from "../../services/MaterialesService";

export function DetailCentroAcopio() {
  const routeParams = useParams();
  //console.log(routeParams)

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  //Para guardar los datos del administrador
  const [admin, setAdminName] = useState(null);
  //Para guardar los datos de los materiales aceptados
  const [materiales, setMateriales] = useState([]);

  //Solicitud API para obtener una pelicula
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CentroAcopioService.getCentroAcopioById(
          routeParams.id
        );
        const centroAcopioData = response.data.results[0];
        setData(centroAcopioData);

        // Obtener el nombre del administrador utilizando el ID
        const adminId = centroAcopioData.usuario_administrador;

        // Realizar una solicitud para obtener el nombre del administrador por su ID

        const adminResponse = await UsuariosService.getById(adminId);
        console.log("Datos recibidos de la API:", adminResponse.data.results);
        const adminData = adminResponse.data.results;

        setAdminName(adminData);

        const materialesResponse =
          await MaterialesService.getMaterialesByCentroAcopio(routeParams.id);
        const materialesData = materialesResponse.data.results;
        setMateriales(materialesData);

        setLoaded(true);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData();
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
              alt="Icono Reciclaje"
              src={recycling}
            />
          </Grid>
          <Grid item={true} xs={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              <Box fontWeight="bold" display="inline">       
              </Box>{" "}
              {data.nombre}
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              <Box fontWeight="bold" display="inline">
                Provincia: {data.provincia}
              </Box>
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              <Box fontWeight="bold" display="inline">
                Canton: {data.canton}
              </Box>
            </Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              <Box fontWeight="bold" display="inline">
                Dirección Exacta: {data.direccion}
              </Box>
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Telefono: {data.telefono}
              </Box>
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Horario de Atención:
              </Box>{" "}
              {data.horario_atencion}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Administrador:
              </Box>{" "}
              {admin.nombre_completo}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">
                Materiales Aceptados:{" "}
              </Box>
              {materiales.map((material, index) => (
                <span key={material.id}>
                  {material.nombre}
                  {index < materiales.length - 1 ? ", " : "."}
                </span>
              ))}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
