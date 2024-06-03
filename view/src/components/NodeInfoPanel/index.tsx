import React, { useState, useEffect } from 'react';
import verticeService from '../../services/verticeService';
import './styles.css';
import carrinhoService from '../../services/carrinhoService';

const NodeInfoPanel = ({ nodeData, onClose, onUpdateVertice }) => {
  const [filaPessoas, setFilaPessoas] = useState(nodeData.filaPessoas);
  const [position, setPosition] = useState(nodeData.position);
  const [carrinho, setCarrinho] = useState(nodeData.carrinho);

  useEffect(() => {
    setFilaPessoas(nodeData.filaPessoas);
    setPosition(nodeData.position);
    setCarrinho(nodeData.carrinho);
  }, [nodeData]);

  const handleUpdateVertice = async () => {
    try {
      let updatedCarrinho = carrinho;

      console.log(carrinho)
      if (carrinho === null) {
        alert("Vai virar um totem, carrinho nulo")
      }

      const updatedVertice = {
        id: nodeData.id,
        trafegoPessoas: filaPessoas,
        rotulo: nodeData.label,
        posicaoX: position.x,
        posicaoY: position.y,
        carrinho: updatedCarrinho
      };

      if (updatedCarrinho !== null) {
        await handleUpdateCarrinho(updatedCarrinho);
      }

      await verticeService.updateVertice(updatedVertice);

      console.log('Vértice atualizado com sucesso!');
      onUpdateVertice(updatedVertice);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar vértice:', error);
    }
  };

  const handleUpdateCarrinho = async (carrinhoData) => {
    try {
      if (carrinhoData === null) {
        await carrinhoService.removeCarrinho(nodeData.carrinho.id);
      } else {
        await carrinhoService.updateCarrinho({
          ...carrinhoData,
          id: nodeData.carrinho.id
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
    }
  };

  return (
    <div className="nodeInfoPanel">
      <button onClick={onClose} className="closeButton">X</button>
      <img
        className='imgInfo'
        src={carrinho ? '/carrinhoIcon.png' : '/Totem.png'}
        alt={carrinho ? 'Carrinho Icon' : 'Totem Icon'}
      />

      <h2>Vértice {nodeData.label}</h2>
      <p>ID: {nodeData.id}</p>

      <div className="inputsContainer">
        <div className='inputContainer'>
          <label className="labelCheckbox">
            <p>É um totem?</p>
            <input
              className='inputCheckbox'
              type="checkbox"
              checked={!carrinho}
              onChange={() => setCarrinho(carrinho ? nodeData.carrinho : nodeData.carrinho)} //Voltar aqui depois que o back atualizar, pra setar como null
            />
          </label>
        </div>
        {carrinho !== null && (
          <>
            <div className='cardapioContainer'>
              <p className='cardapioTitle'>Cardápio</p>
              <p> Carrinho: {nodeData.carrinho.id} </p>
              {carrinho &&
                Object.keys(carrinho).map((item, index) => (
                  item !== "id" && 
                  <label key={index}>
                    <p className='cardapioOptionName'>{item}</p>
                    <input
                      className='inputCheckboxOptions'
                      type="checkbox"
                      checked={carrinho[item]}
                      onChange={(e) => setCarrinho({ ...carrinho, [item]: e.target.checked })}
                    />
                  </label>
                ))}
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
        <button className='buttonInput' onClick={onClose}>Descartar</button>
      </div>
    </div>
  );
};

export default NodeInfoPanel;
