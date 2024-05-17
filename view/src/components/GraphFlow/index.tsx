import React, { useEffect } from 'react';
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  customNode: CustomNode,
};

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
      const origemId = aresta.origem?.id;
      const destinoId = aresta.destino?.id;

      return {
        id: String(aresta.id),
        source: String(origemId),
        target: String(destinoId),
        label: String(aresta.peso),
        style: { stroke : 'white', strokeWidth: 1}

      };
    }).filter(edge => edge !== null);

    setNodes(newNodes);
    setEdges(newEdges);
  }, [vertices, arestas, verticePos]);



  //teste
  var width = 1170;
  var height = 855;

  return (
  <div className='containerGraph' style={{ width: `${width}px`, height: `${height}px` }}>
    <ReactFlow
        translateExtent={[[0, 0], [width, height]]}
        nodeExtent={[[0, 0], [width, height]]}
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
        <img className='uniforMap' src="/mapaUniforGrid.png" alt="Mapa Unifor Grid" />
        <Background variant={BackgroundVariant.Lines} color="cyan" gap={45} />
      </ReactFlow>
    </div>
  );
};

export default GraphFlow;
