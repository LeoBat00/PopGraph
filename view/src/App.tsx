import React, { useState, useEffect } from 'react';
import './App.css';
import ControlesPanel from './components/ControlesPanel';
import LogPanel from './components/LogPanel';
import verticeService from './services/verticeService';
import arestaService from './services/arestaService';
import grafoService from './services/grafoService';
import GraphFlow from './components/GraphFlow';
import { ReactFlowProvider } from 'reactflow';

function App() {
  const [vertices, setVertices] = useState([]);
  const [arestas, setArestas] = useState([]);
  const [verticePos, setVerticePos] = useState({});
  const [caminhoMinimo, setCaminhoMinimo] = useState([]);
  const [verticeOrigem, setVerticeOrigem] = useState(null);
  const [verticeMenorCaminho, setVerticeMenorCaminho] = useState(null);

  const pegarDados = async () => {
    try {
      const dadosVertices = await verticeService.getAllVertices();
      const dadosArestas = await arestaService.getAllArestas();
      setArestas(dadosArestas);
      setVertices(dadosVertices);
      console.log("Dados pegos com sucesso");
      console.log(dadosVertices);
      console.log(dadosArestas)
    } catch (error) {
      console.error("Erro ao pegar dados", error);
    }
  };

  useEffect(() => {
    pegarDados();
  }, []);

  const handleSearchArvoreMinima = async (id, itemCardapio) => {
    try {
      const grafoCaminhoMinimo = await grafoService.buscarArovreMinima(id);
      console.log("Árvore mínima encontrada com sucesso");
      console.log(grafoCaminhoMinimo);

      const verticesFiltrados = grafoCaminhoMinimo.distancias.filter(verticeDist => verticeDist.vertice.carrinho !== null);

      const verticeMenorDistancia = verticesFiltrados.reduce((minVertice, atualVertice) => {
        if ((minVertice === null || atualVertice.distancia < minVertice.distancia) && atualVertice.vertice.carrinho[itemCardapio]) {
          return atualVertice;
        }
        return minVertice;
      }, null);

      console.log("Vértice com a menor distância:", verticeMenorDistancia);



      if (verticeMenorDistancia) {
        const predecessor = grafoCaminhoMinimo.predecessores.find(predecessor => predecessor.vertice.id === verticeMenorDistancia.vertice.id);

        let caminhoArestas = predecessor.caminho;

        console.log("Caminho das arestas:", caminhoArestas);

        caminhoArestas = caminhoArestas.flatMap(aresta => {
          const novoCaminho = [aresta];
          if (aresta % 2 === 0) {
              const novaAresta = aresta - 1 
              novoCaminho.push(novaAresta);
          } else {
              const novaAresta = aresta + 1 
              novoCaminho.push(novaAresta)
          }
          return novoCaminho;
        });

        console.log("Novo caminho das arestas:", caminhoArestas);        
        console.log("Caminho das arestas:", caminhoArestas);

        setCaminhoMinimo(caminhoArestas);
        setVerticeOrigem(id); 
        setVerticeMenorCaminho(verticeMenorDistancia.vertice.id); 
      } else {
        console.warn("Não foi possível encontrar um vértice com distância maior que zero.");
        setCaminhoMinimo([]);
        setVerticeMenorCaminho(null);
        setVerticeOrigem(null);
      }
    } catch (error) {
      console.error("Erro ao buscar árvore mínima:", error);
    }
  };

  const handleDeleteGrafo = async () => {
    try {
      await grafoService.deleteGrafo();
      setVertices([]);
      setArestas([]);
      setVerticePos({});
      setCaminhoMinimo([]);
      console.log("Grafo deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar grafo:", error);
    }
  };

  const handleAddVertice = async (rotulo) => {
    try {
      const novoVertice = await verticeService.createVertice(rotulo);
      setVertices([...vertices, novoVertice]);
      setVerticePos({
        ...verticePos,
        [novoVertice.id]: { x: 1 * 45, y: 1 * 45 }
      });
    } catch (error) {
      console.error("Erro ao criar novo vértice:", error);
      alert("Já existe um vertice com esse nome!");
    }
  };

  const handleAddAresta = async (origem, destino, peso) => {
    try {
      await arestaService.addArestaByRotulos(origem, destino, peso);
      pegarDados();
    } catch (error) {
      console.error("Erro ao adicionar aresta:", error);
      alert(error);
    }
  };

  const handleUpdateVertice = (updatedVertice) => {
    setVertices((prevVertices) =>
      prevVertices.map((vertice) =>
        vertice.id === updatedVertice.id ? updatedVertice : vertice
      )
    );
  };

  return (
    <div className="appContainer">
      <div className="mainContent">
        <div className="controlesPanelContent">
          <ControlesPanel
            onArvoreMinima={handleSearchArvoreMinima}
            onAddVertice={handleAddVertice}
            onAddAresta={handleAddAresta}
            onDeleteGrafo={handleDeleteGrafo}
            vertices={vertices}
          />
        </div>
        <div className="graphFlowContent">
          <ReactFlowProvider>
            <GraphFlow 
              vertices={vertices} 
              arestas={arestas} 
              verticePos={verticePos} 
              caminhoMinimo={caminhoMinimo}  
              onUpdateVertice={handleUpdateVertice}
              verticeOrigem={verticeOrigem}
              verticeMenorCaminho={verticeMenorCaminho}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
