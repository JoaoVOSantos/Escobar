import React, { useState, useEffect } from "react";
import axios from "axios";

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

    const excluirCategoria = async (categoriaId) => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            id: categoriaId
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.delete(url, {
            data: dados,
            headers: { Authorization: `Bearer ${token}` }


        }).then(retorno => {
            if (retorno.data.erro) {
                alert(retorno.data.erro)
                console.log(categoriaId)
                return
            }
            if (retorno.status === 200) {
                alert("Categoria excluida com Sucesso")
                listarCategoria()
                console.log(retorno)
            }
        }
        )
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
                            <td><input type="button" value="Editar"  /></td>
                            <td><input type="button" value="Excluir" onClick={() => excluirCategoria(categoria._id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ListarCategoria