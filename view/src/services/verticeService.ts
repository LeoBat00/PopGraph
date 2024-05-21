import axios from 'axios';
import api from './api';

export interface Vertice {
  id: number;
  rotulo: string;
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

  async updateVertex(id: number, rotulo: string): Promise<void> {
    await axios.patch(`/vertice/${id}`, { rotulo });
  }

  async deleteVertex(id: number): Promise<void> {
    await axios.delete(`/vertice/${id}`);
  }
}

export default new VerticeService();
