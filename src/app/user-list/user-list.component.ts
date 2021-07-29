import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { SelectedUserService } from '../services/selected-user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[] = [];

  constructor(private selectedUserService: SelectedUserService) {
  }

  getUserImage(user): string {
    return `https://avatars.dicebear.com/api/avataaars/${user.username}.svg`;
  }

  selectUser(user: User): void {
    this.selectedUserService.select(user);
  }
}
