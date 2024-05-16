import axios from 'axios';
import api from './api';

interface Vertice {
  id: number;
  label: string;
}

export class VerticeService {
  async createVertice(rotulo: string): Promise<Vertice> {
    const response = await axios.post<Vertice>('/vertice', { rotulo });
    return response.data;
  }

  async getAllVertices(): Promise<Vertice[]> {
    const response = await api.get<Vertice[]>('/vertice');
    return response.data;
  }

  async updateVertex(id: number, label: string): Promise<void> {
    await axios.patch(`/vertice/${id}`, { label });
  }

  async deleteVertex(id: number): Promise<void> {
    await axios.delete(`/vertice/${id}`);
  }
}

export default new VerticeService();
