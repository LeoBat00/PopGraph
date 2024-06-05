import api from './api';
import verticeService from './verticeService';

export interface Aresta {
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

    if(peso<0) throw new Error('Peso não pode ser negativo');

    const arestas = await this.getAllArestas();
    console.log("ARESTAS", arestas)
  
    const arestaExistente = arestas.find(a => a.origem.rotulo === verticeOrigem.rotulo && a.destino.rotulo === verticeDestino.rotulo);
    console.log("ARESTA::", arestaExistente)

    if (arestaExistente) {
      throw new Error('Aresta já existe');
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
