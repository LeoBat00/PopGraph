import React from 'react';
import ReactFlow, { Background, Node, Edge } from 'reactflow';

export const initialNodes: Node[] = [{
    id: '1',
    type: 'customNode',
    position: { x: 5*45, y: 12*45 },
    data: { label: '1' },
},{  
    id: '2',
    type: 'customNode',
    position: { x: 7*45, y: 15*45 },
    data: { label: '2' },
}];   
export const initialEdges: Edge[] = [{
    id: `1-2`,
    source: `1`,
    target: `2`,
    animated: true,
}];

              
const CustomNode: React.FC<{ data: { label: string } }> = ({ data: { label } }) => {
    return (
        <div className='customNode'>
            <div className="node">
                {label}
            </div>
        </div>
    );
};

const GraphFlow: React.FC = () => {
    const nodeTypes = {
        customNode: CustomNode,
    };

    return (
        <div style={{ width: '1170px', height: '855px', backgroundColor: '#202020' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
            >
                <Background color="#aaa" gap={45} />
            </ReactFlow>
        </div>
    );
};

export default GraphFlow;
