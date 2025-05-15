import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NavBarUsuario = () => {
    return (
        <AppBar position="sticky" sx={{ bgcolor: "#1976d2" }}>
            <Toolbar>
                <HomeIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                    Dashboard
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
               
            </Toolbar>
        </AppBar>
    );
};

export default NavBarUsuario;
