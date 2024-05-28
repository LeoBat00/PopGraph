import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import './styles.css';

const ControlesPanel = ({ onAddVertice, onAddAresta, onDeleteGrafo, onArvoreMinima, vertices }) => {
  const [newVerticerotulo, setnewVerticerotulo] = useState('');
  const [rotuloOrigem, setRotuloOrigem] = useState('');
  const [rotuloDestino, setRotuloDestino] = useState('');
  const [pesoAresta, setPesoAresta] = useState(1);
  const [verticeOrigem, setVerticeOrigem] = useState('');
  const [activeButton, setActiveButton] = useState('setup');

  const handleAddVertice = () => {
    if (newVerticerotulo.trim()) {
      onAddVertice(newVerticerotulo);
      setnewVerticerotulo('');
    } else {
      alert("O rótulo do vértice não pode ser vazio");
    }
  };

  const handleAddAresta = () => {
    if (rotuloOrigem.trim() && rotuloDestino.trim()) {
      onAddAresta(rotuloOrigem, rotuloDestino, pesoAresta);
      setRotuloOrigem('');
      setRotuloDestino('');
      setPesoAresta(1);
    } else {
      alert("Preencha os rótulos de origem e destino.");
    }
  };

  const handleSearchArvoreMinima = () => {
    const vertice = vertices.find(v => v.rotulo === verticeOrigem);
    if (vertice) {
      onArvoreMinima(vertice.id);
    } else {
      alert("Vértice com o rótulo fornecido não encontrado");
    }
  };

  return (
    <div className="controlPanel">
      <div className="headerControl">
        <img src="/UniforLogo.png" alt="Unifor Logo" />
        <h1>PopGraph</h1>
      </div>

      <Dropdown />

      <div className="controlButtons">
        <button
          className={`controlButton ${activeButton === 'setup' ? 'active' : ''}`}
          onClick={() => setActiveButton('setup')}
        >
          Setup
        </button>
        <button
          className={`controlButton ${activeButton === 'create' ? 'active' : ''}`}
          onClick={() => setActiveButton('create')}
        >
          Create
        </button>
      </div>

      <div className="controlMain">
        {activeButton === 'setup' ? (
          <div className="setupContainer">
            <input
              type='text'
              value={verticeOrigem}
              onChange={(e) => setVerticeOrigem(e.target.value)}
              placeholder="Rótulo do Vértice Origem"
            />
            <button onClick={handleSearchArvoreMinima}>Buscar Menor Caminho</button>
          </div>
        ) : (
          <div className="createContainer">
            <p style={{color: 'white'}}>Vertice</p>
            <input className='inputControl'
              type="text"
              value={newVerticerotulo}
              onChange={(e) => setnewVerticerotulo(e.target.value)}
              placeholder="Rótulo do Vértice"
            />
            <button className='buttonControl' onClick={handleAddVertice}>Adicionar Vértice</button>
            <p style={{color: 'white'}}>Aresta</p>

            <input className='inputControl' 
              type="text"
              value={rotuloOrigem}
              onChange={(e) => setRotuloOrigem(e.target.value)}
              placeholder="Rótulo de Origem"
            />
            <input className='inputControl'
              type="text"
              value={rotuloDestino}
              onChange={(e) => setRotuloDestino(e.target.value)}
              placeholder="Rótulo de Destino"
            />
            <input className='inputControl'
              type="number"
              value={pesoAresta}
              onChange={(e) => setPesoAresta(Number(e.target.value))}
              placeholder="Peso"
            />
            <button className='buttonControl' onClick={handleAddAresta}>Adicionar Aresta</button>
            <button className='buttonControl' onClick={onDeleteGrafo}>Deletar Grafo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlesPanel;
