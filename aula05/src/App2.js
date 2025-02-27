import React, { useState } from 'react';
import data from './data.json';

function App() {
  const [getValorPesquisa, setValorPesquisa] = useState('');

  const tabela = data.filter(item =>
    item.name.toLowerCase().includes(getValorPesquisa.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Pesquisar..." value={getValorPesquisa} onChange={e => setValorPesquisa(e.target.value)}/>
      
      <table border='1'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tabela.map((item, indiceDoItem) => (
            <tr key={indiceDoItem}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;