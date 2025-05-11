import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShieldIcon from '@mui/icons-material/Shield';
import axios from "axios";
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
 
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const logout = () => {
        localStorage.removeItem("ALUNO_ITE")
        alert("Logout efetuado com sucesso")
    }

    const limpar = async () => {
        var url = "https://backend-completo.vercel.app/app/limpar"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.erro) {
                alert(retorno.data.erro)
                return
            }
            if (retorno.status === 200) {
                alert(retorno.data.mensagem)
                console.log(retorno)
            }
        })
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Icone */}
                    <ShieldIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    {/* Escrita Admin */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Admin
                    </Typography>

                    {/* Itens do NavBar */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            key="produtos"
                            component={Link}
                            to="/produtos"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                        >
                            Criar Produtos
                        </Button>
                        <Button
                            key="categorias"
                            component={Link}
                            to="/categorias"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                        >
                            Criar Categorias
                        </Button>

                        <Button
                            key="vendas"
                            component={Link}
                            to="/vendas"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                        >
                            Criar Vendas
                        </Button>


                        <Button
                            key="listaProdutos"
                            component={Link}
                            to="/listaProdutos"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                        >
                            Lista Produtos
                        </Button>

                        <Button
                            key="listaCategorias"
                            component={Link}
                            to="/listaCategorias"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                        >
                            lista Categorias
                        </Button>

                        <Button
                            key="listaVendas"
                            component={Link}
                            to="/listaVendas"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                        >
                            lista Vendas
                        </Button>
                    </Box>


                    {/* Itens do Menu Do Perfil */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >


                            <Button
                                key="login"
                                component={Link}
                                to="/login"
                                onClick={handleCloseNavMenu}
                                sx={{ color: 'black', display: 'block', textDecoration: 'none', p: 2 }}
                            >
                                Login
                            </Button>



                            <Button
                                key="registrar"
                                component={Link}
                                to="/registrar"
                                onClick={handleCloseNavMenu}
                                sx={{ color: 'black', display: 'block', textDecoration: 'none', p: 2 }}
                            >
                                Registrar
                            </Button>



                            <Button
                                key="logout"
                                onClick={() => {
                                    handleCloseNavMenu()
                                    logout()
                                }}
                                sx={{ color: 'black', display: 'block', textDecoration: 'none', p: 2 }}
                            >
                                Logout
                            </Button>

                            <Button
                                key="logout"
                                onClick={() => {
                                    handleCloseNavMenu()
                                    limpar()
                                }}
                                sx={{ color: 'black', display: 'block', textDecoration: 'none', p: 2 }}
                            >
                                Limpar Tabelas
                            </Button>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
