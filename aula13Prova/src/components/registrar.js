import React, { useState } from "react";
import axios from "axios";
import {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Fun o que renderiza o formul rio de cadastro de usu rio
 * 
 * @returns {React.Component} O componente que renderiza o formul rio
 */
/*******  c3fd9427-4ba8-476a-bf0f-70bbcff75c00  *******/  Box,
    Alert,
    TextField,
    Button,
    Typography,
    Snackbar,
} from "@mui/material";


const Registrar = () => {
    var [usuario, setUsuario] = useState('')
    var [senha, setSenha] = useState('')
    var [senhaConfirma, setSenhaConfirma] = useState('')

    const [mensagem, setMensagem] = useState("");
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState(false);

    const registraUsuario = async () => {
        var url = "https://backend-completo.vercel.app/app/registrar"
        var dados = {
            usuario: usuario,
            senha: senha,
            confirma: senhaConfirma
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
            if (retorno.data._id) {
                setErro(false);
                setMensagem("Usuário cadastrado com sucesso!");
                setOpen(true);
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

    return (
        <>
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
                        width: 300,
                        p: 4,
                        borderRadius: 2,
                        border: "2px solid #1976d2",
                        bgcolor: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" mb={2}>
                        Faça seu Registro
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
                    <TextField
                        fullWidth
                        label="Confirmar Senha"
                        type="password"
                        variant="outlined"
                        value={senhaConfirma}
                        onChange={(e) => setSenhaConfirma(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={registraUsuario}
                    >
                        Registrar
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
        //     <h1>Faça seu Registro</h1>

        //     <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
        //     <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
        //     <input type="password" placeholder="SenhaConfirma" onChange={(e) => setSenhaConfirma(e.target.value)} required />
        //     <input type="button" value="Registrar" onClick={() => registraUsuario()} />
        // </div>
    )

}

export default Registrar