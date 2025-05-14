import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Snackbar,
    Alert
} from "@mui/material"

const ListarCategoria = () => {

    var [categorias, setCategorias] = useState([])

    const [mensagem, setMensagem] = useState("");
    const [open, setOpen] = useState(false);
    const [erro, setErro] = useState(false);


    useEffect(() => {
        listarCategoria()
    }, [])


    const listarCategoria = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                setErro(true);
                setMensagem(retorno.data.error);
                setOpen(true);
                return
            }
            if (retorno.status === 200) {
                setCategorias(retorno.data)
                console.log(retorno)
            }
        })
    }

    const excluirCategoria = async (categoriaId) => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            id: categoriaId
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.delete(url, {
            data: dados,
            headers: { Authorization: `Bearer ${token}` }


        }).then(retorno => {
            if (retorno.data.erro) {
                setErro(true);
                setMensagem(retorno.data.erro);
                setOpen(true);
                return
            }
            if (retorno.status === 200) {
                setErro(false);
                setMensagem("Categoria excluída com sucesso.");
                setOpen(true);
                listarCategoria();
            }else{
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        }
        )
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" mb={3} textAlign="center">
                Lista de Categorias
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Nome da Categoria</TableCell>
                            <TableCell sx={{ color: "white" }}>Usuário</TableCell>
                            <TableCell sx={{ color: "white" }}>Editar</TableCell>
                            <TableCell sx={{ color: "white" }}>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria, index) => (
                            <TableRow key={index}>
                                <TableCell>{categoria._id}</TableCell>
                                <TableCell>{categoria.nome}</TableCell>
                                <TableCell>{categoria.usuario}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/editaCategorias/${categoria._id}`}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => excluirCategoria(categoria._id)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={open}
                autoHideDuration={3000}
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
        </Box>
        // <div>
        //     <h1>Categorias</h1>

        //     <table border='1'>
        //         <thead>
        //             <tr>
        //                 <th>Nome da Categoria</th>
        //                 <th>usuario</th>
        //                 <th>id</th>
        //                 <th>Editar</th>
        //                 <th>Excluir</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {categorias.map((categoria, indiceDaCategoria) => (
        //                 <tr key={indiceDaCategoria}>
        //                     <td>{categoria.nome}</td>
        //                     <td>{categoria.usuario}</td>
        //                     <td>{categoria._id}</td>
        //                     <td><input type="button" value="Editar" /></td>
        //                     <td><input type="button" value="Excluir" onClick={() => excluirCategoria(categoria._id)} /></td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>

        // </div>
    )
}

export default ListarCategoria