import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import './styles.css';

const ControlesPanel = ({ onAddVertice, onAddAresta, onDeleteGrafo, onArvoreMinima, vertices, setCardapio }) => {
  const [newVerticerotulo, setnewVerticerotulo] = useState('');
  const [rotuloOrigem, setRotuloOrigem] = useState('');
  const [rotuloDestino, setRotuloDestino] = useState('');
  const [pesoAresta, setPesoAresta] = useState(1);
  const [verticeOrigem, setVerticeOrigem] = useState('');
  const [activeButton, setActiveButton] = useState('setup');
  const [selectedCardapio, setSelectedCardapio] = useState('');

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
    if (vertice && selectedCardapio) {
      onArvoreMinima(vertice.id, selectedCardapio);
    } else {
      alert("O Vértice ou o cardapio não foram selecionado.");
    }
  };

  const handleCardapioChange = (e) => {
    setSelectedCardapio(e.target.value);
    setCardapio(e.target.value);
  };

  return (
    <div className="controlPanel">
      <div className="controlTop">
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
            Busca
          </button>
          <button
            className={`controlButton ${activeButton === 'create' ? 'active' : ''}`}
            onClick={() => setActiveButton('create')}
          >
            Criar
          </button>
        </div>
      </div>
      <div className="controlMain">
        {activeButton === 'setup' ? (
          <div className="setupContainer">
            <div className="setupMain">
              <div className="selectOptions">
                <p className='textControl'>Escolha o seu cardapio</p>
                <select className='selectControl'
                  value={selectedCardapio}
                  onChange={handleCardapioChange}
                >
                  <option value="" ></option>
                  <option value="cafe">Café</option>
                  <option value="pipoca">Pipoca</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="refrigerante">Refrigerante</option>

                </select>
                <p className='textControl'>Aonde você está?</p>
                <select className='selectControl'
                  value={verticeOrigem}
                  onChange={(e) => setVerticeOrigem(e.target.value)}
                >
                  <option value="" disabled></option>
                  {vertices.map((vertice) => (
                    <option
                      key={vertice.id}
                      value={vertice.rotulo}
                      style={{ color: vertice.carrinho ? 'white' : 'blue' }}
                    >
                      {vertice.rotulo}
                    </option>
                  ))}
                </select>
                <div className="descricao">
                  <p>Acesse a aba de criar para adicionar novos vértices e arestas. Em seguida, clique em Iniciar Busca para encontrar o caminho mais curto até o seu destino.</p>
                </div>
                <button className='buttonControlSearch' onClick={handleSearchArvoreMinima}>Iniciar Busca</button>
              </div>
              <div className="logs">
                <p className='logsTitle'>Logs</p>
                <div className="logsContainer"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="createContainer">
            <div className="createMain">
              <p style={{ color: 'white' }}>Vertice</p>
              <input className='inputControl'
                type="text"
                value={newVerticerotulo}
                onChange={(e) => setnewVerticerotulo(e.target.value)}
                placeholder="Rótulo do Vértice"
              />
              <button className='buttonControl' onClick={handleAddVertice}>Adicionar Vértice</button>
              <p style={{ color: 'white' }}>Aresta</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlesPanel;
