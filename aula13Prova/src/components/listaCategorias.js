import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const ListarCategoria = () => {

    var [categorias, setCategorias] = useState([])


    useEffect(() => {
        listarCategoria();
    }, []);


    const listarCategoria = async () => {
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
                setCategorias(retorno.data)
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Categorias</h1>

            <table border='1'>
                <thead>
                    <tr>
                        <th>Nome da Categoria</th>
                        <th>usuario</th>
                        <th>id</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria, indiceDaCategoria) => (
                        <tr key={indiceDaCategoria}>
                            <td>{categoria.nome}</td>
                            <td>{categoria.usuario}</td>
                            <td>{categoria._id}</td>
                            <td><Link to={"/editaCategorias/" + categoria._id}>Editar</Link></td>
                            <td><Link to={"/excluiCategorias/" + categoria._id}>Excluir</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ListarCategoria