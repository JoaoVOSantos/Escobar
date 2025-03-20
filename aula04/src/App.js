import React, { useState } from 'react'
import Filho from './component/Filho'

const App = () => {

    var [valor, setValor] = useState()
    var [getCor, setCor] = useState()

    return (    
        <div style={
            { backgroundColor: "getCor"}
        }>
            <p>Digite uma palavra</p>
            <input type="text" onChange={(e) => setValor(e.target.value)}/>

            <p>Digite uma cor (em inglês)</p>
            <input type="text" onChange={(e) => setCor(e.target.value)}/>
            
            <Filho texto={ valor } getCor={ getCor}/>
        </div>
        
    )
}
export default App