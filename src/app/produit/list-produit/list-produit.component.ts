import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-list-produit',
    templateUrl: './list-produit.component.html',
    styleUrls: ['./list-produit.component.css'],
})
export class ListProduitComponent implements OnInit {
    msg_empty_table = "Aucun élement";
    produits: Produit[];
    keyWord = '';
    produitId: any;
    produit: any;
    limit = 10;
    pages = new Array();
    currentPage: number;
    btnPrev: boolean;
    btnNext = true;
    constructor(
        private produitService: ProduitService,
        private userService: UserService,
        private activedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.activedRoute.queryParams.subscribe(
            (params) => {
                // tslint:disable-next-line: radix
                // tslint:disable-next-line: use-isnan
                // tslint:disable-next-line: radix
                this.currentPage = 1;
            },
            // tslint:disable-next-line: no-shadowed-variable
            (error) => console.log(error)
        );
        this.getList(this.currentPage);
    }

    getNextListProduit() {
        const page = this.currentPage + 1;
        if (page <= this.pages.length) {
            this.getList(page);
        }
    }
    getPrevListProduit() {
        this.getList(this.currentPage - 1);
    }
    getListProduit(page: number) {
        this.getList(page);
    }
    getLastList(value: Produit) {
        this.getList(this.pages.length);
    }

    getList(page?: number): void {
        this.produitService.getAllProduit(page, this.limit).subscribe(
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
                for (let index = 1; index <= pages; index++) {
                    element.push(index);
                }
                this.pages = element;
                this.currentPage = page;
                if (page < this.pages.length) {
                    this.btnNext = true;
                } else {
                    this.btnNext = false;
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
            }
        );
    }

    openFormForUpdate(content){
        this.modalService.open(content);
    }
    confirmModalDeleteItem(content, id){
        this.produitId = id;
        this.modalService.open(content);
    }
    openForm(content){
        this.modalService.open(content);
    }
    editItem(id: number): void {
        this.produitService.getOneProduit(id).subscribe((result: any) => {
            this.produit = result.data;
        });
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
    disableEdit(value: Produit) {
        this.modalService.dismissAll();
        // to refresh current page
        this.getList(this.currentPage);
    }

    searchProduit(){
        if (this.keyWord === ''){
            this.getList(this.currentPage);
        }else{
            this.produitService.searchProduit(this.keyWord).subscribe((observe: any) => {
                if (observe.produits) {
                    this.msg_empty_table = "Aucun élement trouve"
                    this.produits = observe.produits;
                }
            }, (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
                console.log(error);
            });
        }
    }
}
