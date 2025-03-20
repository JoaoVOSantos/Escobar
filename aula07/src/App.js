import React, { useState } from 'react';
import axios from 'axios'
const App = () => {
    // APT
    const Buscar = async() => {
        const url = "http://viacep.com.br/ws/17050790/json/"
        await axios.get( url )
            .then( retorno => {
                console.log(retorno)
            })
            .catch( erro => {
                    
            })
            console.log("oi")
        //.get .post .delete
    }
    return (
        <div>
            <input type='text' value='buscar' onClick={ () => Buscar() }/>
        </div>
    );
};

export default App;
