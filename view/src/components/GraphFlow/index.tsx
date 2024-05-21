import React, { useEffect } from 'react';
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import {CustomEdge} from './CustomEdge';

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const GraphFlow = ({ vertices, arestas, verticePos }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const newNodes = vertices.map(vertice => ({
      id: String(vertice.id),
      data: { label: vertice.rotulo },
      position: verticePos[vertice.id] || { x: 1*45, y: 1*45 },
      type: 'customNode'
    }));

    const newEdges = arestas.map(aresta => {
      const origemId = aresta.origem?.id;
      const destinoId = aresta.destino?.id;

      return {
        id: String(aresta.id),
        type: 'customEdge',
        source: String(origemId),
        target: String(destinoId),
        label: String(aresta.peso),
        style: { stroke : 'white', strokeWidth: 1}

      };
    })

    setNodes(newNodes);
    setEdges(newEdges);
  }, [vertices, arestas, verticePos]);



  //teste
  const width = 1170;
  const height = 855;

  return (
  <div className='containerGraph' style={{width: `${width}px`,height: `${height}px`,}}>
    <ReactFlow
        translateExtent={[[0, 0], [width, height]]}
        nodeExtent={[[0, 0], [width, height]]}
        panOnDrag={false}
        zoomOnScroll={false}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        panOnScroll={false}
        zoomOnPinch={false}
      >
        <Background
            variant={BackgroundVariant.Dots}
            color="#100f1f"
            gap={45}
            style={{
            backgroundImage: 'url(/mapaUniforGrid2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            }}
        />      
      </ReactFlow>
    </div>
  );
};

export default GraphFlow;
