import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  @Input() clientEdit: Client;
  @Output() eventUpdateClient = new EventEmitter<any>()
  
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    console.log(form);
    
    const client = new Client(this.clientEdit.id,`${form.value.lastName} ${form.value.firstName}`,form.value.contact);
    console.log(client); 
    this.clientService.updateClient(this.clientEdit.id,client).subscribe(
      (result:any)=>{
        console.log(result);
        // this.addNewProduit(result.data)
        console.log(result.data);
        
        this.eventAfterUpdate(result.data)
      },
      (error: any)=>{
        console.log(error.message);
        
      }
    )
  }
  eventAfterUpdate(value: any ){
    this.eventUpdateClient.emit(value)
  }
}