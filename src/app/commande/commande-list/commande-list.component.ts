import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dateFormats } from 'highcharts';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NumberToLetterService } from 'src/app/services/numberToLetter.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
    selector: 'app-commande-list',
    templateUrl: './commande-list.component.html',
    styleUrls: ['./commande-list.component.css'],
})
export class CommandeListComponent implements OnInit {

    isThereChange = false;
    msg_empty_table = "Aucune commande"
    error_message = '';
    success_message = '';
    warning_message = '';
    facture = <any>[];
    // valeur: number;
    price_total = 0;
    isLoading = true
    clients: [];
    clientID: number;
    size_year =50;
    mode_date = true;
    start_date : any;
    end_date: any;
    size = 10;
    maxPage: number;
    numberPage: number;
    startIndex: number;
    endIndex: number;
    commandes = [];
    currentNumFact = null;
    countArrayIndex = 0;
    index = 0;
    cmds = [];
    closeResult: string;
    currentName: '';
    numFacture: number;
    month: number;
    years: Array<any>;
    year :number;
    currentClient: Client;
    months = [
         [1,'Janvier'],
         [2,'Fervier'],
         [3,'Mars'],
         [4,'Avril'],
         [5,'Mai'],
         [6,'Juin'],
         [7,'Juillet'],
         [8,'Août'],
         [9,'Septembre'],
         [10,'Octobre'],
         [11,'Novembre'],
         [12,'Decembre']
     ]
    constructor(
        private commandeService: CommandeService,
        private clientService: ClientService,
        private userService: UserService,
        private activedRoute: ActivatedRoute,
        private router: Router,
        private numberToLetterService: NumberToLetterService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.clientID = 0
        this.getList();
        this.startIndex = 0;
        this.endIndex = this.size;
        this.numberPage = 1;
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        let years =[];
        for (let index = 0; index < this.size_year; index++) {
            years.push(this.year - index)
        }
        this.years = years; 
        this.clientService.getAll().subscribe(
            (resulat: any)=>{
              this.clients = resulat.data.rows 
            },
            (error: HttpErrorResponse)=>{
              if (error.status == 401) {
                this.userService.logout()
              }
              if (error.status == 500) {
                // message error show
                console.log(error.message);
                
              }
            }
          )
    }

