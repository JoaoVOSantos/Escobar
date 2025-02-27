import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(
  <React.StrictMode>
    <div>
      Joao Vitor
    </div>
    <Texto />
    <Texto />
    <Texto />
    <Texto />
  </React.StrictMode>
)

function Texto() { //componente
  var [valor,setValor] = React.useState()

  function mudarValor(e){ // função interna do componente Texto
    setValor(e.target.value * 5)
  }
  return (
    <div>
      <input type='text' onChange={(e) => mudarValor(e)}/>
      <span>{ valor }</span>
      <hr/>
    </div>
  )
}

