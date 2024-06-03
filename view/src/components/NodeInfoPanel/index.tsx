import React, { useState, useEffect } from 'react';
import verticeService from '../../services/verticeService';
import './styles.css';

const NodeInfoPanel = ({ nodeData, onClose, onUpdateVertice }) => {
  const [temCarrinho, setTemCarrinho] = useState(nodeData.temCarrinho);
  const [filaPessoas, setFilaPessoas] = useState(nodeData.filaPessoas);
  const [position, setPosition] = useState(nodeData.position);

  const [carrinho, setCarrinho] = useState(nodeData.carrinho);
  console.log(nodeData);

  useEffect(() => {
    setTemCarrinho(nodeData.temCarrinho);
    setFilaPessoas(nodeData.filaPessoas);
    setPosition(nodeData.position);
    setCarrinho(nodeData.carrinho);

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
        carrinho: carrinho
      };
      await verticeService.updateVertice(updatedVertice);
      console.log('Vértice atualizado com sucesso!');
      onUpdateVertice(updatedVertice); 
      onClose(); 
    } catch (error) {
      console.error('Erro ao atualizar vértice:', error);
    }
  };

  const handleUpdateCarrinho = async () =>{
      
  }

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
                checked={carrinho.cafe}
                onChange={(e) => setCafe(e.target.checked)}
              />
            </label>
            <label>
              <p className='cardapioOptionName'>Pipoca</p>
              <input className='inputCheckboxOptions'
                type="checkbox"
                checked={carrinho.pipoca}
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
