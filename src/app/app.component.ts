import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './model/user';
import { UsersService } from './services/users.service';
import { SelectedUserService } from './services/selected-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedUser$ = this.selectedUserService.getSelectedUser();

  selectedUserTodos$ = this.selectedUser$.pipe(
    switchMap((user: User) =>
      this.http.get(
        `https://jsonplaceholder.typicode.com/users/${user?.id}/todos`
      )
    )
  );
  users$: Observable<User[]>;

  constructor(private http: HttpClient,
              private usersService: UsersService,
              private selectedUserService: SelectedUserService) {
    this.users$ = this.usersService.getUsers();
  }

  closeUserDetails(): void {
    this.selectedUserService.select(null);
  }
}
