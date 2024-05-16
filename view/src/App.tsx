import { useState, useEffect } from 'react';
import './App.css';
import GraphFlow from './components/GraphFlow';
import verticeService from './services/verticeService';
import arestaService from './services/arestaService';

function App() {
  const [vertices, setVertices] = useState([]);
  const [arestas, setArestas] = useState([]);
  const [newVerticerotulo, setnewVerticerotulo] = useState('');
  const [verticePos, setVerticePos] = useState({});

  useEffect(() => {
    const pegarDados = async () => {
      try {
        const dadosVertices = await verticeService.getAllVertices();
        const dadosArestas = await arestaService.getAllArestas();
        setArestas(dadosArestas);
        setVertices(dadosVertices);
      } catch (error) {
        console.error("Erro ao pegar dados", error);
      }
    };
    pegarDados();
  }, []);
  console.log(arestas)
  console.log(vertices)

  const handleAddVertice = async () => {
    try {
      const novoVertice = await verticeService.createVertice(newVerticerotulo);
      setVertices([...vertices, novoVertice]);
      
      setVerticePos({
        ...verticePos, [novoVertice.id]: { x: 0, y: 0 }
      });
      setnewVerticerotulo('');
    } catch (error) {
      console.error("Erro ao criar novo vertice:", error);
    }
  };

  const handleSetup = async () => {
    try {
      const verticesSetup = [
        { rotulo: 'A', position: { x: 6*45, y: 15*45 } },
        { rotulo: 'B', position: { x: 2*45, y: 16*45 } },
        { rotulo: 'C', position: { x: 4*45, y: 12*45 } },
        { rotulo: 'D', position: { x: 11*45, y: 10*45 } },
        { rotulo: 'E', position: { x: 12*45, y: 12*45 } },
      ];

      const arestasSetup = [
        { idVerticeOrigem: 'A', idVerticeDestino: 'B', peso: 1 },
        { idVerticeOrigem: 'A', idVerticeDestino: 'E', peso: 1 },
        { idVerticeOrigem: 'B', idVerticeDestino: 'C', peso: 1 },
        { idVerticeOrigem: 'D', idVerticeDestino: 'E', peso: 1 },
      ]
  
      const newVertices = [];
      const newPositions = [];
      
      for (const verticeData of verticesSetup) {
        const novoVertice = await verticeService.createVertice(verticeData.rotulo);
        newVertices.push(novoVertice);
        newPositions[novoVertice.id] = verticeData.position;
      }
      setVertices([...vertices, ...newVertices]);
      setVerticePos({ ...verticePos, ...newPositions });
      
      const verticeA = newVertices.find(vertice => vertice.rotulo === 'A');
      const verticeB = newVertices.find(vertice => vertice.rotulo === 'B');
      
      if (verticeA && verticeB) {
        const arestaBody = {
          idVerticeOrigem: verticeA.id,
          idVerticeDestino: verticeB.id,
          peso: 1
        };
        await arestaService.addAresta(arestaBody);
        console.log("Aresta adicionada.");
        
        const novaAresta = { ...arestaBody, id: arestas.length + 1 }; 
        setArestas([...arestas, novaAresta]);
      } else {
        console.error("Vértices A ou B não foram encontrados.");
      }
    } catch (error) {
      console.error("Erro no setup:", error);
    }
  };
  
  return (
    <div className="containerGeral">
      <div className="add-controls">
        <div>
          <input
            type="text"
            value={newVerticerotulo}
            onChange={(e) => setnewVerticerotulo(e.target.value)}
            placeholder="Rotulo Vertice"
          />
          <button onClick={handleAddVertice}>Add Vertex</button>
        </div>
        <div>
        </div>
        <div>
          <button onClick={handleSetup}>Setup</button>
        </div>
      </div>
      <GraphFlow vertices={vertices} arestas={arestas} verticePos={verticePos} />
    </div>
  );
}

export default App;
