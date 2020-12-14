import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private webReqService: WebRequestService) { }

  updateClient(id: number, client: Client){
    return this.webReqService.put(`client/${id}/edit`, client);
  }

  addClient(client: Client) {
    return this.webReqService.post(`client`,client);
  }
  deleteOneClient(id: number){
    return  this.webReqService.delete(`client/${id}`);
  }

  getOneClient(id: number){
  return  this.webReqService.get(`client/${id}`);
  }
  
  getAllClient(page?: number, limit?: number){
    return this.webReqService.get(`client/list?page=${page}&limit=${limit}`);
  }
  getAll(){
    return this.webReqService.get(`client/all`);
  }
}
