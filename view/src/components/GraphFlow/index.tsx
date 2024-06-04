import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState, addEdge, useReactFlow, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { CustomEdge } from './CustomEdge';
import NodeInfoPanel from '../NodeInfoPanel';

const flowKey = 'example-flow';

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const GraphFlow = ({ vertices, arestas, verticePos, caminhoMinimo, onUpdateVertice }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (event, node) => {
    if (node && node.position) {
      setSelectedNode({
        ...node,
        position: node.position || { x: 0, y: 0 }
      });
    } else {
      console.warn('Erro, "undefined"', node);
    }
  };

  const handleNodeDragStop = (event, node) => {
    if (node && node.position) {
      const updatedNodes = nodes.map(n => {
        if (n.id === node.id) {
          return {
            ...n,
            position: node.position
          };
        }
        return n;
      });
      setNodes(updatedNodes);
  
      onSave();
    }
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  useEffect(() => {
    const flow = JSON.parse(localStorage.getItem(flowKey));

    const newNodes = vertices.map(vertice => {
      const savedNode = flow?.nodes?.find(node => node.id === String(vertice.id));
      return {
        dragHandle: false,
        id: String(vertice.id),
        data: {
          id: vertice.id,
          label: vertice.rotulo,
          temCarrinho: vertice.temCarrinho,
          filaPessoas: vertice.trafegoPessoas,
          carrinho: vertice.carrinho,
          onClick: handleNodeClick
        },
        position: savedNode ? savedNode.position : (verticePos[vertice.id] || { x: vertice.posicaoX, y: vertice.posicaoY }),
        type: 'customNode'
      };
    });

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
          strokeWidth: isHighlighted ? 5 : 2 
        }
      };
    });
  

    setNodes(newNodes);
    setEdges(newEdges);
  }, [vertices, arestas, verticePos, caminhoMinimo, setNodes, setEdges]);

  useEffect(() => {
    onRestore();
  }, [onRestore]);

  return (
    <div className='containerGraph' style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        panOnDrag={false}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        onNodeDragStop={handleNodeDragStop}
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
        <Panel position="top-right">
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
        </Panel>
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
