import React, { useState, useEffect } from "react";
import NavBarUsuario from "./usuario/navBarUsuario"
import axios from "axios"

import {
    Box, 
    Button, 
    Typography, 
    Grid, 
    Card, 
    CardMedia,
    CardContent, 
    CardActions, 
    IconButton
} from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Dashboard = () => {

    var [categorias, setCategorias] = useState([])
    var [produtos, setProdutos] = useState([])

    const listarCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                return
            }
            if (retorno.status === 200) {
                setCategorias(retorno.data)
                console.log(retorno)
            }
        })
    }

    const listarProdutos = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                return
            }
            if (retorno.status === 200) {
                setProdutos(retorno.data)
            }
        })
    }

      useEffect(() => {
        listarCategorias()
        listarProdutos()
    }, [])

    return (
        <Box>
            <NavBarUsuario />


            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                <Typography variant="h4" gutterBottom>
                    Bem-vindo ao Site!
                </Typography>
                <Typography variant="body1">
                    Aqui você pode visualizar os produtos disponíveis e explorar por categoria.
                </Typography>
            </Box>


            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, my: 4 }}>
                {categorias.map((cat, index) => (
                    <Button key={index} variant="outlined">
                        {cat.nome}
                    </Button>
                ))}
            </Box>

            {/* Produtos */}
            <Box sx={{ px: 4 }}>
                <Typography variant="h5" mb={2}>
                    Produtos
                </Typography>
                <Grid container spacing={3}>
                    {produtos.map((produto, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={produto.imagem}
                                    alt={produto.nome}
                                />
                                <CardContent>
                                    <Typography variant="h6">{produto.nome}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {produto.descricao}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        R${produto.preco}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#e8eaf6' }}>
                <Typography variant="h6">Linguagens e Tecnologias</Typography>
                <Typography variant="body2">React • JavaScript • Material UI • Axios</Typography>
            </Box>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
                <IconButton href="https://www.facebook.com/profile.php?id=100005854023109" target="_blank">
                    <FacebookIcon />
                </IconButton>
                <IconButton href="https://instagram.com/joaovos" target="_blank">
                    <InstagramIcon />
                </IconButton>
                <IconButton href="https://github.com/JoaoVOSantos" target="_blank">
                    <GitHubIcon />
                </IconButton>
                <IconButton href="https://linkedin.com/in/joaovosantos" target="_blank">
                    <LinkedInIcon />
                </IconButton>
            </Box>

            <Box sx={{ bgcolor: '#1976d2', p: 2, textAlign: 'center', color: 'white' }}>
                <Typography variant="body2">
                    © 2025 João Vitor | Todos os direitos reservados.
                </Typography>
            </Box>
        </Box>
    )
}

export default Dashboard