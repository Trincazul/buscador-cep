import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import './styles.css'
import './services/api'
import api from './services/api';

function App() {

const [input, setInput] = useState('')
const [cep, setCEP] = useState({}); 

async function handleSearch() {
  if(input === ''){
    alert("Preencha algum cep")
  }
  try{
    // URL é cep + /json 
    const response = await api.get(`${input}/json`);
    setCEP(response.data);
    setInput("")
  }catch{
    alert("erro ao buscar !")
    setInput('')
  }

}
  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite o CEP"
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#38B0DE"/>
        </button>
      </div>

        
        {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
        )}
    </div>
  );
}

export default App;
