import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState, addEdge, useReactFlow, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { CustomEdge } from './CustomEdge';
import NodeInfoPanel from '../NodeInfoPanel';
import VerticeService from '../../services/verticeService';

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const GraphFlow = ({ vertices, arestas, verticePos, caminhoMinimo, onUpdateVertice, verticeOrigem, verticeMenorCaminho }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (event, node) => {
    if (node) {
      setSelectedNode({
        ...node,
        position: node.position 
      });
    } else {
      console.warn('Erro, "undefined"', node);
    }
  };

  const handleNodeDragStop = async (event, node) => {
    if (node) {
      const vertice = {
        id: node.id,
        rotulo: node.data.label,
        posicaoX: node.position.x,
        posicaoY: node.position.y,
        temCarrinho: node.data.temCarrinho,
        filaPessoas: node.data.filaPessoas,
        carrinho: node.data.carrinho
      };
      await VerticeService.updateVertice(vertice);
    }
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    const fetchVertices = async () => {
      const fetchedVertices = await VerticeService.getAllVertices();
      const newNodes = fetchedVertices.map(vertice => ({
        dragHandle: false,
        id: String(vertice.id),
        data: {
          id: vertice.id,
          label: vertice.rotulo,
          temCarrinho: vertice.temCarrinho,
          filaPessoas: vertice.trafegoPessoas,
          carrinho: vertice.carrinho,
          verticeOrigemID: verticeOrigem,
          verticeMenorCaminhoID: verticeMenorCaminho,
          onClick: handleNodeClick
        },
        position: { x: vertice.posicaoX, y: vertice.posicaoY },
        type: 'customNode'
      }));

      const newEdges = arestas
        .filter(aresta => aresta.id % 2 !== 0)
        .map(aresta => {
          const origemId = aresta.origem?.id;
          const destinoId = aresta.destino?.id;
          const isHighlighted = caminhoMinimo.includes(aresta.id);

          return {
            id: String(aresta.id),
            type: 'customEdge',
            source: String(origemId),
            target: String(destinoId),
            label: String(aresta.peso),
            style: { 
              stroke: isHighlighted ? '#A763FF' : 'black', 
              strokeWidth: isHighlighted ? 5 : 2 ,
              transition: 'stroke 0.5s'
            }
          };
        });

      setNodes(newNodes);
      setEdges(newEdges);
    };

    fetchVertices();
  }, [vertices, arestas, verticePos, caminhoMinimo, verticeOrigem, verticeMenorCaminho]);

  return (
    <div className='containerGraph' style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        panOnDrag={false}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onNodeDragStop={handleNodeDragStop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#100f1f"
          gap={45}
          style={{ backgroundColor: '#ffff', zIndex: -1, borderRadius: '10px' }}
        />
        <img
          src="/mapaUniforGrid2.png"
          alt="Mapa Unifor"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />
        
      </ReactFlow>
      {selectedNode && (
        <NodeInfoPanel
          nodeData={{
            id: selectedNode.data.id,
            label: selectedNode.data.label,
            temCarrinho: selectedNode.data.temCarrinho,
            filaPessoas: selectedNode.data.filaPessoas,
            carrinho: selectedNode.data.carrinho,
            position: selectedNode.position
          }}
          onUpdateVertice={onUpdateVertice}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
};

export default GraphFlow;
