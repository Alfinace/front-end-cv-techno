import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommandeService } from '../../services/commande.service';
import { ClientService } from '../../services/client.service';
import { Client } from 'src/app/models/client';

@Component({
    selector: 'app-add-commande',
    templateUrl: './add-commande.component.html',
    styleUrls: ['./add-commande.component.css'],
})
export class AddCommandeComponent implements OnInit {
    
    produits = [];
    produits_session = [];
    currentClient : any ="";
    size = 10;
    maxPage:number;
    numberPage :number;
    startIndex: number;
    endIndex: number;
    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private activedRoute: ActivatedRoute,
        private clientService: ClientService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getList();
        this.startIndex = 0;
        this.endIndex = this.size;
        this.numberPage = 1
        this.getCurrentClient()
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
                const data = observe.data;
                // check if produit is already token
                this.produits = data.rows.map(this.checkItemAlreadySelect)
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
            }
        );
    }

    checkItemAlreadySelect(item){   
        item.check = false;
        let currentData = JSON.parse(sessionStorage.getItem('panier'));
        if (currentData) { 
            for (var i = 0; i < currentData.length; i++) {
              let data =currentData[i];
              if(item.id === data.produitId){
                  item.check = true;
                  break
              }
          }
        } 
        return item
    }
    addPanier(form: NgForm, id: number): void {
        let { quantite } = form.value;
        var obj = new Array();
        var currentData = new Array();
        var newData = [{ produitId: id, qte:1 }];

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
        this.getList()
    }

    getCurrentClient(){
        const client_id = JSON.parse(sessionStorage.getItem('client_id'))
        this.clientService.getOneClient(client_id).subscribe((observe: any)=>{
            this.currentClient = observe.data;
        })
    }
}
