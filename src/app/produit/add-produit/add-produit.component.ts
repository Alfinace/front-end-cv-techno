import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  produit: Produit
  constructor(private produitService: ProduitService) { }
  @Output() newItemProduit = new EventEmitter<any>()
  ngOnInit(): void {
  }
  addNewProduit(value : any){
    this.newItemProduit.emit(value)
  }
  onSubmit(formulaire: NgForm){
    console.log(formulaire.value);
    const produit = new Produit(null,formulaire.value.design,formulaire.value.pu,formulaire.value.stock);
    console.log(produit); 
    this.produitService.addProduit(produit).subscribe(
      (result:any)=>{
        console.log(result.data);
        this.addNewProduit(result.data)
      },
      (error: any)=>{
        console.log(error);
        
      }
    )
  }

}
