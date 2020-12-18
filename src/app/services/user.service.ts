import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(){
    return this.loggedIn.asObservable()
  }
  constructor(private webReqService: WebRequestService,
              private router: Router) { }


  register(user: User){
    return this.webReqService.post('registration', user);
  }
  login(email: string, password: string){
    return this.webReqService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.setSession(res.body.userId, res.body.token);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      })
    );
  }

  
  logout(){
    this.removeSession();
    this.loggedIn.next(false)
    this.router.navigate(['/login']);
  }



  updateUser(id: number, user: User){
    return this.webReqService.put(`user/${id}/edit`, user);
  }

  deleteOneUser(id: number){
    return  this.webReqService.delete(`user/${id}`);
  }

  getOneUser(id: number){
  return  this.webReqService.get(`user/${id}`);
  }

  getAllUser(page?: number, limit?: number){
    return this.webReqService.get(`user/list?page=${page}&limit=${limit}`);
  }

  // tslint:disable-next-line: variable-name
  setSession(user_id: string, accessToken: string){
    localStorage.setItem('_id', user_id);
    localStorage.setItem('x-access-token', accessToken);
  }
getAccessToken(): string {
  return localStorage.getItem('x-access-token');
} 

  removeSession(){
    localStorage.removeItem('_id');
    localStorage.removeItem('x-access-token');
  }
}
