import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EditaCategorias = () => {

    const { codigo } = useParams();


    const editaCategorias = async () => {
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
                
                console.log(retorno)
                setProdutos(retorno.data)
            }
        })
    }


    return (
        <div>
            <h1>Editar Categorias</h1>
            <div>
                <h1>Categorias</h1>
                <input type="text" placeholder="Nome da Categoria" onChange={(e) => setNome(e.target.value)} />
            </div>
        </div>
    )
}

export default EditaCategorias