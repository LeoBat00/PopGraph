import api from './api';

export interface Carrinho {
  id?: number;
  pipoca: boolean;
  refrigerante: boolean;
  chocolate: boolean;
  cafe: boolean;
}

class CarrinhoService {
  async getAllCarrinhos(): Promise<Carrinho[]> {
    const response = await api.get<Carrinho[]>('/carrinho');
    return response.data;
  }

  async addCarrinho(carrinhoData: Carrinho): Promise<Carrinho> {
    const response = await api.post<Carrinho>('/carrinho', carrinhoData);
    return response.data;
  }

  async getCarrinhoById(id: number): Promise<Carrinho> {
    const response = await api.get<Carrinho>(`/carrinho/${id}`);
    return response.data;
  }

  async removeCarrinho(id: number): Promise<void> {
    await api.delete(`/carrinho/${id}`);
  }

  async updateCarrinho(carrinhoData: Carrinho): Promise<void> {
    await api.post('/carrinho/update', carrinhoData);
  }
}

export default new CarrinhoService();
