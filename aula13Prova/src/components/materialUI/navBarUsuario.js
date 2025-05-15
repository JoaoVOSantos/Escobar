import React from 'react';
import { AppBar, 
        Toolbar, 
        Typography, 
        Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NavBarUsuario = () => {
    return (
        <AppBar position="sticky" sx={{ bgcolor: "#1976d2" }}>
            <Toolbar>
                <HomeIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/registrar"
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
                    Usuario
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

            </Toolbar>
        </AppBar>
    );
};

export default NavBarUsuario;
