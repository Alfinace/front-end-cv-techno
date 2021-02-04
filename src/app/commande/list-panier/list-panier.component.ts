import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { CommandeService } from '../../services/commande.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Client } from 'src/app/models/client';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { NumberToLetterService } from 'src/app/services/numberToLetter.service';
import { Command } from '../../models/command';
import {
    NgbActiveModal,
    NgbModal,
    ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-list-panier',
    templateUrl: './list-panier.component.html',
    styleUrls: ['./list-panier.component.css'],
})
export class ListPanierComponent implements OnInit {
    paniers = <any>[];
    facture = <any>[];
    currentClient: Client;
    price_total = 0;
    onePanierEditable: any;
    priceTotal = 0;
    closeResult: string;
    indexElementDelete = null;
    isBtnWait = false;
    isWait = true;
    size = 7;
    maxPage:number;
    numberPage :number;
    startIndex: number;
    endIndex: number;
    constructor(
        private produitService: ProduitService,
        private commandeService: CommandeService,
        private router: Router,
        private numberToLetterService: NumberToLetterService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.startIndex = 0;
        this.endIndex = this.size;
        this.numberPage = 1
        this.getData();
        var time = setInterval(()=>{
            if (!sessionStorage.getItem('client_id')) {
                this.router.navigateByUrl('/commande/historique')
                clearInterval(time)
            }
          },2000)
    }
    getData() {
        var data = <any>[];
        data = JSON.parse(sessionStorage.getItem('panier'));
        this.fetchData(data);
    }


    open(content, index) {
        this.indexElementDelete = index;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
        });
    }

    update_panier() {
        let  data =[];
        data = ([] = JSON.parse(sessionStorage.getItem('panier')));
        
        const panierUpdate = {
            produitId: this.onePanierEditable.id,
            qte: this.onePanierEditable.qte,
        };
        console.log(this.onePanierEditable);
        
        data.map((panier)=>{
            if (panier.produitId == this.onePanierEditable.id) {
                panier.qte =  this.onePanierEditable.qte
            }
        })
        sessionStorage.setItem('panier', JSON.stringify(data));
        this.fetchData(data);
    }
    edit_panier(content, index, id, design, qte, pu) {
        this.produitService.getOneProduit(id).subscribe((result: any) => {
            const stock = result.data.stock;
            this.onePanierEditable = { index, id, design, qte, pu, stock };
        });
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-titles' })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                    )}`;
                }
            );
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    fetchData(data: any[]): void {
        var data_temp = <any>[];
        var price_total = 0;
        // tslint:disable-next-line: prefer-for-of
        if (!data) {
            this.priceTotal = 0;
        } else {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < data.length; i++) {
                this.produitService
                    .getOneProduit(data[i].produitId)
                    .subscribe((produit: any) => {
                        var data_tmp = [{
                            id: produit.data.id,
                            design: produit.data.design,
                            pu: produit.data.pu,
                            quantite: data[i].qte,
                        }];
                        data_temp = [...data_tmp, ...data_temp];
                        this.isWait = false;
                        price_total = price_total + data_tmp[0].pu * data_tmp[0].quantite;
                        this.priceTotal = price_total
                    },(error: HttpErrorResponse)=>{
                        console.error(error.message);
                        
                    },
                    ()=>{
                        this.isWait = false;
                        this.paniers = data_temp;
                    });
            }
        }
       
    }
    getArrayFromNumber(len:number){
        let l = parseInt(((len/10)+ 0.5).toFixed(0))
        this.maxPage = l;
        return new Array(l);
    }
    deleteItem(index: number) {
        let paniers = <any>[];
        console.log(index);
        paniers = JSON.parse(sessionStorage.getItem('panier'));
        paniers.splice(index, 1);
        sessionStorage.setItem('panier', JSON.stringify(paniers));
        this.paniers = [];
        this.fetchData(paniers);
        this.priceTotal = 0
    }
    navigate(num_page: number){
        this.numberPage = num_page;
        this.endIndex =  this.size *num_page
        this.startIndex = this.endIndex - this.size
    }

    nextPage(){
        this.numberPage = this.numberPage + 1;
        this.startIndex = this.endIndex
        this.endIndex= this.startIndex + this.size
    }

    prevPage(){
        this.numberPage = this.numberPage - 1;
        this.endIndex = this.startIndex
        this.startIndex= this.endIndex - this.size
    }

    validate() {
        this.isBtnWait = true;
        let clientID = JSON.parse(sessionStorage.getItem('client_id'));
        let data = JSON.parse(sessionStorage.getItem('panier'));
        this.commandeService
            .addCommande({ id: clientID, commands: data })
            .subscribe(
                (result: any) => {
                    sessionStorage.removeItem('panier');
                    sessionStorage.removeItem('client_id');
                    this.currentClient = result.facture[0].Clients;
                    this.facture = result.facture;
                    this.generatePDF(this.facture);
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                }
            );
    }

    generatePDF(data) {
        pdfMake.createPdf(this.getDocumentDefinition()).open();
    }

    getDocumentDefinition() {
        return {
            content: [
                {
                    text: 'FACTURE',
                    bold: true,
                    fontSize: 25,
                    aligment: 'center',
                    margin: [210, 10, 150, 50],
                    decoration: 'underline',
                },
                {
                    columns: [
                        {
                            text: 'N° CLIENT:',
                            style: ['name', 'prefixe'],
                        },
                        {
                            text: this.currentClient.id,
                            style: 'name',
                            marginLeft: -170,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: 'NOM:',
                            style: ['name', 'prefixe'],
                        },
                        {
                            text:
                                this.currentClient.lastName +
                                ' ' +
                                this.currentClient.firstName,
                            style: 'name',
                            marginLeft: -170,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            text: 'CONTACT:',
                            style: ['name', 'prefixe'],
                        },
                        {
                            text: this.currentClient.contact,
                            style: 'name',
                            marginLeft: -170,
                        },
                    ],
                },
                {
                    table: {
                        headersRow: 2,
                        widths: ['auto', '*', '*', '*'],
                        body: [
                            [
                                {
                                    text: 'DESIGNATION',
                                    style: 'tableHeader',
                                },
                                {
                                    text: 'PRIX UNITAIRE',
                                    style: 'tableHeader',
                                },
                                {
                                    text: 'QUANTITE',
                                    style: 'tableHeader',
                                },
                                {
                                    text: 'MONTANT',
                                    style: 'tableHeader',
                                },
                            ],
                            ...this.facture.map((fac) => {
                                this.price_total =
                                    this.price_total +
                                    fac.Produits.pu * fac.qte;
                                console.log(this.price_total);

                                return [
                                    fac.Produits.design,
                                    fac.Produits.pu,
                                    fac.qte,
                                    fac.Produits.pu * fac.qte,
                                ];
                            }),
                            [
                                {
                                    text: '',
                                    colSpan: 2,
                                },
                                {},
                                {
                                    text: 'TOTAL',
                                    style: 'tableHeader',
                                },
                                {
                                    text: this.price_total + ' Ariary',
                                    style: 'tableHeader',
                                },
                            ],
                        ],
                    },
                },
                {
                    columns: [
                        {
                            text:
                                'ARRETEE LA PRESENTE FACTURE A LA SOMME  DE : ' +
                                this.numberToLetterService
                                    .NumberToLetter(this.price_total)
                                    .toLocaleUpperCase() +
                                ' ARIARY',
                            marginTop: 10,
                            bold: true,
                        },
                    ],
                },
            ],
            styles: {
                tableHeader: {
                    bold: true,
                },
                name: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                prefixe: {
                    decoration: 'underline',
                },
            },
        };
    }
}
