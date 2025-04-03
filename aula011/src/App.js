//App.js
import React from 'react'
import Dashboard from './components/dashboard'
import Produtos from './components/produtos'
import Pessoas from './components/pessoas'

import {BrowserRouter,
        Routes,
        Route,
        Link,
        Navigate,
        Outlet} from 'react-router-dom'

const Middleware = () => {
    var logado = true

    if (logado)
        return <Outlet/>
    else
        return <Navigate to="/login" />
}

const App = () => {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/produtos">Produtos</Link>
                <Link to="/pessoas">Pessoas</Link>
            </nav>
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/produtos' element={<Produtos/>} />
                <Route path='/pessoas' element={<Pessoas/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App