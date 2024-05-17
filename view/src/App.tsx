import { useState, useEffect } from 'react';
import './App.css';
import GraphFlow from './components/GraphFlow';
import verticeService from './services/verticeService';
import arestaService from './services/arestaService';

function App() {
  const [vertices, setVertices] = useState([]);
  const [arestas, setArestas] = useState([]);
  const [verticePos, setVerticePos] = useState({});

  const [newVerticerotulo, setnewVerticerotulo] = useState('');
  const [rotuloOrigem, setRotuloOrigem] = useState('');
  const [rotuloDestino, setRotuloDestino] = useState('');
  const [pesoAresta, setPesoAresta] = useState(1);


  const pegarDados = async () => {
    try {
      const dadosVertices = await verticeService.getAllVertices();
      const dadosArestas = await arestaService.getAllArestas();
      setArestas(dadosArestas);
      setVertices(dadosVertices);
      console.log("Dados pegos com sucesso");
      console.log(dadosVertices);
      console.log(dadosArestas);
    } catch (error) {
      console.error("Erro ao pegar dados", error);
    }
  };

  useEffect(() => {
    pegarDados();
  },[]);


  const handleAddVertice = async () => {
    try {
      const novoVertice = await verticeService.createVertice(newVerticerotulo);
      setVertices([...vertices, novoVertice]);
      setVerticePos({
        ...verticePos,
        [novoVertice.id]: { x: 0, y: 0 }
      });
      setnewVerticerotulo('');
    } catch (error) {
      console.error("Erro ao criar novo vertice:", error);
    }
  };

  const handleAddAresta = async () => {
    try {
      const novaAresta = await arestaService.addArestaByRotulos(rotuloOrigem, rotuloDestino, pesoAresta);
      console.log(novaAresta)
      pegarDados();
      setRotuloOrigem('');
      setRotuloDestino('');
      setPesoAresta(1);

    } catch (error) {
      console.error("Erro ao adicionar aresta:", error);
    }
  };

  return (
    <div className="containerGeral">
      <div className="leftContainer">
          <input
            type="text"
            value={newVerticerotulo}
            onChange={(e) => setnewVerticerotulo(e.target.value)}
            placeholder="Rotulo Vertice"
          />
          <button onClick={handleAddVertice}>Add Vertex</button>
        <input
            type="text"
            value={rotuloOrigem}
            onChange={(e) => setRotuloOrigem(e.target.value)}
            placeholder="Rotulo Origem"
          />
          <input
            type="text"
            value={rotuloDestino}
            onChange={(e) => setRotuloDestino(e.target.value)}
            placeholder="Rotulo Destino"
          />
          <input
            type="number"
            value={pesoAresta}
            onChange={(e) => setPesoAresta(Number(e.target.value))}
            placeholder="Peso"
          />
          <button onClick={handleAddAresta}>Add Edge</button>

      </div>
      <div className="mainGraph">
        <GraphFlow vertices={vertices} arestas={arestas} verticePos={verticePos} />
      </div>
    </div>
  );
}

export default App;
