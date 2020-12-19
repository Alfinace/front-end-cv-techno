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

}
