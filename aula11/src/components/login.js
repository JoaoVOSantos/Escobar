import {React, useState} from "react";
import axios from "axios"

const Login = () =>{
    var [usuario, setUsuario ] = useState('')
    var [senha, setSenha ] = useState('')


    const ValidaUsuario = async () => {
       var url = "https://backend-aula.vercel.app/app/login"
       var dados = {
            usuario: usuario,
            senha: senha
        }
        await axios.post(
            url,
            dados
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.erro){
                alert(retorno.data.erro)
                return
            }
            if(retorno.data.token){
                localStorage.setItem("ALUNO_ITE", retorno.data.token)
            }
        })
    
    }
    return(
        <div>
            <h1>Faça Seu Login</h1>
            <input type="text" placeholder="usuario" onChange={ (e) => setUsuario(e.target.value)} />
            <input type="password" placeholder="sua senha" onChange={ (e) => setSenha(e.target.value)} />
            <input type="button" value="Login" onClick={ () => ValidaUsuario() } />
        </div>
    )
}

export default Login