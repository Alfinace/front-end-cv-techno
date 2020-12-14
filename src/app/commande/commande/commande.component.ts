import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  taille=80;
  step: number;
  clientId: number;
  constructor() { }

  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage.getItem('client_id')));
    
    
   if (!JSON.parse(sessionStorage.getItem('client_id'))) {
     this.step=0
   }else{
     this.step = 1;
   }
  }
  nextStep(Obj :any){
    console.log(Obj);
    let clientID = Obj.clientID
    sessionStorage.setItem('client_id',clientID)
    sessionStorage.setItem('step',Obj.step)
    this.step = Obj.step
  }

}
