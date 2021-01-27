import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  taille=20;
  step: number;
  clientId: number;
  constructor() { }
  @Output() even = new EventEmitter<number>();
  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage.getItem('client_id')));
   if (!JSON.parse(sessionStorage.getItem('client_id'))) {
     this.step = 0
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

  fnEventCount2(value){
    this.even.emit(value);
  }
}
