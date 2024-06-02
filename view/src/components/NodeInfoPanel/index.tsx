import React, { useState, useEffect } from 'react';
import verticeService from '../../services/verticeService';
import './styles.css';

const NodeInfoPanel = ({ nodeData, onClose, onUpdateVertice }) => {
  const [temCarrinho, setTemCarrinho] = useState(nodeData.temCarrinho);
  const [filaPessoas, setFilaPessoas] = useState(nodeData.filaPessoas);
  const [position, setPosition] = useState(nodeData.position);
  const [cafe, setCafe] = useState(false);
  const [pipoca, setPipoca] = useState(false);

  useEffect(() => {
    setTemCarrinho(nodeData.temCarrinho);
    setFilaPessoas(nodeData.filaPessoas);
    setPosition(nodeData.position);
  }, [nodeData]);

  const handleUpdateVertice = async () => {
    try {
      const updatedVertice = {
        id: nodeData.id,
        temCarrinho,
        trafegoPessoas: filaPessoas,
        rotulo: nodeData.label,
        posicaoX: position.x,
        posicaoY: position.y,
        cafe,
        pipoca
      };
      await verticeService.updateVertice(updatedVertice);
      console.log('Vértice atualizado com sucesso!');
      onUpdateVertice(updatedVertice); 
      onClose(); 
    } catch (error) {
      console.error('Erro ao atualizar vértice:', error);
    }
  };

  return (
    <div className="nodeInfoPanel">
      <button onClick={onClose} className="closeButton">X</button>
      <img className='imgInfo' src={temCarrinho ? '/Totem.png' : '/carrinhoIcon.png'}  alt={temCarrinho ? 'Totem Icon' : 'Carrinho Icon'}></img>
      
      <h2>Vértice {nodeData.label}</h2>
      <p>ID: {nodeData.id}</p>

      <div className="inputsContainer">
        <div className='inputContainer'>
        <label className="labelCheckbox">
          <p>É um totem?</p>
            <input
              className='inputCheckbox'
              type="checkbox"
              checked={temCarrinho}
              onChange={(e) => setTemCarrinho(e.target.checked)}
            />
          </label>
        </div>
        {!temCarrinho && (
          <>
          <div className='cardapioContainer'>
            <p className='cardapioTitle'>Cardápio</p>
            <label>
              <p className='cardapioOptionName'>Café</p>
              <input className='inputCheckboxOptions' 
                type="checkbox"
                checked={cafe}
                onChange={(e) => setCafe(e.target.checked)}
              />
            </label>
            <label>
              <p className='cardapioOptionName'>Pipoca</p>
              <input className='inputCheckboxOptions'
                type="checkbox"
                checked={pipoca}
                onChange={(e) => setPipoca(e.target.checked)}
              />
            </label>
          </div>
          <div className='inputContainer'>
          <label>
            <p>Pessoas na Fila</p>
            <input
              type="number"
              value={filaPessoas}
              onChange={(e) => setFilaPessoas(parseInt(e.target.value, 10))}
            />
          </label>
        </div>
          </>
        )}
        
        <button className='buttonInput' onClick={handleUpdateVertice}>Salvar alterações</button>
        <button className='buttonInput'onClick={onClose}>Descartar</button>
      </div>
    </div>
  );
};

export default NodeInfoPanel;