    open(content, index) {
        this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title',size:'lg',scrollable:true})
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
        this.index = index;
        this.detailCommande(index);

    }
    detailCommande(index: number){
        this.currentNumFact = index;
        this.error_message = '';
        this.success_message = '';
        this.warning_message = '';
        this.commandeService.commandeByFacture(index).subscribe(
            (data: any) => {
                this.cmds = data.command;
                this.currentName = this.cmds[0].Clients.lastName;
    

            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
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

    navigate(num_page: number) {
        this.getList();
        this.numberPage = num_page;
        this.endIndex = this.size * num_page;
        this.startIndex = this.endIndex - this.size;
    }

    nextPage() {
        this.getList();
        this.numberPage = this.numberPage + 1;
        this.startIndex = this.endIndex;
        this.endIndex = this.startIndex + this.size;
    }

    prevPage() {
        this.getList();
        this.numberPage = this.numberPage - 1;
        this.endIndex = this.startIndex;
        this.startIndex = this.endIndex - this.size;
    }

    getArrayFromNumber(len: number) {
        // tslint:disable-next-line: radix
        const l = parseInt((len / this.size + 0.5).toFixed(0));
        this.maxPage = l;
        return new Array(l);
    }

    getList(page?: number): void {
        this.isLoading= true
        this.commandeService.list().subscribe(
            (observe: any) => {
                if (observe.list.length > 0 ) {
                    this.currentNumFact = observe.list[0].numFacture;
                    this.commandes = observe.list;
                    this.isLoading= false
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
            }
        );
    }

    mode(value){
        this.mode_date = value;
    }
    //   test(data){

    //       var total_price = null;
    //       if (data) {
    //             if (data.numFacture === this.currentNumFact) {
    //                 let arrayData = this.commandes[this.countArrayIndex] = data

    //                 // this.commandes[this.countArrayIndex].(data)
    //                 this.index = this.index + 1;
    //             }else{
    //                 this.index = 0
    //                 this.countArrayIndex = this.countArrayIndex + 1;
    //                 this.commandes[this.countArrayIndex][this.index] = data
    //             }
    //             console.log(this.commandes);
    //       }
    //        return data
    //   }
    addPanier(form: NgForm, id: number): void {
        const { quantite } = form.value;
        let obj = new Array();
        let currentData = new Array();
        let newData = [{ produitId: id, qte: 1 }];

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
        this.getList();
    }

    deleteCommande(num_facture: number){
        this.isLoading= true
        this.commandeService.commandeDeleteByFacture(num_facture).subscribe((resutat) => {
            this.getList();
        }, (error: HttpErrorResponse) => {
            console.log(error.message);

        });
    }

    deleteCommandeById(id: number){
        if (confirm('Voulez-vous supprimer cette commande')) {
            this.isLoading= false
            this.commandeService.commandeDeleteByIdCommande(id).subscribe((resutat) => {
                this.detailCommande(this.index);
                this.getList();
            }, (error: HttpErrorResponse) => {
                console.log(error.message);
            });
        }
    }

    openComfirmDelete(content, index) {
        this.numFacture = index;
        this.isThereChange = false;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
    }

    searchProduit(){
        this.isLoading= true
        if (!this.start_date && !this.end_date){
            this.getList(this.numberPage);
        }else{
            if (!this.start_date) {
                this.start_date = new Date;
            }
            if (!this.end_date) {
                this.end_date = new Date;
            }
            this.commandeService.searchBetweenDate(this.start_date, this.end_date, this.clientID).subscribe((observe: any) => {
                if (observe.commandes) {
                    this.msg_empty_table = "Aucune commande trouvée"
                    this.commandes = observe.commandes;
                    this.isLoading= false
                }
            }, (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
                console.log(error);
            });
        }
    }
    searchCommande(){
        this.isLoading= true
        if (!this.month && !this.year){
            console.log("tsss");
            
            this.getList(this.numberPage);
        }else{
            if (!this.start_date) {
                this.start_date = new Date;
            }
            if (!this.end_date) {
                this.end_date = new Date;
            }
            this.commandeService.searchByMonthOrYear(this.year, this.month, this.clientID).subscribe((observe: any) => {
                if (observe.commandes) {
                    this.msg_empty_table = "Aucune commande trouvée"
                    this.commandes = observe.commandes;
                    this.isLoading= false
                }
            }, (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
                console.log(error);
            });
        }
    }

    editMode(id: number){
        let newQte = parseInt(prompt("Veuillez rentrer le quantité commandé!",`${this.cmds[id].qte}`));
        if (newQte - this.cmds[id].qte == 0) {
            this.warning_message ="Aucune modification effectué";
            this.isThereChange = false;
        }else{
            this.commandeService.updateCommande(this.cmds[id].id,{qte : newQte}).subscribe((res)=>{
                this.detailCommande(this.cmds[id].numFacture)
                this.success_message = 'Succée! un commande est à jour';
                this.error_message = '';
            },
            (error: HttpErrorResponse)=>{
                this.error_message = error.error.error_msg;
                this.success_message='';
            }
            );
            this.isThereChange = true;
        }
        setTimeout(()=>{
            this.success_message = '';
            this.error_message = '';
            this.warning_message = '';
        },5000)

    }
    changeClient(){
        this.isLoading= true
        if (!this.mode_date) {
            this.commandeService.searchByMonthOrYear(this.year, this.month, this.clientID).subscribe((observe: any) => {
                if (observe.commandes) {
                    this.msg_empty_table = "Aucune commande trouvée"
                    this.commandes = observe.commandes;
                    this.isLoading= false
                }
            }, (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
                console.log(error);
            });
        } else {
            this.commandeService.searchBetweenDate(this.start_date, this.end_date, this.clientID).subscribe((observe: any) => {
                if (observe.commandes) {
                    this.msg_empty_table = "Aucune commande trouvée"
                    this.commandes = observe.commandes;
                    this.isLoading= false
                }
            }, (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
                console.log(error);
            });
        }
    }
    refresh(){
        this.getList();
        this.end_date = null;
        this.start_date = null;
        this.clientID = null;
    }

    validafte() {
        this.commandeService.commandeByFacture(this.currentNumFact)
            .subscribe(
                (result: any) => {
                    
                    this.currentClient = result.command[0].Clients;
                    this.facture = result.command;
                    this.generatePDF(this.facture);
                    this.isThereChange = false;
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
                    fontSize: 20,
                    aligment: 'center',
                    margin: [210, 10, 10, 50],
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
                                'ARRETEE LA PRESENTE FACTURE A LA SOMME  DE ' +
                                this.numberToLetterService
                                    .NumberToLetter(this.price_total)
                                    .toLocaleUpperCase() +
                                ' ARIARY',
                            marginTop: 10,
                            bold: false,
                            style: ['name'],
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
