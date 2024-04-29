
import React from 'react';
import ReactFlow, {Background, ControlButton, Controls, Node, Edge, useEdgesState, useNodesState, BackgroundVariant} from 'reactflow';
import 'reactflow/dist/style.css';

import { initialEdges, initialNodes } from './Graphflow.constants';
import CustomNode from './CustomNode';


const nodeTypes = {
    'customNode': CustomNode,
    }

const snapGrid = [45,45];

const GraphFlow= () => {
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className='containerGraph'>
            <ReactFlow translateExtent={[[0, 0], [1170, 855]]} nodeExtent={[[0, 0], [1170, 855]]} panOnDrag={false} zoomOnScroll={false} snapGrid={snapGrid} snapToGrid={true} nodes={nodes} edges={edges}                
            onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} >
                <Background  variant={BackgroundVariant.Lines} color="cyan" gap={45} />
            </ReactFlow>
            <img className='uniforMap' src="/mapaUniforGrid.png" />
        </div>

    )
}

export default GraphFlow;
