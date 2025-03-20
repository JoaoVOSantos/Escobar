import React, { useState } from 'react';
import Filho from './compoment/Filho';

const App = () => {

    const [getValor, setValor] = useState("")

    const Recebe = (valor) => {
        setValor(getValor + valor)
    };

    const calcularResultado = () => {
        try{
        setValor(eval(getValor))
        }catch{
            setValor("Erro na Conta")
        }
    };

    const limpar = () => {
        setValor("");
    };

    const estilos = {
        fundo: {
            width: "410px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px"
        },
        head: {
            fontFamily: "Arial, sans-serif",
            fontSize: "25px",
            fontWeight: "bold",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px"
        },
        botao: {
            width: "300px",
            height: "40px",
            fontSize: "30px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "5px",
            outline: "none"
        },
        botoesContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // Organiza em 4 colunas
            gap: "10px",
            marginTop: "20px"
        }    


    }

    return (
        <div style={estilos.fundo}>
            <div style={estilos.head}>
                <div>Calculadora</div>
                <h1 style={estilos.botao}>{getValor}</h1>
            </div>
            <div style={estilos.botoesContainer}>
                <Filho valor="1" cor="gray" callback={Recebe} />
                <Filho valor="2" cor="gray" callback={Recebe} />
                <Filho valor="3" cor="gray" callback={Recebe} />
                <Filho valor="+" cor="#AAA" callback={Recebe} />

                <Filho valor="4" cor="#CCC" callback={Recebe} />
                <Filho valor="5" cor="#CCC" callback={Recebe} />
                <Filho valor="6" cor="#CCC" callback={Recebe} />
                <Filho valor="-" cor="#AAA" callback={Recebe} />

                <Filho valor="7" cor="#CCC" callback={Recebe} />
                <Filho valor="8" cor="#CCC" callback={Recebe} />
                <Filho valor="9" cor="#CCC" callback={Recebe} />
                <Filho valor="*" cor="#AAA" callback={Recebe} />

                <Filho valor="C" cor="orange" callback={limpar} />
                <Filho valor="0" cor="#CCC" callback={Recebe} />
                <Filho valor="=" cor="green" callback={calcularResultado} />
                <Filho valor="/" cor="#AAA" callback={Recebe} />
            </div>
        </div>
    );
};

export default App;
