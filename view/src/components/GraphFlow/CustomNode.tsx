import React, { useState } from 'react';
import { Background, Handle, NodeProps, Position } from 'reactflow';
import './styles.css';

export default function CustomNode({ data: { label } }: NodeProps<{ label: string }>) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className={`customNode ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="node" style={{ backgroundColor: isSelected ? 'white' : 'black' }}>
        {label}
        <Handle type='target' position={Position.Bottom} style={{ background: '#555' }}></Handle>
        <Handle type='source' position={Position.Bottom} style={{ background: '#555' }}></Handle>

        <Handle type='target' position={Position.Top} style={{ background: '#555' }}></Handle>
        <Handle type='source' position={Position.Top} style={{ background: '#555' }}></Handle>

        <Handle type='target' position={Position.Left} style={{ background: '#555' }}></Handle>
        <Handle type='source' position={Position.Left} style={{ background: '#555' }}></Handle>

        <Handle type='target' position={Position.Right} style={{ background: '#555' }}></Handle>
        <Handle type='source' position={Position.Right} style={{ background: '#555' }}></Handle>
      </div>
    </div>
  );
}
