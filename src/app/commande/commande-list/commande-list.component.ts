import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-commande-list',
    templateUrl: './commande-list.component.html',
    styleUrls: ['./commande-list.component.css'],
})
export class CommandeListComponent implements OnInit {
    size = 30;
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
    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private activedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.getList();
        this.startIndex = 0;
        this.endIndex = this.size;
        this.numberPage = 1;
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
        this.commandeService.commandeByFacture(index).subscribe(
            (data: any) => {
                this.cmds = data.command;
                this.currentName = this.cmds[0].Clients.lastName;
                console.log(this.cmds);

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
        this.commandeService.list().subscribe(
            (observe: any) => {
                if (observe.list.length > 0 ) {
                    this.currentNumFact = observe.list[0].numFacture;
                    this.commandes = observe.list;
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
            }
        );
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
        this.commandeService.commandeDeleteByFacture(num_facture).subscribe((resutat) => {
            this.getList();
        }, (error: HttpErrorResponse) => {
            console.log(error.message);

        });
    }

    deleteCommandeById(id: number){
        console.log(id);
        if (confirm('Voulez-vous supprimer cette commande')) {
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
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
    }
}
