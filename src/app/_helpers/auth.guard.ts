import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.userService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                  console.log(isLoggedIn);
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        );
    }
}
