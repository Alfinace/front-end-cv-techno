import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  isLogged = false;
  eventIsLogged = new EventEmitter<boolean>()
  constructor(
    private userService: UserService) {}
  ngOnInit(): void {
    if (localStorage.getItem('x-access-token')) {
      this.isLogged = true
    }
  }

logout() {
this.userService.logout();
}
}
