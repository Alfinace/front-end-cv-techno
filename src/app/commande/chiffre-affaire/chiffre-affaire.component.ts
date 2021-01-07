import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styleUrls: ['./chiffre-affaire.component.css']
})
export class ChiffreAffaireComponent implements OnInit {

  chiffre_affaire = [];
  years = [];
  year: number;
  size_year =50;
  somme = 0;
  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    let years =[];
        for (let index = 0; index < this.size_year; index++) {
            years.push(this.year - index)
        }
    this.years = years; 
    this.getData()
  }

  getData(){
    this.commandeService.commandeForChiffreAffaire(this.year).subscribe((observe: any)=>{
      this.chiffre_affaire = observe.data; 
      this.somme = observe.somme; 
    },
    (error: HttpErrorResponse)=>{
      console.log(error);
      
    })
  }
  changeYear(){
    this.getData()
  }
}
