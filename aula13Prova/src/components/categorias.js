import React, { useState } from "react";
import axios from "axios";

const Categorias = () => {
    var [categoria, setCategoria] = useState('')



    const cadastrarCategoria = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            nome_categoria: categoria,
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
                alert("Categoria cadastrada com sucesso.")
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Categorias</h1>
            <input type="text" placeholder="Nome da categoria" onChange={(e) => setCategoria(e.target.value)} />
            <input type="button" value="Cadastrar Categoria" onClick={() => cadastrarCategoria()} />
        </div>
    )
}

export default Categorias