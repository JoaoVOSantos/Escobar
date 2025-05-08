import React, { useState } from "react";
import axios from "axios";


const EditaProdutos = () => {

    var [id, setId] = useState('')
    var [nome, setNome] = useState('')
    var [quantidade, setQuantidade] = useState('')
    var [preco, setPreco] = useState('')
    var [categoria, setCategoria] = useState('')
    var [descricao, setDescricao] = useState('')
    var [imagem, setImagem] = useState('')

    const EditaProdutos = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
        var dados = {
            id: id,
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            imagem: imagem
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.put(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.erro) {
                alert(retorno.data.erro)
                return
            }
            if (retorno.status === 200) {
                alert("Edição de Produtos - sucesso.")
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Editar Produtos</h1>
            <div>
                <h1>Produtos</h1>
                <input type="text" placeholder="Id do Produto" onChange={(e) => setId(e.target.value)} />
                <input type="text" placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)} />
                <input type="number" placeholder="quantidade" onChange={(e) => setQuantidade(e.target.value)} />
                <input type="number" placeholder="preço" onChange={(e) => setPreco(e.target.value)} />
                {/* Fazer puxando do backend */}
                <input type="text" placeholder="categoria" onChange={(e) => setCategoria(e.target.value)} />
                <input type="text" placeholder="descricao" onChange={(e) => setDescricao(e.target.value)} />
                <input type="text" placeholder="imagem" onChange={(e) => setImagem(e.target.value)} />
                <input type="button" value="Editar Produtos" onClick={() => EditaProdutos()} />
            </div>
        </div>
    )
}

export default EditaProdutos