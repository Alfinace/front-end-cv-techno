import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private webReqService: WebRequestService) { }

  updateProduit(id: number, produit: Produit){
    return this.webReqService.put(`produit/${id}/edit`, produit);
  }

  addProduit(produit: Produit) {
    return this.webReqService.post(`produit`,produit);
  }
  deleteOneProduit(id: number){
    return  this.webReqService.delete(`produit/${id}`);
  }

  getOneProduit(id: number){
  return  this.webReqService.get(`produit/${id}`);
  }
  getAllProduit(page?: number, limit?: number){
    return this.webReqService.get(`produit/list?page=${page}&limit=${limit}`);
  }
  searchProduit(keyWord: any){
    return this.webReqService.get(`produit/search?key_word=${keyWord}`);
  }
}
