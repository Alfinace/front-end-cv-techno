import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients: Client[];
 @Output() client: Client;
  limit:number;
  pages: number[];
  currentPage: number;
  btnPrev: boolean;
  btnNext = true;
  // for display when we want to edit one Item
  makeEdit= false;
  constructor(private clientService: ClientService,
              private userService: UserService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.limit =4;
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // tslint:disable-next-line: radix
        // tslint:disable-next-line: use-isnan
        // tslint:disable-next-line: radix
        this.currentPage =  1;

      },
      // tslint:disable-next-line: no-shadowed-variable
      (error) => console.log(error)
    );
    this.getList(this.currentPage);
  }

  getNextListClient(){
    const page = this.currentPage + 1;
    if (page <= this.pages.length) {
      this.getList(page);
    }
  }
  getPrevListClient(){
    this.getList(this.currentPage - 1 );
  }
   getListClient(page: number){
    this.getList(page);
  }
  getLastList(value: Client){
    console.log(value);
    this.getList(this.pages.length)
  }

  getList(page?: number): void {
  
    
    this.clientService.getAllClient(page,this.limit).subscribe(
      (observe: any) => {
        const data = observe.data.rows;

        this.clients = data;
        // tslint:disable-next-line: radix
        let pages = parseInt(observe.data.count) / this.limit;
        // tslint:disable-next-line: radix
        const remain = parseInt(observe.data.count) % this.limit;
        if (remain !== 0) {
          pages = pages + 1;
        }
        const element = [];
        for (let index = 1; index <= pages ; index++) {
          element.push(index);
        }
        this.pages = element;
        this.currentPage = page;
        console.log(page < this.pages.length);

        if (page < this.pages.length) {
          this.btnNext = true;
        }else{
          this.btnNext = false;
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401 ){
          this.userService.logout();
        }
      }
    );
  }

  viewItem(id: number): void {
alert(id);
  }
  editItem(id: number): void {
    this.clientService.getOneClient(id).subscribe(
      (result: any)=>{
        console.log(result.data.id);
        this.client = result.data;
        console.log(this.client);
        this.makeEdit = true;
      }
    )
  }
  deleteItem(id: number): void {
    this.clientService.deleteOneClient(id).subscribe(
      (res) => {
        this.getList(this.currentPage);
      },
      // tslint:disable-next-line: no-shadowed-variable
      (error: any) => {
        console.log(error);

      }
    );
  }
  disableEdit(value: Client){
    // to refresh current page 
    this.getList(this.currentPage);
    this.makeEdit = false
    console.log('ok lets eee');
    
  }
}
