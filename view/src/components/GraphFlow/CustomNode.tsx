import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import './styles.css';

export default function CustomNode(nodeInfo: NodeProps) {
  const handleClick = () => {
    if (nodeInfo && nodeInfo.data && nodeInfo.data.onClick) {
      nodeInfo.data.onClick(null, {
        id: nodeInfo.id,
        data: nodeInfo.data,
        carrinho: nodeInfo.data.carrinho,
        position: nodeInfo.position || { x: 0, y: 0 },
        verticeOrigemID: nodeInfo.data.verticeOrigemID,
        verticeDestinoID: nodeInfo.data.verticeDestinoID,
      });
      console.log('Vertice Clicado:', nodeInfo.data);
    } else {
      console.warn('erro, ', nodeInfo);
    }
  };

  const backgroundImage = nodeInfo.data.carrinho === null ?  '/Totem.png' : '/carrinhoIcon.png';
  const borderStyle = nodeInfo.selected === true ? '5px solid #c6f7c6' : nodeInfo.data.id === nodeInfo.data.verticeOrigemID ? '5px solid #32CD32' : nodeInfo.data.id === nodeInfo.data.verticeMenorCaminhoID ? '5px solid #DC143C' : '1px solid #fff';  

  return (
    <div className="customNode" onClick={handleClick}>
      <div className="containerName">
        <p className='nodeName'>{nodeInfo.data.label} | <span style={{fontWeight:"200" }}>{nodeInfo.data.filaPessoas}</span></p>
      </div>


      <div
        className="node"
        style={{
          border: borderStyle,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
