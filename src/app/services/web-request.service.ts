import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {
  }

  public get(url: string){
    return this.httpClient.get(`${this.ROOT_URL}/${url}`);
  }

  // tslint:disable-next-line: ban-types
  public post(url: string, payload: Object){
    return this.httpClient.post(`${this.ROOT_URL}/${url}`, payload);
  }

  // tslint:disable-next-line: ban-types
  public put(url: string, payload: Object){
    return this.httpClient.put(`${this.ROOT_URL}/${url}`, payload);
  }
  public delete(url: string){
    return this.httpClient.delete(`${this.ROOT_URL}/${url}`);
  }
  public login(email: string, password: string){
    return this.httpClient.post(`${this.ROOT_URL}/login`, {
      email, password
    },{
        observe: 'response'
    });
  }
}
