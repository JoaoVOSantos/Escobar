import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListaVendas = () => {

    var [vendas, setVendas] = useState([])

    const listarVendas = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"

        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.status === 200) {
                alert("Listagem de Vendas - sucesso.")
                setVendas(retorno.data)
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Vendas</h1>

            <input type="button" value="Listar Vendas" onClick={() => listarVendas()} />

            <table border='1'>
                <thead>
                    <tr>
                        <th>Nome do Cliente</th>
                        <th>usuario</th>
                        <th>data</th>
                        <th>Produtos</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda, indice) => (
                        <tr key={indice}>
                            <td>{venda.nomeCliente}</td>
                            <td>{venda.usuario}</td>
                            <td>{venda.data}</td>

                            <td>
                                {venda.produtos.map((produto, indiceProduto) => (
                                    <p key={indiceProduto}>
                                        {produto.nome} - {produto.quantidade} - {produto.preco}
                                    </p>
                                ))}
                            </td>
                            <td><Link to={"/editaVendas/" + venda._id}>Editar</Link></td>
                            <td><Link to={"/excluiVendas/" + venda._id}>Excluir</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ListaVendas