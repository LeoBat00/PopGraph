import axios from 'axios';
import api from './api';
import { Carrinho } from './carrinhoService';
import CarrinhoService from './carrinhoService';

export interface Vertice {
  id: number;
  rotulo: string;
  posicaoX: number;
  posicaoY: number;
  temCarrinho: boolean;
  filaPessoas: number;
  carrinho: Carrinho
}

class VerticeService {
  async createVertice(rotulo: string, posicaoX: number, posicaoY: number, trafegoPessoas: number, carrinho?: Carrinho): Promise<Vertice> {
    const defaultCarrinho: Carrinho = {
      pipoca: true,
      refrigerante: true,
      chocolate: true,
      cafe: true
    };
    const carrinhoToCreate = carrinho || defaultCarrinho;
    const createdCarrinho = await CarrinhoService.addCarrinho(carrinhoToCreate);
    const response = await api.post<Vertice>('/vertice', {
      rotulo,
      posicaoX,
      posicaoY,
      trafegoPessoas,
      carrinho: createdCarrinho
    });

    return response.data;
  }


  async getAllVertices(): Promise<Vertice[]> {
    const response = await api.get<Vertice[]>('/vertice');
    return response.data;
  }

  async updateVertice(vertice: Vertice): Promise<void> {
    await api.post('/vertice/update', vertice);
  }

  async deleteVertex(id: number): Promise<void> {
    await axios.delete(`/vertice/${id}`);
  }

  async retirarCarrinhoVertice(idCarrinho: number): Promise<void> {
    await api.put(`/vertice/${idCarrinho}`);
  }
}

export default new VerticeService();
