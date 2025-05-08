import React, { useState } from "react";
import axios from "axios";

const ListarCategoria = () => {

    var [categorias, setCategorias] = useState([])

    const ListarCategoria = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"

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
                alert("Listagem de Categorias - sucesso.")
                setCategorias(retorno.data)
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Categorias</h1>

            <input type="button" value="Listar Categorias" onClick={() => ListarCategoria()} />

            <table border='1'>
                <thead>
                    <tr>
                        <th>Nome da Categoria</th>
                        <th>usuario</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria, indiceDaCategoria) => (
                        <tr key={indiceDaCategoria}>
                            <td>{categoria.nome}</td>
                            <td>{categoria.usuario}</td>
                            <td>{categoria._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ListarCategoria