import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {
  produits: Produit[];
  produit: any;
  limit:number;
  pages: number[];
  currentPage: number;
  btnPrev: boolean;
  btnNext = true;
  // for display when we want to edit one Item
  makeEdit= false;
  constructor(private produitService: ProduitService,
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

  getNextListProduit(){
    const page = this.currentPage + 1;
    if (page <= this.pages.length) {
      this.getList(page);
    }
  }
  getPrevListProduit(){
    this.getList(this.currentPage - 1 );
  }
   getListProduit(page: number){
    this.getList(page);
  }
  getLastList(value: Produit){
    console.log(value);
    this.getList(this.pages.length)
  }

  getList(page?: number): void {
    this.produitService.getAllProduit(page,this.limit).subscribe(
      (observe: any) => {
        const data = observe.data.rows;
        this.produits = data;
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
    this.makeEdit = true;
    this.produitService.getOneProduit(id).subscribe(
      (result: any)=>{
        this.produit = result.data;
        
      }
    )
  }
  deleteItem(id: number): void {
    this.produitService.deleteOneProduit(id).subscribe(
      (res) => {
        this.getList(this.currentPage);
      },
      // tslint:disable-next-line: no-shadowed-variable
      (error: any) => {
        console.log(error);

      }
    );
  }
  disableEdit(value: Produit){
    // to refresh current page 
    this.getList(this.currentPage);
    this.makeEdit = false
    console.log('ok lets eee');
    
  }
}
