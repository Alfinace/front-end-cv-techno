import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { CommandeService } from '../../services/commande.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-panier',
  templateUrl: './list-panier.component.html',
  styleUrls: ['./list-panier.component.css']
})
export class ListPanierComponent implements OnInit {
  paniers= [];
  facture = [];

  constructor(private produitService: ProduitService,
    private commandeService: CommandeService) { }

  ngOnInit(): void {
    var data = <any>[];
    data = JSON.parse(sessionStorage.getItem('panier'));
      data.forEach((panier)=>{
        this.produitService.getOneProduit(panier.produitId).subscribe((produit: any)=>{
        let data_tmp = {id: produit.data.id, design: produit.data.design, pu: produit.data.pu, quantite: panier.qte};
        this.paniers.push(data_tmp);
      })
    })
  }

  validate(){
    let clientID = JSON.parse(sessionStorage.getItem('client_id'));
    let data = JSON.parse(sessionStorage.getItem('panier'));

    this.commandeService.addCommande({id:clientID,commands:data}).subscribe((result: HttpResponse<any>)=>{
      // sessionStorage.removeItem('panier')
      // sessionStorage.removeItem('client_id')
      console.log(result.facture);
      if(result.status === 200){
        // this.facture = result.
      }
      // this.generatePDF()
    },
    (error: HttpErrorResponse)=>{
      console.log(error);
    
    })
  }

  generatePDF() {
    var data = document.getElementById('contentPDF');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('../../../assets/images/bannerthumb.png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
    }
}