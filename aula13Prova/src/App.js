// App.js
import React from 'react';
import Dashboard from './components/dashboard';
import Produtos from './components/produtos';
import Pessoas from './components/pessoas';
import Login from './components/login';
import Registrar from './components/registrar';
import Categorias from './components/categorias';
import Vendas from './components/vendas';
import ListaCategorias from './components/listaCategorias';
import ListaProdutos from './components/listaProdutos';
import EditaProdutos from './components/editaProdutos';
import Limpar from './components/limpar';
import ListaVendas from './components/listaVendas';
import EditaCategorias from './components/editaCategorias';

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
                    <Link to="/pessoas">Pessoas</Link>
                    <Link to="/registrar">Registrar</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/categorias">Categorias</Link>
                    <Link to="/vendas">Vendas</Link>
                    <Link to="/listaCategorias">Lista de Categorias</Link>
                    <Link to="/listaProdutos">Lista de Produtos</Link>
                    <Link to="/listaVendas">Lista de Vendas</Link>
                    <Link to="/editaProdutos">Editar Produtos</Link>
                    <Link to="/limpar">limpar</Link>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrar" element={<Registrar />} />
                    <Route element={<Middleware />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                        <Route path="/listaCategorias" element={<ListaCategorias />} />
                        <Route path="/listaProdutos" element={<ListaProdutos />} />
                        <Route path="/editaProdutos/:codigoProduto" element={<EditaProdutos />} />
                        <Route path="/editaCategorias/:codigoCategoria" element={<EditaCategorias />} />
                        <Route path="/vendas" element={<Vendas />} />
                        <Route path="/listaVendas" element={<ListaVendas />} />
                        <Route path="/limpar" element={<Limpar />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
