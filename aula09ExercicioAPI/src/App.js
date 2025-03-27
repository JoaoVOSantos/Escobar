import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import MenuPrincipal from './template/MenuPrincipal'
import Cartao from './template/cartaopersonagem'
const tema = createTheme({
    palette: {
        mode: 'dark',
        primary:{
            main: '#ff5252',
        },
    },
})


const App = () => {
    return (
        <ThemeProvider theme={tema}>
            <CssBaseline />
            <MenuPrincipal/>
            <Cartao/>
        </ThemeProvider>
    );
};

export default App;
