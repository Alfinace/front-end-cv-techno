import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(formulaire: NgForm): void {
    console.log(formulaire.value.email);
    console.log(formulaire.value.password);
  }

}
