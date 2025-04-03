//App.js
import { useState, useEffect } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet
} from 'react-router-dom'

// Tela Login
const Login = ({ callback }) => {
    const [dados, setDados] = useState({ usuario: "", senha: "" })

    const handleSubmit = () => {
        callback(dados)
    }

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={dados.usuario}
                onChange={(e) => setDados({ ...dados, usuario: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={dados.senha}
                onChange={(e) => setDados({ ...dados, senha: e.target.value })}
            />
            <button type="button" onClick={handleSubmit}>Login</button>
        </div>
    )
}

const Dashboard = () => {
    return <h2>Seja bem-vindo ao Dashboard</h2>
}

const RotasPrivadas = () => {
    var auth = localStorage.getItem("MEU_SITE")
    if (auth)
        return <Outlet />
    else
        return <Navigate to="/login" />
}

const App = () => {
    const [autenticado, setAuthentication] = useState(false)

    const EfetuaLogin = (dados) => {
        if (dados.usuario === "teste" && dados.senha === "123") {
            localStorage.setItem("MEU_SITE", true)
            setAuthentication(true)
            window.location = "/dashboard"
        } else {
            console.log("USUARIO E OU SENHA INVALIDOS")
        }
    }

    const Deslogar = () => {
        localStorage.removeItem("MEU_SITE")
        setAuthentication(false)
    }

    useEffect(() => {
        VerificaLogin()
    }, [])

    const VerificaLogin = () => {
        var auth = localStorage.getItem("MEU_SITE")
        if (auth) {
            setAuthentication(true)
        }
        else
            setAuthentication(false)
    } 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                        <Login callback={EfetuaLogin} />} 
                />
                <Route element={ <RotasPrivadas/> } >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/teste" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App