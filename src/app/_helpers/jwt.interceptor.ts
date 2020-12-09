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
    req = req.clone({ headers: req.headers.set('Authorization',token) });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 UNAUTHORIZED - SECTION 2
        if (error && error.status === 401) {
          console.log('ERROR 401 UNAUTHORIZED');
        }
        const err = error.error.message || error.statusText;
        return throwError(error);
        })
    );
  }
}
