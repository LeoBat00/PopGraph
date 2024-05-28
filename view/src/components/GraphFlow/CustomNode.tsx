import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import './styles.css';

export default function CustomNode(nodeInfo: NodeProps) {
  const handleClick = () => {
    nodeInfo.data.onClick(nodeInfo.data);
  };

  return (
    <div className="customNode"  onClick={handleClick}>
      <div className="containerName">
        <p className='nodeName'>{nodeInfo.data.label}</p>
      </div>
      <div className="node" style={{border: nodeInfo.selected ? '5px solid #40fc75' : '1px solid #fff'  }}>
        <Handle
          position={Position.Top}
          type="source"
          style={{
            background: "transparent",
            top: "50%",
            right: "50%",
            transform: "translate(50%,-50%)"
          }}
        />
        <Handle
          position={Position.Top}
          type="target"
          style={{
            background: "transparent",
            top: "50%",
            right: "50%",
            transform: "translate(50%,-50%)"
          }}
        />      
      </div>
    </div>
  );
}
