import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { fader, slidder } from './route-animation';
import { RouterOutlet } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
export class NavComponent implements OnInit {
    userLogged: User;
    isLoggedIn$: Observable<boolean>;
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );
    email: any;
    count_panier = 0;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private userService: UserService,
        private flashMessage: FlashMessagesService
    ) {}

    ngOnInit(): void {
        const userId = JSON.parse(localStorage.getItem('_id'));
        this.userService.getOneUser(userId).subscribe(
            (user: any) => {
                this.email = user.data.e;
            },
            (error) => {
                console.log(error);
            }
        );
        this.isLoggedIn$ = this.userService.isLoggedIn;
        // var time = setInterval(()=>{
        //   this.userService.getOneUser(userId).subscribe((user: any) => {
        //     this.email = user.data.e;
        //   }, (error) => {
        //    clearInterval(time)
        //   });
        // },2000)
    }
    showFlash() {
        // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        this.flashMessage.grayOut(false);
        this.flashMessage.show('Welcome To TheRichPost.com', {
            cssClass: 'alert-success',
            timeout: 2000,
        });
    }
    onLogout() {
        this.userService.logout();
    }

    // for route animation
    prepareRoute(outlet: RouterOutlet) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData.animation
        );
    }
    fnEventCount(value) {
      console.log('tonga'+value);
      ;
        this.count_panier = value;
    }
}
