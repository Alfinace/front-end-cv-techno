import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {
@Input() produitEdit: Produit;
@Output() eventUpdateProduit = new EventEmitter<any>()

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    const produit = new Produit(this.produitEdit.id,form.value.design,form.value.pu,form.value.stock);
    console.log(produit); 
    this.produitService.updateProduit(this.produitEdit.id,produit).subscribe(
      (result:any)=>{
        console.log(result);
        // this.addNewProduit(result.data)
        this.eventAfterUpdate(result.data)
      },
      (error: any)=>{
        console.log(error.message);
        
      }
    )
  }
  eventAfterUpdate(value: any ){
    this.eventUpdateProduit.emit(value)
  }
}
