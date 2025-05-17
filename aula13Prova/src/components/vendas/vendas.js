import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
    CardMedia,
    Grid,
} from "@mui/material";
import AppBar from "../materialUI/navBar"

const Vendas = () => {
    var usuario = localStorage.getItem("USUARIO")

    const [mensagem, setMensagem] = useState("")
    const [open, setOpen] = useState(false)
    const [erro, setErro] = useState(false)
    const navigate = useNavigate()

    var [nome, setNome] = useState('')
    var [data, setData] = useState('')
    var [produtos, setProdutos] = useState([])
    const [produtosVendidos, setProdutosVendidos] = useState([])

    const cadastrarVenda = async () => {
        var url = `https://backend-completo.vercel.app/app/venda`
        var token = localStorage.getItem("ALUNO_ITE")
        
        var dados = {
            nomeCliente: nome,
            data: data,
            produtos: produtosVendidos
        }

        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                setErro(true);
                setMensagem(retorno.data.error);
                setOpen(true);
                return
            }
            if (retorno.status === 200) {
                setErro(false)
                setMensagem("Venda cadastrada com sucesso.")
                setOpen(true)
                console.log("cadastrar venda: ", retorno)
                setTimeout(() => {
                    navigate('/listaVendas')
                }, 750)
            }
        })
    }


    const listarProdutos = async () => {
        var url = `https://backend-completo.vercel.app/app/produtos/${usuario}`
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                setErro(true);
                setMensagem(retorno.data.error);
                setOpen(true);
                return
            }
            if (retorno.status === 200) {
                setProdutos(retorno.data)
            } else {
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })

    }

    useEffect(() => {
        listarProdutos();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "#f0f0f0",
                    minHeight: "calc(100vh - 72px)",
                    py: 4,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        bgcolor: "white",
                        border: "2px solid #1976d2",
                        borderRadius: 2,
                        p: 4,
                        mb: 4,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" mb={2}>
                        Cadastrar Venda
                    </Typography>
                    <TextField
                        fullWidth
                        label="Nome do cliente"
                        variant="outlined"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Data da venda"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={cadastrarVenda}
                    >
                        Cadastrar Venda
                    </Button>
                </Box>

                <Box sx={{ width: "100%", px: 2, maxWidth: 1000 }}>
                    <Typography variant="h6" mb={2}>
                        Produtos disponíveis
                    </Typography>
                    <Grid container spacing={2}>
                        {produtos.map((produto, indice) => {
                            const selecionado = produtosVendidos.find(p => p._id === produto._id);

                            return (
                                <Grid item xs={12} sm={6} md={4} key={indice}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={produto.imagem}
                                            alt={produto.nome}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{produto.nome}</Typography>
                                            <Typography variant="body1">R$ {produto.preco}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {produto.descricao}
                                            </Typography>

                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={!!selecionado}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setProdutosVendidos([...produtosVendidos, {
                                                                    _id: produto._id,
                                                                    nome: produto.nome,
                                                                    preco: produto.preco,
                                                                    quantidade: 1
                                                                }]);
                                                            } else {
                                                                setProdutosVendidos(produtosVendidos.filter(p => p._id !== produto._id));
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Selecionar"
                                                sx={{ mt: 1 }}
                                            />

                                            {selecionado && (
                                                <TextField
                                                    type="number"
                                                    label="Quantidade"
                                                    variant="outlined"
                                                    size="small"
                                                    value={selecionado.quantidade}
                                                    onChange={(e) => {
                                                        const novaQuantidade = parseInt(e.target.value) || 1;
                                                        setProdutosVendidos(produtosVendidos.map(p =>
                                                            p._id === produto._id ? { ...p, quantidade: novaQuantidade } : p
                                                        ));
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
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={erro ? "error" : "success"}
                    sx={{ width: "100%" }}
                >
                    {mensagem}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Vendas