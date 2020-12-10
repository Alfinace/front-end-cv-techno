import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {
  produits: Produit[];
  limit: number;
  pages: number[];
  currentPage: number;
  btnPrev: boolean;
  btnNext = true;
  constructor(private produitService: ProduitService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.getList(this.currentPage);
  }

  getNextListProduit(){    
    let page = this.currentPage +1;
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
  getList(page?: number): void {
    this.produitService.getAllUser(page).subscribe(
      (observe: any) => {
        const data = observe.data.rows;
        this.produits = data;
        this.limit = data.length;
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
          this.btnNext = false
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

  }
  deleteItem(id: number): void {

  }



}
