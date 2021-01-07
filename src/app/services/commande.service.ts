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
  searchByMonthOrYear(year: number, month:number, id?: number){
    return this.webReqService.get(`command/search/yearOrMonth?year=${year}&month=${month}?id=${id}`);
  }
  searchBetweenDate(start_date: Date, end_date: Date,id?: number){
    return this.webReqService.get(`command/search/betweentwodate?start_date=${start_date}&end_date=${end_date}&id=${id}`);
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
  commandeForChiffreAffaire(year?: number){
    return this.webReqService.get(`command/chiffre/affaire?year=${year}`);
  }
  commandeDeleteByIdCommande(commande_id){
    return this.webReqService.delete(`command/delete/command?id=${commande_id}`);
  }
  commandeForChart(){
    return this.webReqService.get(`command/chart`);
  }
}
