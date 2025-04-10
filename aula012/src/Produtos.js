import React from "react";
import axios from "axios";
import { CssVarsProvider } from "@mui/material";

const Produtos = () => {

    const BuscarProdutos = async () => {
        //axios.get, post, put, delete, patch
        var token = localStorage.getItem("ALUNO_ITE")

        var url = "https://backend-aula.vercel.app/app/produtos"
        axios.get(
            url,
            {
                headers: {
                    "Authorization": "Bearer" + token
                }
            }
        ).then( retorno =>{
            console.log(retorno)
        })
    }

    return(
        <div>
            <h1>Produtos</h1>
            <input type="button" value="Buscar" onClick={() => BuscarProdutos()}/>
        </div>
    )
}

export default Produtos