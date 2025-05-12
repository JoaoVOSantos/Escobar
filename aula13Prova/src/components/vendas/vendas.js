import React, { useState, useEffect } from "react";
import axios from "axios";

const Vendas = () => {

    var [nome, setNome] = useState('')
    var [data, setData] = useState('')
    var [produtos, setProdutos] = useState([])
    const [produtosVendidos, setProdutosVendidos] = useState([])

    const cadastrarVenda = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"
        var dados = {
            nomeCliente: nome,
            data: data,
            produtos: produtosVendidos
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.status === 200) {
                alert("Venda cadastrada com sucesso.")
                console.log(retorno)
            }
        })
    }


    useEffect(() => {
        listarProdutos();
    }, []);

    const listarProdutos = async () => {
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
                setProdutos(retorno.data)
                console.log(retorno)
            }
        })

    }


    return (
        <div>
            <h1>Vendas</h1>
            <input type="text" placeholder="Nome do cliente" onChange={(e) => setNome(e.target.value)} />
            <input type="date" placeholder="Data" onChange={(e) => setData(e.target.value)} />

            {produtos.map((produto, indice) => (
                <div key={indice}>
                    <img src={produto.imagem} alt={produto.nome} />
                    <h1>{produto.nome}</h1>
                    <h2>{produto.preco}</h2>
                    <h3>{produto.descricao}</h3>
                    <input type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                setProdutosVendidos([...produtosVendidos, produto])
                            } else {
                                // filtra e exclui do array os produtos que não foram selecionados
                                setProdutosVendidos(produtosVendidos.filter(p => p._id !== produto._id))
                            }
                        }}
                    />
                </div>
            ))}

            <input type="button" value="Cadastrar Venda" onClick={() => cadastrarVenda()} />
        </div>
    )
}

export default Vendas