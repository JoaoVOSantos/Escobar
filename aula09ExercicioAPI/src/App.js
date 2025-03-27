import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import MenuPrincipal from './template/MenuPrincipal'
import axios from "axios"

var [getDados, setDados] = React.useState = ([])
const buscarDados = async () => {
    
        var url = "https://rickandmortyapi.com/api/character"

        await axios.get(url).then(resposta => {
           console.log(resposta.data.results)
        })
    }

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
            <MenuPrincipal />
            <input type="button" value="Buscar" onClick={() => buscarDados()} />
        </ThemeProvider>
    );
};

export default App;
