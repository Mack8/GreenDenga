import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { CalendarMonth, HouseOutlined, Info, NumbersOutlined, PlaceOutlined } from "@mui/icons-material";
import CentroAcopioService from "../../services/CentroAcopioService";
import EditIcon from '@mui/icons-material/Edit';

export function ListCentro() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3 * 3; // 3 elementos por fila x 3 filas

  useEffect(() => {
    CentroAcopioService.getCentroAcopio()
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: "20px", // Ajusta el margen derecho para alinear con el borde del card
  };

  const buttonStyles = {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "18px",
  };

  return (
    <div>
      <Fab
        color="black"
        aria-label="Crear Centro de Acopio"
        style={{ position: "fixed", bottom: 20, right: 20 }}
        component={Link}
        to="/centroacopio/create"
      >
        <AddIcon />
      </Fab>
      <Grid container sx={{ p: 2 }} spacing={3}>
        {paginatedData.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <HouseOutlined /> {item.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <PlaceOutlined /> {item.provincia}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <NumbersOutlined /> {item.telefono}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <CalendarMonth /> {item.horario_atencion}
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <IconButton component={Link} to={`/centroacopio/update/${item.id}`} aria-label="Detalle" sx={{ ml: "auto" }}>
                    <EditIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={containerStyles}>
        <button onClick={handlePrevPage} disabled={currentPage === 0} style={buttonStyles}>
          {"<<"}
        </button>
        <div>
          Página {currentPage + 1} de {totalPages}
        </div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={buttonStyles}>
          {">>"}
        </button>
      </div>
    </div>
  );
}
