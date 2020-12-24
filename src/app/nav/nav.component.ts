import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { fader, slidder } from './route-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  // animations: [
  //   // fader,
  //     slidder,
  // //  transformer,
  //   // stepper
  // ]
})
export class NavComponent  implements OnInit{
  userLogged: User;
  isLoggedIn$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  email: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService) {}

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('_id'));
    this.userService.getOneUser(userId).subscribe((user: any) => {
      this.email = user.data.e;
    }, (error) => {
      console.log(error);

    });
    this.isLoggedIn$ = this.userService.isLoggedIn;
  }

  onLogout(){
    this.userService.logout();
  }

  // for route animation
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
}
}
