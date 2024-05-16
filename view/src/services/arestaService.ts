import axios from 'axios';
import api from './api';

interface Aresta {
  id: number;
  vertice_origem_id: number;
  vertice_destino_id: number;
  peso: number;
}

export class ArestaService {
  async getAllArestas(): Promise<Aresta[]> {
    const response = await api.get<Aresta[]>('/aresta');
    return response.data;
  }

}
export default new ArestaService();
