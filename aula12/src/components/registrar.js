import React, {useState} from "react";
import axios from "axios";

const Registrar = () => {
    var [usuario, setUsuario] = useState('')
    var [senha, setSenha] = useState('')
    var [senhaConfirma, setSenhaConfirma] = useState('')

    const registraUsuario = async () => {
        var url = "https://backend-aula.vercel.app/app/registrar"
        var dados = {
            usuario: usuario,
            senha: senha,
            confirma: senhaConfirma
        }

        await axios.post(
            url,
            dados
        ).then(retorno =>{
            console.log( retorno )
            if (retorno.data.erro){
                alert(retorno.data.erro)
                return
            }
            if(retorno.data._id){
                alert("Usuario cadastrado com sucesso:" + retorno.data._id + "Nome: " + retorno.data.usuario + "senha: " +  retorno.data.senha )
                console.log(retorno)
            }
        })
    }

    return(
        <div>
            <h1>Faça seu Registro</h1>

            <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)}/>
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
            <input type="password" placeholder="SenhaConfirma" onChange={(e) => setSenhaConfirma(e.target.value)} required/>
            <input type="button" value="Registrar" onClick={() => registraUsuario()} />
        </div>
    )

}

export default Registrar