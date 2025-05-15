import React, { useState, useEffect } from "react"
import axios from "axios"

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
    Alert,
    Snackbar,
} from "@mui/material"
import AppBar from "../materialUI/navBar"

const ListaVendas = () => {

    var [vendas, setVendas] = useState([])

    const [mensagem, setMensagem] = useState("")
    const [open, setOpen] = useState(false)
    const [erro, setErro] = useState(false)


    useEffect(() => {
        listarVendas()
    }, [])

    const listarVendas = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"
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
            }
            if (retorno.status === 200) {
                setVendas(retorno.data)
                console.log(retorno)
            } else {
                setErro(true);
                setMensagem("Conexão com Servidor Falhou")
                setOpen(true);
            }
        })
    }


    const excluirVendas = async (vendaId) => {
        var url = "https://backend-completo.vercel.app/app/venda"
        var dados = {
            id: vendaId
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
                setMensagem("Venda excluída com sucesso.");
                setOpen(true);
                listarVendas();
            } else {
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
        <>
        <AppBar />
            <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
                <Typography variant="h4" mb={3} textAlign="center">
                    Lista de Vendas
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#1976d2" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>ID Venda</TableCell>
                                <TableCell sx={{ color: "white" }}>Cliente</TableCell>
                                <TableCell sx={{ color: "white" }}>Usuário</TableCell>
                                <TableCell sx={{ color: "white" }}>Data</TableCell>
                                <TableCell sx={{ color: "white" }}>Produtos</TableCell>
                                <TableCell sx={{ color: "white" }}>Excluir</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vendas.map((venda, indice) => (
                                <TableRow key={indice}>
                                    <TableCell>{venda._id}</TableCell>
                                    <TableCell>{venda.nomeCliente}</TableCell>
                                    <TableCell>{venda.usuario}</TableCell>
                                    <TableCell>{new Date(venda.data).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>
                                        {venda.produtos.map((produto, i) => (
                                            <Typography variant="body2" key={i}>
                                                {produto.nome} - {produto.quantidade} - R${produto.preco}
                                            </Typography>
                                        ))}
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            onClick={() => excluirVendas(venda._id)}
                                            variant="outlined"
                                            color="error"
                                            size="small"
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
        </>

        // <div>
        //     <h1>Vendas</h1>

        //     <table border='1'>
        //         <thead>
        //             <tr>
        //                 <th>Id Venda</th>
        //                 <th>Nome do Cliente</th>
        //                 <th>usuario</th>
        //                 <th>data</th>
        //                 <th>Produtos</th>
        //                 <th>Editar</th>
        //                 <th>Excluir</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {vendas.map((venda, indice) => (
        //                 <tr key={indice}>
        //                     <th>{venda._id}</th>
        //                     <td>{venda.nomeCliente}</td>
        //                     <td>{venda.usuario}</td>
        //                     <td>{venda.data}</td>

        //                     <td>
        //                         {venda.produtos.map((produto, indiceProduto) => (
        //                             <p key={indiceProduto}>
        //                                 {produto.nome} - {produto.quantidade} - {produto.preco}
        //                             </p>
        //                         ))}
        //                     </td>
        //                     <td><Link to={"/editaVendas/" + venda._id}>Editar</Link></td>
        //                     <td><input type="button" value="Excluir" onClick={() => excluirVendas(venda._id)} /></td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>

        // </div>
    )
}

export default ListaVendas