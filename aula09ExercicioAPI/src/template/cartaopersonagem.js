import axios from "axios"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const CartaoPersonagem = async () => {
    
    var url = "https://rickandmortyapi.com/api/character"

    await axios.get(url).then(resposta => {
        console.log(resposta.data.results)
    })
}

const Cartao = () => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="iteLogo.png"
          title="Logo ITE"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">

          </Typography>
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