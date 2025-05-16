import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

import {
    Box,
    Alert,
    TextField,
    Button,
    Typography,
    Snackbar,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl
} from "@mui/material";
import AppBar from "../materialUI/navBar"

const EditaProdutos = () => {
    const navigate = useNavigate();


    var usuario = localStorage.getItem("USUARIO")
    const [mensagem, setMensagem] = useState("");
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState(false);

    const { codigoProduto } = useParams();

    var [nome, setNome] = useState("")
    var [quantidade, setQuantidade] = useState("")
    var [preco, setPreco] = useState("")
    var [categoria, setCategoria] = useState("")
    var [descricao, setDescricao] = useState("")
    var [imagem, setImagem] = useState("")


    // Usado nos Radios
    const [categorias, setCategorias] = useState([])

    // Usado apenas para os inputs 
    const listaCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.status === 200) {
                // Esta certo
                setCategorias(retorno.data)
            }else{
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })
    }

    const listaProdutos = async () => {
        var url = `https://backend-completo.vercel.app/app/produtos/${usuario}`
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.status === 200 && Array.isArray(retorno.data)) {

                console.log(retorno)

                const produtoSelecionado = retorno.data.find(prod =>
                    prod._id === codigoProduto);
                
                // Esta certo
                // setId(produtoSelecionado._id);
                setNome(produtoSelecionado.nome);
                setQuantidade(produtoSelecionado.quantidade);
                setPreco(produtoSelecionado.preco);
                setCategoria(produtoSelecionado.categoria);
                setDescricao(produtoSelecionado.descricao);
                setImagem(produtoSelecionado.imagem)


                
                

            }else{
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })
    }

    const editaProdutos = async () => {

        var url = "https://backend-completo.vercel.app/app/produtos"
        var token = localStorage.getItem("ALUNO_ITE")
        var dados = {
            id: codigoProduto,
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            imagem: imagem
        }

        // atualizar dados
        await axios.put(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                setErro(true);
                setMensagem(retorno.data.error)
                return
            }
            if (retorno.status === 200) {
                setErro(false);
                setMensagem("Produto editado com sucesso.");
                setOpen(true);

                setTimeout(() => {
                    navigate('/listaProdutos');
                }, 1500);
            }else{
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        listaProdutos()
        listaCategorias()
    }, [])

    return (
        <>
        <AppBar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 72px)",
                    bgcolor: "#f0f0f0",
                }}
            >
                <Box
                    sx={{
                        width: 400,
                        p: 4,
                        borderRadius: 2,
                        border: "2px solid #1976d2",
                        bgcolor: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" mb={2}>
                        Editar Produto
                    </Typography>
                    <TextField
                        fullWidth
                        label="Nome do Produto"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label="Quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label="Preço"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl component="fieldset" sx={{ mb: 2, textAlign: 'left' }}>
                        <FormLabel component="legend">Categoria</FormLabel>
                        <RadioGroup
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            {categorias.map((cat) => (
                                <FormControlLabel
                                    key={cat._id}
                                    value={cat.nome}
                                    control={<Radio />}
                                    label={cat.nome}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Imagem"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={editaProdutos}
                    >
                        Salvar Alterações
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
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

export default EditaProdutos