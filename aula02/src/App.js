import React from "react"


// Arrow function
// function App ( ) { }

const App = () =>
{
    var [ getValor, setValor ] = React.useState(10)
    var numero = 4
    numero = numero * 8

    const Clique = () => {
        numero = numero + 10
        setValor(getValor + 1)
        console.log(numero)
    }
    return(
    <div>
        <h1>Ola mundo!!</h1>
        <h2>Hoje é quinta</h2>
        <h3>{numero}</h3>
        <input type="button" onClick={() => {Clique()}} value='Clique Aqui'/>
        <h3>{getValor}</h3>
    </div>
    )
}

export default App