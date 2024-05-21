import { useState, useEffect } from 'react';
import './App.css';
import GraphFlow from './components/GraphFlow';
import verticeService from './services/verticeService';
import arestaService from './services/arestaService';
import grafoService from './services/grafoService'; 

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

  const handleDeleteGrafo = async () => {
    try {
      await grafoService.deleteGrafo();
      setVertices([]); 
      setArestas([]);  
      setVerticePos({}); 
      console.log("Grafo deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar grafo:", error);
    }
  };

  const handleAddVertice = async () => {
    try {
      if (!newVerticerotulo.trim()) {
        alert("O rotulo do vertice não pode ser vazio");
        return;
      }
      
      const novoVertice = await verticeService.createVertice(newVerticerotulo);
      setVertices([...vertices, novoVertice]);
      setVerticePos({
        ...verticePos,
        [novoVertice.id]: { x: 1*45, y: 1*45 }
      });
      setnewVerticerotulo('');
    } catch (error) {
      console.error("Erro ao criar novo vértice:", error);
    }
  };

  const handleAddAresta = async () => {
    try {
      if (!rotuloOrigem.trim() || !rotuloDestino.trim()) {
        alert("Preencha os rótulos de origem e destino.");
        return;
      }
      
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
            placeholder="Rótulo do Vértice"
          />
          <button onClick={handleAddVertice}>Adicionar Vértice</button>
        <input
            type="text"
            value={rotuloOrigem}
            onChange={(e) => setRotuloOrigem(e.target.value)}
            placeholder="Rótulo de Origem"
          />
          <input
            type="text"
            value={rotuloDestino}
            onChange={(e) => setRotuloDestino(e.target.value)}
            placeholder="Rótulo de Destino"
          />
          <input
            type="number"
            value={pesoAresta}
            onChange={(e) => setPesoAresta(Number(e.target.value))}
            placeholder="Peso"
          />
          <button onClick={handleAddAresta}>Adicionar Aresta</button>
          <button onClick={handleDeleteGrafo}>Deletar Grafo</button>
      </div>
      <div className="mainGraph">
        <GraphFlow vertices={vertices} arestas={arestas} verticePos={verticePos} />
      </div>
    </div>
  );
}

export default App;
