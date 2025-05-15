import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Alert,
    TextField,
    Button,
    Typography,
    Snackbar,
    Radio,
    FormControl,
    FormControlLabel,
    RadioGroup,
    FormLabel
} from '@mui/material'
import AppBar from "../materialUI/navBar"


const Produtos = () => {
    var [nome, setNome] = useState('')
    var [quantidade, setQuantidade] = useState('')
    var [preco, setPreco] = useState('')
    var [categoria, setCategoria] = useState('')
    var [descricao, setDescricao] = useState('')
    var [imagem, setImagem] = useState('')
    var [categorias, setCategorias] = useState([])
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('');
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        listarCategoria();
    }, []);

    const listarCategoria = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"

        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                setErro(true)
                setMensagem(retorno.data.error)
                setOpen(true)
                return
            }
            if (retorno.status === 200) {
                setCategorias(retorno.data)
                console.log(retorno.data)
            } else {
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })
    }


    const cadastrarProduto = async () => {
        var url = `https://backend-completo.vercel.app/app/produtos`
        var dados = {
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            imagem: imagem
        }

        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                setErro(true)
                setMensagem(retorno.data.error)
                setOpen(true)
                return
            }
            if (retorno.data._id) {
                setErro(false)
                setMensagem("Produto cadastrado com sucesso.")
                setOpen(true)
                setTimeout(() => {
                    navigate('/listaProdutos');
                }, 750);
            } else {
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        // "div" vazia pq tem que retornar apenas uma div
        // Conhecido como  Fragmento React ou Fragment
        <>
            <AppBar />
            {/* "Div" da tela inteira  */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 72px)',
                    bgcolor: '#f0f0f0',
                }}
            >
                {/* "Div" envolvendo todo o conteudo */}
                <Box
                    sx={{
                        width: 400,
                        p: 4,
                        borderRadius: 2,
                        border: '2px solid #1976d2',
                        bgcolor: 'white',
                        textAlign: 'center',
                    }}
                >
                    {/* Titulo */}
                    <Typography variant="h5" mb={2}>
                        Cadastrar Produto
                    </Typography>

                    {/* Div do Nome e Quantidade */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Nome do produto"
                            variant="outlined"
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Quantidade"
                            type="number"
                            variant="outlined"
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </Box>

                    {/* div do Preço e Descrição */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Preço"
                            type="number"
                            variant="outlined"
                            onChange={(e) => setPreco(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Descrição"
                            variant="outlined"
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Box>

                    {/* Campo Imagem/URl */}
                    <TextField
                        fullWidth
                        label="Imagem (URL)"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onChange={(e) => setImagem(e.target.value)}
                    />

                    {/* RadioGroup de Categorias */}
                    <FormControl
                        component="fieldset"
                        sx={{
                            mb: 2,
                            width: '100%',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* Titulo */}
                        <FormLabel component="legend">Categorias</FormLabel>
                        {/* Radio Group com as Categorias */}
                        <RadioGroup
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 1,
                                    pl: 1
                                }}
                            >
                                {categorias.map((categoria, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={categoria.nome}
                                        control={<Radio />}
                                        label={categoria.nome}
                                        sx={
                                            categorias.length % 2 === 1 && index === categorias.length - 1
                                                ? {
                                                    gridColumn: '1 / -1',
                                                    justifySelf: 'center'
                                                }
                                                : {}
                                        }
                                    />
                                ))}
                            </Box>
                        </RadioGroup>

                    </FormControl>

                    {/* Botao Cadastrar com OnClick */}
                    <Button fullWidth variant="contained" color="primary" onClick={cadastrarProduto}>
                        Cadastrar Produto
                    </Button>
                </Box>
            </Box>

            {/* Mensagem de Erro ou Sucesso */}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={erro ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {mensagem}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Produtos