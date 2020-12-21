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
import { NgbActiveModal, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
	closeResult: string;
	indexElementDelete = null;
	isBtnWait= false;
	isWait= true;
	constructor(
		private produitService: ProduitService,
		private commandeService: CommandeService,
		private router: Router,
		private numberToLetterService: NumberToLetterService ,
		private modalService: NgbModal
	) { }

	ngOnInit(): void {
		var data = <any>[];
		data = JSON.parse(sessionStorage.getItem('panier'));
	 this.fetchData(data)
	}

  open(content, index) {
  	this.indexElementDelete = index;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }

	fetchData(data: any): void {
		var data_temp = <any>[];
		// data.forEach((panier) => {
			for (let i = 0; i < data.length; i++) {
				const panier = data[i];
				this.produitService
				.getOneProduit(panier.produitId)
				.subscribe((produit: any) => {
					let data_tmp = {
						id: produit.data.id,
						design: produit.data.design,
						pu: produit.data.pu,
						quantite: panier.qte,
					};
					data_temp.push(data_tmp);
					this.isWait =false					
				// });
				});
			}
		this.paniers = data_temp;
	}
	deleteItem(index: number){
		let paniers= <any>[];
		console.log(index);
		paniers = JSON.parse(sessionStorage.getItem('panier'));
		paniers.splice(index,1);
		sessionStorage.setItem('panier', JSON.stringify(paniers));
		this.paniers = [];
		this.fetchData(paniers);
	}

	validate() {
		this.isBtnWait =true;
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
					this.router.navigate(['/commande']);
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
							style: ['name','prefixe'],
						},
						{
							text:  this.currentClient.id,
							style: 'name',
							marginLeft:-170
						},
					],
				},
				{
					columns: [
						{
							text: 'NOM:',
							style: ['name','prefixe'],
						},
						{
							text:  this.currentClient.name,
							style: 'name',
							marginLeft:-170
						},
					],
				},
				{
					columns: [
						{
							text: 'CONTACT:',
							style: ['name','prefixe'],
						},
						{
							text:  this.currentClient.contact,
							style: 'name',
							marginLeft:-170
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
									colSpan:2,
								},
								{
									
								},
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
							text: 'ARRETEE LA PRESENTE FACTURE A LA SOMME  DE : '+ (this.numberToLetterService.NumberToLetter(this.price_total)).toLocaleUpperCase() + ' ARIARY',
							marginTop : 10,
							bold:true
						},
					],
				}
			],
			styles: {
				tableHeader: {
					bold: true,
				},
				name: {
					fontSize: 12,
					marginBottom: 5,
				},
				prefixe:{
					decoration: 'underline',
				}
			},
		};
	}
}
