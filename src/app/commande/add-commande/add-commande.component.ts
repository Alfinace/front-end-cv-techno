import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommandeService } from '../../services/commande.service';

@Component({
    selector: 'app-add-commande',
    templateUrl: './add-commande.component.html',
    styleUrls: ['./add-commande.component.css'],
})
export class AddCommandeComponent implements OnInit {
    produits = [];
    size = 10;
    maxPage:number;
    numberPage :number;
    startIndex: number;
    endIndex: number;
    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private activedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getList();
        this.startIndex = 0;
        this.endIndex = this.size;
        this.numberPage = 1
    
    }

    navigate(num_page: number){
        this.getList();
        this.numberPage = num_page;
        this.endIndex =  this.size *num_page
        this.startIndex = this.endIndex - this.size
    }

    nextPage(){
        this.getList();
        this.numberPage = this.numberPage + 1;
        this.startIndex = this.endIndex
        this.endIndex= this.startIndex + this.size
    }

    prevPage(){
        this.getList();
        this.numberPage = this.numberPage - 1;
        this.endIndex = this.startIndex
        this.startIndex= this.endIndex - this.size
    }

    getArrayFromNumber(len:number){
        let l = parseInt(((len/10)+ 0.5).toFixed(0))
        this.maxPage = l;
        return new Array(l);
    }

    getList(page?: number): void {
        this.commandeService.listForCommand().subscribe(
            (observe: any) => {
               let currentData = JSON.parse(sessionStorage.getItem('panier'));
               console.log(currentData);
               
                const data = observe.data;
                this.produits = data.rows;
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
            }
        );
    }

    addPanier(form: NgForm, id: number): void {
        let { quantite } = form.value;
        var obj = new Array();
        var currentData = new Array();
        var newData = [{ produitId: id, qte:quantite }];

        currentData = JSON.parse(sessionStorage.getItem('panier'));
        if (!currentData) {
            sessionStorage.setItem(
                'panier',
                JSON.stringify(obj.concat(newData))
            );
        } else {
            currentData = currentData.concat(newData);
            sessionStorage.setItem('panier', JSON.stringify(currentData));
        }
    }
}
