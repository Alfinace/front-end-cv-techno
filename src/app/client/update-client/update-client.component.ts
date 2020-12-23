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
  @Output() eventUpdateClient = new EventEmitter<any>();

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    const client = new Client(this.clientEdit.id, form.value.lastName, form.value.firstName, form.value.contact);
    this.clientService.updateClient(this.clientEdit.id, client).subscribe(
      (result: any) => {
        this.eventAfterUpdate(result.data);
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }
  eventAfterUpdate(value: any ){
    this.eventUpdateClient.emit(value);
  }
}
