import React, { useState } from "react";
import axios from "axios";

const Produtos = () => {
    var [nome, setNome] = useState('')
    var [quantidade, setQuantidade] = useState('')
    var [preco, setPreco] = useState('')
    var [categoria, setCategoria] = useState('')
    var [descricao, setDescricao] = useState('')
    var [usuario, setUsuario] = useState('')
    var [imagem, setImagem] = useState('')


    const cadastrarProduto = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
        var dados = {
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            usuario: usuario,
            imagem: imagem
        }
        
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            {headers: { Authorization: `Bearer ${token}` }}
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.data._id) {
                alert("Prduto cadastrado com sucesso.")
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Produtos</h1>
            <input type="text" placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="Nome do usuario" onChange={(e) => setUsuario(e.target.value)} />
            <input type="number" placeholder="quantidade" onChange={(e) => setQuantidade(e.target.value)} />
            <input type="number" placeholder="preço" onChange={(e) => setPreco(e.target.value)} />

            {/* Fazer puxando do banco */}
            <input type="text" placeholder="categoria" onChange={(e) => setCategoria(e.target.value)} />

            <input type="text" placeholder="descricao" onChange={(e) => setDescricao(e.target.value)} />
            <input type="text" placeholder="imagem" onChange={(e) => setImagem(e.target.value)} />
            <input type="button" value="Cadastrar Produto" onClick={() => cadastrarProduto()} />
        </div>
    )
}

export default Produtos