import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'

import {
    Box,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material"
import AppBar from "../materialUI/navBar"

const EditaCategorias = () => {

    var [categoria, setCategoria] = useState('')

    const navigate = useNavigate()
    const { codigoCategoria } = useParams()
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState(false)
    const [open, setOpen] = useState(false)

    const editaCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            id: codigoCategoria,
            nome_categoria: categoria,
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.put(
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
            if (retorno.status === 200) {
                setErro(false)
                setMensagem("Categoria editada com sucesso.")
                setOpen(true)

                setTimeout(() => {
                    navigate('/listaCategorias')
                }, 1500)

            } else {
                setErro(true)
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true)
            }
        })
    }

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

                const categoriaSelecionada = retorno.data.find(cat =>
                    cat._id === codigoCategoria);
                setCategoria(categoriaSelecionada.nome)

            } else {
                setErro(true)
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true)
            }
        })
    }


    useEffect(() => {
        listaCategorias()
    },[])

    const handleClose = () => {
        setOpen(false)
    }

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
                        Editar Categoria
                    </Typography>

                    <TextField
                        fullWidth
                        label="Nome da Categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={editaCategorias}
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

export default EditaCategorias