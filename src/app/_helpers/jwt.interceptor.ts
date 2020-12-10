import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Interception In Progress'); // SECTION 1
    const token: string = localStorage.getItem('x-access-token');
    const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
    });
    return next.handle(tokenizedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 UNAUTHORIZED - SECTION 2
        if (error && error.status === 401) {
          console.log('ERROR 401 UNAUTHORIZED');
          this.userService.logout();
        }
        const err = error.error.message || error.statusText;
        return throwError(error);
        })
    );
  }
}
