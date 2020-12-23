import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  constructor(private webReqService: WebRequestService) { }
  addCommande(command: any) {
    return this.webReqService.post(`command`,command);
  }
  listForCommand(page?: number, limit?: number){
    return this.webReqService.get(`command/add?page=${page}&limit=${limit}`);
  }
  list(page?: number, limit?: number){
    return this.webReqService.get(`command/list`);
  }
  commandeByFacture(num_facture){
    return this.webReqService.get(`command/byfacture?num_facture=${num_facture}`);
  }
  commandeDeleteByFacture(num_facture){
    return this.webReqService.delete(`command/delete/byfacture?num_facture=${num_facture}`);
  }
  commandeDeleteByIdCommande(commande_id){
    return this.webReqService.delete(`command/delete/command?id=${commande_id}`);
  }

}
