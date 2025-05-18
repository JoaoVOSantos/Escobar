// App.js
import React from 'react';
import Dashboard from './components/dashboard';
import Produtos from './components/produtos/produtos';
import Login from './components/login';
import Registrar from './components/registrar';
import Categorias from './components/categorias/categorias';
import Vendas from './components/vendas/vendas';
import ListaCategorias from './components/categorias/listaCategorias';
import ListaProdutos from './components/produtos/listaProdutos';
import EditaProdutos from './components/produtos/editaProdutos';
import ListaVendas from './components/vendas/listaVendas';
import EditaCategorias from './components/categorias/editaCategorias';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline'
import FinalizarCompra from './finalizarCompra';




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
        <CssBaseline />
        <title>Prova React</title>

            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrar" element={<Registrar />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route element={<Middleware />}>
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/listaCategorias" element={<ListaCategorias />} />
                        <Route path="/listaProdutos" element={<ListaProdutos />} />
                        <Route path="/editaProdutos/:codigoProduto" element={<EditaProdutos />} />
                        <Route path="/editaCategorias/:codigoCategoria" element={<EditaCategorias />} />
                        <Route path="/vendas" element={<Vendas />} />
                        <Route path="/listaVendas" element={<ListaVendas />} />
                        <Route path="/finalizarCompra" element={<FinalizarCompra />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
