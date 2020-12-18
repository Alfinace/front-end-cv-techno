import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  constructor(
    private userService: UserService) {}
  ngOnInit(): void {

  }

logout() {
this.userService.logout();
}
}
