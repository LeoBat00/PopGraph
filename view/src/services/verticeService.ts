import axios from 'axios';
import api from './api';

export interface Vertice {
  id: number;
  rotulo: string;
  posicaoX: number;
  posicaoY: number;
  temCarrinho: boolean;
  filaPessoas: number;
}

class VerticeService {
  async createVertice(rotulo: string): Promise<Vertice> {
    const response = await api.post<Vertice>('/vertice', { rotulo });
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
}

export default new VerticeService();
