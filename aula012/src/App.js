// App.js
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    Link
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Produtos from './Produtos';
import Pessoas from './Pessoas';
import Login from './components/Login';

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
                <nav>
                    <Link to="/">Dashboard</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/pessoas">Pessoas</Link>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<Middleware />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
