import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() selectUserEvent = new EventEmitter<User>();

  constructor() {}

  ngOnInit(): void {}

  getUserImage(user) {
    return `https://avatars.dicebear.com/api/avataaars/${user.username}.svg`;
  }

  onSelectUser(user: User) {
    this.selectUserEvent.emit(user);
  }
}
