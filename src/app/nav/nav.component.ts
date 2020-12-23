import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{
  userLogged: User;
  isLoggedIn$ : Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService) {}

  ngOnInit(): void {
    let userId = JSON.parse(localStorage.getItem('_id'))
    this.userService.getOneUser(userId).subscribe((user :any)=>{

      this.userLogged = user.data
    },(error)=>{
      console.log(error);
      
    })
    this.isLoggedIn$ = this.userService.isLoggedIn;
  }

  onLogout(){
    this.userService.logout()
  } 
}
