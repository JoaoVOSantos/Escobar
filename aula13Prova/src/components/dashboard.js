import React, { useState, useEffect } from "react";
import NavBarUsuario from "./materialUI/navBarUsuario"
import axios from "axios"
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    TextField,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Dashboard = () => {

    // guardas as categorias pro frontEnd
    var [categorias, setCategorias] = useState([])

    // guardas os produtos pro frontEnd
    var [produtos, setProdutos] = useState([])

    // guarda os produtos e as quantidades selecionadas do produto em um array
    var [produtosVendidos, setProdutosVendidos] = useState([])

    // variavel para controlar a categoria selecionada

    var [produtosFiltrados, setProdutosFiltrados] = useState([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    const navigate = useNavigate()


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
        var usuario = localStorage.getItem("USUARIO")
        var url = `https://backend-completo.vercel.app/app/produtos/${usuario}`
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
                setProdutosFiltrados(retorno.data)
            }
        })
    }

    useEffect(() => {
        if (categoriaSelecionada) {
            const filtrados = produtos.filter(p => p.categoria === categoriaSelecionada);
            setProdutosFiltrados(filtrados);
        } else {
            setProdutosFiltrados(produtos);
        }
    }, [produtos, categoriaSelecionada]);

    useEffect(() => {
        listarCategorias();
        listarProdutos();
    }, []);

    const filtrarPorCategoria = (catNome) => {
        setCategoriaSelecionada(catNome);

        if (!catNome) {
            // Se nenhuma categoria estiver selecionada, mostra todos os produtos
            setProdutosFiltrados(produtos);
        } else {
            // Filtra os produtos por categoria
            const filtrados = produtos.filter(p => p.categoria === catNome);
            setProdutosFiltrados(filtrados);
        }
    };

    return (
        <Box>
            <NavBarUsuario />

            {/* Sessão bem vindo */}
            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                {/* Parte de cima */}
                <Typography variant="h4" gutterBottom>
                    Bem-vindo ao Site!
                </Typography>
                {/* parte de baixo */}
                <Typography variant="body1">
                    Aqui você pode visualizar os produtos disponíveis e explorar por categoria.
                </Typography>
            </Box>

            {/* Cria uma Box com botoes de categorias */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, my: 4 }}>
                <Button variant="outlined" onClick={() => setCategoriaSelecionada(null)}>
                    Todos
                </Button>
                {categorias.map((cat, index) => (
                    <Button key={index} variant="outlined" onClick={() => filtrarPorCategoria(cat.nome)}>
                        {cat.nome}
                    </Button>
                ))}
            </Box>

            {/* Sessão de produtos */}
            <Box sx={{ px: 4 }}>
                {/* Titulo */}
                <Typography variant="h5" mb={2}>
                    Produtos
                </Typography>

                {/* Mostrar Produtos Começa aqui */}
                <Grid container spacing={2} mb={2}>

                    {/* For de Produtos */}
                    {produtosFiltrados.map((produto, indice) => {

                        // variavel para saber se o produto ja  esta no array produtos vendidos (selecionado)
                        const selecionado = produtosVendidos.find(p => p._id === produto._id)

                        // Return do map
                        return (

                            // grid de cards de produtos
                            // paara alterar quantos cards ficam até quebrar para baixo
                            // altere md={}
                            <Grid item xs={12} sm={6} md={2} key={indice}>
                                <Card>
                                    {/* Parte superior do Card (Imagem)*/}
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={produto.imagem}
                                        alt={produto.nome}
                                    />
                                    {/* Conteudo do Card (nome, preço, descrição) */}
                                    <CardContent>
                                        <Typography variant="h6">{produto.nome}</Typography>
                                        <Typography variant="body1">R$ {produto.preco},00</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {produto.descricao}
                                        </Typography>

                                        {/* Controle de Formulario do Material UI */}
                                        <FormControlLabel
                                            control={
                                                // Checkbox
                                                <Checkbox
                                                    // !!selecionado verifica se é um objeto que esta vindo (true)
                                                    // se caso nao for ou vier undefined, null, sera (false)
                                                    checked={!!selecionado}

                                                    // quando o checkBox for mandado
                                                    onChange={(e) => {
                                                        // se tiver checked ele seta no array produtos vendidos
                                                        if (e.target.checked) {
                                                            setProdutosVendidos([
                                                                // acrescenta no final do array um objeto 
                                                                ...produtosVendidos,
                                                                // O objeto
                                                                {
                                                                    _id: produto._id,
                                                                    nome: produto.nome,
                                                                    preco: produto.preco,
                                                                    // seta a quantidade em 1, que sera mudada posteriormente
                                                                    quantidade: 1,
                                                                }
                                                            ]);
                                                            // se não estiver checked
                                                        } else {
                                                            // se caso o usuario checkar o checkBox e despois descehckar o filter cria um novo array com esse produto fora, assim o array sempre tera somente os produtos que estão checkados.
                                                            setProdutosVendidos(produtosVendidos.filter(p => p._id !== produto._id));
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Selecionar"
                                            sx={{ mt: 1 }}
                                        />

                                        {/* usa a variavel da linha 124, quando o produto for selecionado, abre o  
                                        TextField, campo para digitar quantidade
                                        */}
                                        {selecionado && (
                                            <TextField
                                                type="number"
                                                label="Quantidade"
                                                variant="outlined"
                                                size="small"
                                                // Sempre vai retornar valor 1
                                                value={selecionado.quantidade}
                                                // troca a quantidade
                                                onChange={(e) => {
                                                    // Começa uma variavel em 1, setando que ela ja é um number
                                                    const novaQuantidade = parseInt(e.target.value) || 1;
                                                    // seta em produtos vendidos
                                                    setProdutosVendidos(
                                                        // Percorre produtos vendidos
                                                        produtosVendidos.map(
                                                            // funcao para ir atras do produto que a quantidade foi mudada
                                                            p =>
                                                                // aqui a comparação até achar o produto
                                                                p._id === produto._id ? {
                                                                    // setando nova quantidade
                                                                    // ...p: copia todas as propriedades do objeto p (que é um produto do array produtosVendidos).
                                                                    // e na propriedade quantidade seta a nova quantidade que foi colocada pelo usuario.
                                                                    ...p, quantidade: novaQuantidade
                                                                } : p
                                                        )
                                                    );

                                                }}
                                                inputProps={{ min: 1 }}
                                                fullWidth
                                                sx={{ mt: 2 }}
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/finalizar-compra")}
                >
                    Comprar Produtos Selecionados
                </Button>
            </Box>

            {/* Sessão De linguagens ultilzadas */}
            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#e8eaf6' }}>
                <Typography variant="h6">Linguagens e Tecnologias</Typography>
                <Typography variant="body2">React • Material UI</Typography>
            </Box>

            {/* Sessão De icones de Rede social */}
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

            {/* Sessão De footer */}
            <Box sx={{ bgcolor: '#1976d2', p: 2, textAlign: 'center', color: 'white' }}>
                <Typography variant="body2">
                    © 2025 João Vitor | Todos os direitos reservados.
                </Typography>
            </Box>
        </Box>
    )
}

export default Dashboard