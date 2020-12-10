import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
// tslint:disable-next-line: ban-types
users: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((observe: any) => {
      console.log(observe.data);
      const data = observe.data;
      this.users = data.rows;
    });
  }

}
