// App.js
import React from 'react';
import Dashboard from './components/dashboard';
import Produtos from './components/produtos';
import Pessoas from './components/pessoas';
import Login from './components/login';
import Registrar from './components/registrar';
import Categorias from './components/categorias';
import ListaCategorias from './components/listaCategorias';
import ListaProdutos from './components/listaProdutos';
import EditaProdutos from './components/editaProdutos';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    Link
} from 'react-router-dom';



const Middleware = () => {
    var logado = localStorage.getItem("ALUNO_ITE");

    if (logado) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <nav style={{ display: "flex", gap: "10px" }}>
                    <Link to="/">Dashboard</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/pessoas">Pessoas</Link>
                    <Link to="/registrar">Registrar</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/categorias">Categorias</Link>
                    <Link to="/listaCategorias">Lista de Categorias</Link>
                    <Link to="/listaProdutos">Lista de Produtos</Link>
                    <Link to="/editaProdutos">Editar Produtos</Link>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrar" element={<Registrar />} />
                    <Route path="/listaCategorias" element={<ListaCategorias />} />
                    <Route path="/listaProdutos" element={<ListaProdutos />} /> 
                    <Route path="/editaProdutos/:codigo" element={<EditaProdutos />} /> 
                    <Route element={<Middleware />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
