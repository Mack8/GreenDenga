import { useContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import {
  ConfirmationNumberOutlined,
  ImportContactsOutlined,
  Info,
} from "@mui/icons-material";
import CuponCanjeService from "../../services/CuponCanjeService";
import CuponesService from "../../services/CuponesService";
import { UserContext } from '../../context/UserContext';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

export function CanjeCupones() {


  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const admin = userData?.id;
  const navigate = useNavigate();


  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [imagen, setImages] = useState([]);
  const [cantidadEcoMonedas, setCantidadEcoMonedas] = useState(0);

  const fetchImages = async (items) => {
    // ... (Código de fetchImages, sin cambios)
  };

  const handleCanjeClick = (item) => {
    const fechaActual = new Date().toISOString().slice(0, 10);

    const cantidadEcoMonedasCupon = parseFloat(item.cantidad_eco_monedas);

    // Crear objeto de canje con los datos necesarios
    const canjeData = {
      fecha_canje: fechaActual,
      cliente: admin,
      cupon_canje: item.id,
      cantidad_eco_monedas_utilizadas: cantidadEcoMonedasCupon,
    };

    // Llamar al servicio para crear el canje de cupón
    CuponCanjeService.createCanjeCupon(canjeData)
      .then((response) => {
        console.log("Canje de cupón creado con éxito:", response.data);

        Swal.fire({
          icon: "success",
          title: "Canje creado con éxito",
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          // Redirigir después de que SweetAlert2 se cierre
          navigate("/");
        });

      })
      .catch((error) => {
        console.error("Error al crear el canje de cupón:", error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      });
  };

  useEffect(() => {
    CuponesService.getCupones()
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
        fetchImages(response.data.results.imagen);
        console.log(response.data.results)
      })
      .catch((error) => {
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Grid container sx={{ p: 2 }} spacing={3}>
        {data &&
          data.map((item, index) => (
            <Grid item xs={4} key={item.id}>
              <Card>
                <CardContent sx={{ height: 140 }} image={imagen[index]}>
                  <Typography variant="body2" color="text.secondary">
                    <ConfirmationNumberOutlined /> {item.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ImportContactsOutlined /> {item.descripcion}
                  </Typography>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      component={Link}
                      to={`/cupones/${item.id}`}
                      aria-label="Detalle"
                    >
                      <Info />
                    </IconButton>
                    <br />
                    <button onClick={() => handleCanjeClick(item)}>
                      Canjear
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}