import React, { useState } from "react"
import axios from "axios"

import {Box, 
    Alert, 
    TextField, 
    Button, 
    Typography, 
    Snackbar} from '@mui/material'

const Categorias = () => {
    var [categoria, setCategoria] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [open, setOpen] = useState(false)
    const [erro, setErro] = useState(false)


    const cadastrarCategoria = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            nome_categoria: categoria,
        }

        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                setErro(true)
                setMensagem(retorno.data.error)
                setOpen(true)
                return
            }
            if (retorno.data._id) {
                setErro(false)
                setMensagem("Categoria cadastrada com sucesso.")
                setOpen(true)
            }
        })

    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 72px)', // considera a altura da NavBar
                    bgcolor: '#f0f0f0',
                }}
            >
                <Box
                    sx={{
                        width: 300,
                        p: 4,
                        borderRadius: 2,
                        border: '2px solid #1976d2',
                        bgcolor: 'white',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" mb={2}>
                        Categorias
                    </Typography>
                    <TextField
                        fullWidth
                        label="Nome da categoria"
                        variant="outlined"
                        onChange={(e) => setCategoria(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={cadastrarCategoria}
                    >
                        Cadastrar Categoria
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={erro ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {mensagem}
                </Alert>
            </Snackbar>

        </>

    )
}

export default Categorias