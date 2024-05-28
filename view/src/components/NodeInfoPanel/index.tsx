import React from 'react';
import './styles.css';

const NodeInfoPanel = ({ nodeData, onClose }) => {
  if (!nodeData) {
    return null;
  }

  return (
    <div className="nodeInfoPanel">
      <button onClick={onClose} className="closeButton">X</button>
      <h2>Vértice {nodeData.label}</h2>
      <p>ID: {nodeData.id}</p>
      <p>Possui Carrinho: {nodeData.temCarrinho ? 'Sim' : 'Não'}</p>
      <p>Pessoas na Fila: {nodeData.filaPessoas}</p>
    </div>
  );
};

export default NodeInfoPanel;
