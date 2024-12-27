import { useEffect, useState } from "react";
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
import CuponesService from "../../services/CuponesService";

export function ListCupones() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [imagen, setImages] = useState([]);
  
  const fetchImages= async (items) =>{
    try{
      const imageArray = await Promise.all(
        items.map(async (item) =>{
          try{
            const response = await CuponesService.getImages(item.imagen);
            if(response.status ===200){
              const blob = new Blob ([response.data], {type: response.headers['content-type']});
              const imageUrl = URL.createObjectURL(blob);
              return imageUrl;
            }else{
              console.error('Image resquest failed with status: ', response.status);
              return null;
            }
          } catch (error){
            console.error('Error fetching image:', error);
            return null;
          }
        })
      );
      console.log('Image URLs:', imageArray);
      const filteredImages = imageArray.filter((imageUrl)=>imageUrl !== null);
      setImages(filteredImages);
    }catch(error){
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    CuponesService.getCupones()
      .then((response) => {
        console.log(response)
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
        fetchImages(response.data.results.imagen)
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
              <CardContent sx={{height:140}} image={imagen[index]}>
                <Typography variant="body2" color="text.secondary">
                  <ConfirmationNumberOutlined /> {item.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <ImportContactsOutlined /> {item.descripcion}
                </Typography>
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <IconButton
                    component={Link}
                    to={`/cupones/${item.id}`}
                    aria-label="Detalle"
                  >
                    <Info />
                  </IconButton>
                  <br/>
                  </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
    </div>
  );
}
