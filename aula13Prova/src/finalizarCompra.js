import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NavBarUsuario from "./components/materialUI/navBarUsuario";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
} from "@mui/material";

const FinalizarCompra = () => {
    const navigate = useNavigate();
    var [nomeCliente, setNomeCliente] = useState("");
    var [dataAtual, setDataAtual] = useState("");
    var [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const hoje = new Date();

        // Formato ISO: yyyy-mm-dd
        const dataFormatada = hoje.toISOString().split('T')[0];

        setDataAtual(dataFormatada);

        const produtosSalvos = JSON.parse(localStorage.getItem("COMPRAS"));
        setProdutos(produtosSalvos);
    }, []);

    const finalizarCompra = async () => {
        if (!nomeCliente) {
            alert("Por favor, insira o nome do cliente.");
            return
        }

        var url = "https://backend-completo.vercel.app/app/venda"
        var dados = {
            nomeCliente: nomeCliente,
            data: dataAtual,
            produtos: produtos
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.status === 200) {
                alert("Compra finalizada com sucesso!");
                localStorage.removeItem("COMPRAS");
                setProdutos([]);
                setTimeout(() => {
                    navigate('/');
                }, 750);
                console.log(retorno)
            }
        })


    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <NavBarUsuario />
            <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mt: 5 }}>
                Carrinho - Finalizar Compra
            </Typography>
            <Box sx={{ maxWidth: 800, mx: "auto", mt: 2, p: 3 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Finalizar Compra?
                    </Typography>

                    <TextField
                        label="Nome do Cliente"
                        variant="outlined"
                        fullWidth
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="body1" sx={{ mb: 3 }}>
                        <strong>Data:</strong> {dataAtual}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Produtos:
                    </Typography>

                    {produtos.length === 0 ? (
                        <Typography color="text.secondary">Nenhum produto no carrinho.</Typography>
                    ) : (
                        <List>
                            {produtos.map((produto, index) => (
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={produto.nome}
                                                src={produto.imagem || "/default.jpg"}
                                                variant="square"
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Box>
                                                        {produto.nome}
                                                        <Typography variant="body2" color="text.secondary">
                                                            R$ {produto.preco}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {produto.quantidade || 1}x
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    {index < produtos.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    )}

                    <Box textAlign="right" mt={4}>
                        <Button variant="contained" color="success" onClick={finalizarCompra}>
                            Finalizar
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default FinalizarCompra;
