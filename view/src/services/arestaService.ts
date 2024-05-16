import api from './api';

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

  async addAresta(arestaData: Aresta): Promise<void> {
    const arestaDataFormatada = {
      idVerticeOrigem: arestaData.idVerticeOrigem,
      idVerticeDestino: arestaData.idVerticeDestino,
      peso: arestaData.peso
    }
    
    await api.post('/aresta', arestaDataFormatada);
    console.log(arestaData)
  }
}

export default new ArestaService();
