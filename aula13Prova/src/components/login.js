import React, {useState} from "react";
import axios from "axios";

const Login = () => {
    var [usuario, setUsuario] = useState('')
    var [senha, setSenha] = useState('')

    const validaUsuario = async () => {
        var url = "https://backend-completo.vercel.app/app/login"
        var dados = {
            usuario,
            senha
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
            if(retorno.data.token){
                alert("Login efetuado com sucesso")
                localStorage.setItem("ALUNO_ITE", retorno.data.token)
            }
        })
    }

    return(
        <div>

            
            <h1>Faça seu login</h1>
            <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)}/>
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
            <input type="button" value="Logar" onClick={() => validaUsuario()}/>
        </div>
    )

}

export default Login