import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WebRequestService } from '../../services/web-request.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  message = null;
  defaultValueEmail = null;
  defaultValuePassword = null;
  isClicked = false;
  constructor(private userService: UserService,
              private router: Router
              ){ }

  ngOnInit(): void {
    if (this.userService.getAccessToken()) {
        this.router.navigateByUrl('/admin');
    }
  }
  onSubmit(formulaire: NgForm): void {
    this.isClicked  = true;
    this.userService.login(formulaire.value._email, formulaire.value._password).subscribe((res: HttpResponse<any>) => {
    this.isClicked  = false;
      this.router.navigateByUrl('/admin');
    }, (err: any) => {
      if (err.status === 401) {
        this.message = err.error.error;
        formulaire.onReset();
        this.isClicked  = false;
        setTimeout(() => {
              this.message = null;
            }, 5000);
          }
        });
  }

}
