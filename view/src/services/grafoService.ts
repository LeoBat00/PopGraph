import api from './api';
import { Vertice } from './verticeService'; 
import { Aresta } from './arestaService'; 

interface Grafo {
    vertices: Array<Vertice>;
    arestas: Array<Aresta>;
}

class GrafoService {
    async deleteGrafo(): Promise<void> {
        return api.delete<void>('/grafo');
    }

    async buscarArovreMinima(id:number):  Promise<Grafo> {
        const response = await api.get(`/grafo/${id}`);
        return response.data;
      }

    
}

export default new GrafoService();
