import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client
  constructor(private clientService: ClientService) { }
  @Output() newItemClient = new EventEmitter<any>()
  ngOnInit(): void {
  }
  addNewClient(value : any){
    this.newItemClient.emit(value)
  }
  onSubmit(formulaire: NgForm){
    console.log(formulaire.value);
    const client = new Client(null,`${formulaire.value.lastName} ${formulaire.value.firstName}`,formulaire.value.contact);
    this.clientService.addClient(client).subscribe(
      (result:any)=>{
        this.addNewClient(result.data)
      },
      (error: any)=>{
        console.log(error);
        
      }
    )
  }

}
