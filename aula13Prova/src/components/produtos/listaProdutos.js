import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
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


const ListaProdutos = () => {

    var [produtos, setProdutos] = useState([])

    const [mensagem, setMensagem] = useState("")
    const [open, setOpen] = useState(false)
    const [erro, setErro] = useState(false)


    const listarProdutos = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
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
            }
        })
    }

    const excluirProduto = async (produtoId) => {
        var url = "https://backend-completo.vercel.app/app/produtos"
        var dados = {
            id: produtoId
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
                setMensagem("Produto excluído com sucesso.");
                setOpen(true);
                listarProdutos();
            }
        }
        )
    }


    const handleClose = () => {
        setOpen(false)
    };
    useEffect(() => {
        listarProdutos()
    }, [])

    return (
        <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" mb={3} textAlign="center">
                Lista de Produtos
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Usuário</TableCell>
                            <TableCell sx={{ color: "white" }}>Nome</TableCell>
                            <TableCell sx={{ color: "white" }}>Descrição</TableCell>
                            <TableCell sx={{ color: "white" }}>Categoria</TableCell>
                            <TableCell sx={{ color: "white" }}>Imagem</TableCell>
                            <TableCell sx={{ color: "white" }}>Preço</TableCell>
                            <TableCell sx={{ color: "white" }}>Quantidade</TableCell>
                            <TableCell sx={{ color: "white" }}>Editar</TableCell>
                            <TableCell sx={{ color: "white" }}>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos.map((produto, index) => (
                            <TableRow key={index}>
                                <TableCell>{produto._id}</TableCell>
                                <TableCell>{produto.usuario}</TableCell>
                                <TableCell>{produto.nome}</TableCell>
                                <TableCell>{produto.descricao}</TableCell>
                                <TableCell>{produto.categoria}</TableCell>
                                <TableCell>
                                    <img
                                        src={produto.imagem}
                                        alt={produto.nome}
                                        style={{ width: "100px", height: "75px", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                </TableCell>
                                <TableCell>R$ {produto.preco}</TableCell>
                                <TableCell>{produto.quantidade}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/editaProdutos/${produto._id}`}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => excluirProduto(produto._id)}
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
        // <div>
        //     <h1>Produtos</h1>

        //     <table border='1'>
        //         <thead>
        //             <tr>
        //                 <th>Nome do Produto</th>
        //                 <th>usuario</th>
        //                 <th>id</th>
        //                 <th>Descrição</th>
        //                 <th>Categoria</th>
        //                 <th>imagem</th>
        //                 <th>preço</th>
        //                 <th>quantidade</th>
        //                 <th>Editar</th>
        //                 <th>Excluir</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {produtos.map((produto, indiceDoProduto) => (
        //                 <tr key={indiceDoProduto}>
        //                     <td>{produto.nome} </td>
        //                     <td>{produto.usuario}</td>
        //                     <td>{produto._id}</td>
        //                     <td>{produto.descricao}</td>
        //                     <td>{produto.categoria}</td>
        //                     <td><img src={produto.imagem} width="100px" height="75px" alt={produto.nome} /></td>
        //                     <td>{produto.preco}</td>
        //                     <td>{produto.quantidade}</td>
        //                     <td><Link to={"/editaProdutos/" + produto._id}>Editar</Link></td>
        //                     <td><Link to='/excluirProdutos' >Excluir</Link></td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    )
}

export default ListaProdutos