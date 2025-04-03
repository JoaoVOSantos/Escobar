import axios from "axios"
import  {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Cartao = () => {

  const [getDados, setDados] = useState([])

  const personagens = async () => {
      const url = await axios.get("https://rickandmortyapi.com/api/character")
      setDados(url.data.results)
  }
  
  personagens() 
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={getDados.image}
        title="Logo ITE"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {getDados.name}
        </Typography>
        <div>
          🟢 
        </div>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


export default Cartao