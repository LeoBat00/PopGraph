import React, { useState } from 'react';
import { Background, Handle, NodeProps, Position } from 'reactflow';
import './styles.css';
import { Unstable_Popup as BasePopup} from '@mui/base/Unstable_Popup';


export default function CustomNode(nodeInfo: NodeProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);

  };

  const nodeData = {
    id: nodeInfo.id,
    label: nodeInfo.data.label,
    queue: 'null',
    sells: 'null'
  };

  return (
    <div>
      <div 
        className={`customNode ${isSelected ? 'selected' : ''}`} 
        onClick={handleClick}
        data-tip={`ID: ${nodeData.id}<br/>Label: ${nodeData.label}<br/>Queue: ${nodeData.queue}<br/>Sells: ${nodeData.sells}`}
        data-html={true}
      >
        <div className="containerName">
          <p className='nodeName'>{nodeInfo.data.label}</p>
        </div>
        <div className="node">
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
 
    </div>
  );
}
