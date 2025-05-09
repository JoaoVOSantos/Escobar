import React, { useState } from "react";
import axios from "axios";

import {Link} from 'react-router-dom';


const ListaProdutos = () => {

    var [produtos, setProdutos] = useState([])

    const ListarProdutos = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
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
                alert("Listagem de Produtos - sucesso.")
                setProdutos(retorno.data)
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Produtos</h1>

            <input type="button" value="Listar Produtos" onClick={() => ListarProdutos()} />


            <table border='1'>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>usuario</th>
                        <th>id</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>imagem</th>
                        <th>preço</th>
                        <th>quantidade</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, indiceDoProduto) => (
                        <tr key={indiceDoProduto}>
                            <td>{produto.nome} </td>
                            <td>{produto.usuario}</td>
                            <td>{produto._id}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.categoria}</td>
                            <td><img src={produto.imagem} width="100px" height="75px" alt={produto.nome}/></td>
                            <td>{produto.preco}</td>
                            <td>{produto.quantidade}</td>
                            <td><Link to={"/editaProdutos/" + produto._id}>Editar</Link></td>
                            <td><Link to='/excluirProdutos' >Excluir</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaProdutos