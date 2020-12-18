import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn$ : Observable<boolean>;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn;
  }

  onLogout(){
    this.userService.logout()
  }

}
