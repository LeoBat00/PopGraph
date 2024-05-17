import api from './api';
import verticeService from './verticeService';

interface Aresta {
  id: number;
  idVerticeOrigem: number;
  idVerticeDestino: number;
  peso: number;
}

class ArestaService {
  async getAllArestas(): Promise<Aresta[]> {
    const response = await api.get<Aresta[]>('/aresta');
    return response.data;
  }

  async addAresta(arestaData: Aresta): Promise<Aresta> {
    const response = await api.post<Aresta>('/aresta', arestaData);
    return response.data;
  }

  async addArestaByRotulos(rotuloOrigem: string, rotuloDestino: string, peso: number): Promise<Aresta> {
    const vertices = await verticeService.getAllVertices();
    const verticeOrigem = vertices.find(v => v.rotulo === rotuloOrigem);
    const verticeDestino = vertices.find(v => v.rotulo === rotuloDestino);

    if (!verticeOrigem || !verticeDestino) {
      throw new Error('Vértice de origem ou destino não encontrado');
    }

    const novaAresta = {
      idVerticeOrigem: verticeOrigem.id,
      idVerticeDestino: verticeDestino.id,
      peso,
    };

    return this.addAresta(novaAresta);
  }
}

export default new ArestaService();
