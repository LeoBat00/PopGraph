import React, { useEffect } from 'react';
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  'customNode': CustomNode,
}

const snapGrid = [45, 45];

const GraphFlow = ({ vertices, arestas, verticePos }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const newNodes = vertices.map(vertex => ({
      id: String(vertex.id),
      data: { label: vertex.rotulo },
      position: verticePos[vertex.id] || { x: 0, y: 0 },
      type: 'customNode'
    }));

    const newEdges = arestas.map(aresta => {
      const sourceId = aresta.idVerticeOrigem ? String(aresta.idVerticeOrigem) : '';
      const targetId = aresta.idVerticeDestino ? String(aresta.idVerticeDestino) : '';
      const label = aresta.peso ? String(aresta.peso) : '';

      return {
        id: String(aresta.id),
        source: sourceId,
        target: targetId,
        label: label,
      };
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [vertices, arestas, verticePos]);

    return (
      <div className='containerGraph'>
        <ReactFlow
          translateExtent={[[0, 0], [1170, 855]]}
          nodeExtent={[[0, 0], [1170, 855]]}
          panOnDrag={false}
          zoomOnScroll={false}
          snapGrid={snapGrid}
          snapToGrid={true}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
        >
          <Background variant={BackgroundVariant.Lines} color="cyan" gap={45} />
        </ReactFlow>
        <img className='uniforMap' src="/mapaUniforGrid.png" />
      </div>
    );
  }

export default GraphFlow;
