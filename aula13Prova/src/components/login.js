import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Alert,
    TextField,
    Button,
    Typography,
    Snackbar,
} from "@mui/material";
import AppBar from "./materialUI/navBar"

import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    var [usuario, setUsuario] = useState('')
    var [senha, setSenha] = useState('')

    const [mensagem, setMensagem] = useState("");
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState(false);

    const validaUsuario = async () => {
        var url = "https://backend-completo.vercel.app/app/login"
        var dados = {
            usuario,
            senha
        }

        await axios.post(
            url,
            dados
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.erro) {
                setErro(true);
                setMensagem(retorno.data.erro);
                setOpen(true);
                return
            }
            if (retorno.data.token) {
                setErro(false);
                setMensagem("Login efetuado com sucesso.");
                setOpen(true);
                localStorage.setItem("ALUNO_ITE", retorno.data.token)
                setTimeout(() => {
                    navigate('/');
                }, 1500);
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
        <>
            <AppBar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 72px)", // considera a altura da NavBar
                    bgcolor: "#f0f0f0",
                }}
            >
                <Box
                    sx={{
                        width: 300,
                        p: 4,
                        borderRadius: 2,
                        border: "2px solid #1976d2",
                        bgcolor: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" mb={2}>
                        Faça seu login
                    </Typography>
                    <TextField
                        fullWidth
                        label="Usuário"
                        variant="outlined"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        variant="outlined"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={validaUsuario}
                    >
                        Logar
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={3000}
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
        // <div>


        //     <h1>Faça seu login</h1>
        //     <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
        //     <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
        //     <input type="button" value="Logar" onClick={() => validaUsuario()} />
        // </div>
    )

}

export default Login