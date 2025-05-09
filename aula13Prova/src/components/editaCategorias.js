import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EditaCategorias = () => {

    const { codigoCategoria } = useParams()
    var [id, setId] = useState('')
    var [categoria, setCategoria] = useState('')

    var [categorias, setCategorias] = useState([])

    const editaCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            id: id,
            nome_categoria: categoria,
        }
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.put(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error)
                return
            }
            if (retorno.status === 200) {
                alert("Edição de Categorias - sucesso.")
                console.log(retorno)

            }
        })
    }

    useEffect(() => {

        listaCategorias()

    }, [])

    const listaCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
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
                setCategorias(retorno.data)
                console.log(retorno)

            }
        })
    }
    return (
        <div>
            <h1>Editar Categorias</h1>

            <h1>Categorias</h1>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            <input type="button" value="Editar" onChange={(e) => editaCategorias(e.target.value)} />

        </div>
    )
}

export default EditaCategorias