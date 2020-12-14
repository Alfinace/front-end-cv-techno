import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-choix-client',
  templateUrl: './choix-client.component.html',
  styleUrls: ['./choix-client.component.css']
})
export class ChoixClientComponent implements OnInit {
clients: Client[];
clientID: number
@Output() eventNextStep = new EventEmitter<any>()
  constructor(private clientService: ClientService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(
      (resulat: any)=>{
        this.clients = resulat.data.rows 
      },
      (error: HttpErrorResponse)=>{
        if (error.status == 401) {
          this.userService.logout()
        }
        if (error.status == 500) {
          // message error show
          console.log(error.message);
          
        }
      }
    )
  }

  next(){
    const Obj={step:1,clientID:this.clientID}
    this.eventNextStep.emit(Obj)
  }

}
