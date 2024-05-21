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
}

export default new GrafoService();
