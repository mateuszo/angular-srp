import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedUser$ = new BehaviorSubject(null);

  selectedUserTodos$ = this.selectedUser$.pipe(
    switchMap((user) =>
      this.http.get(
        `https://jsonplaceholder.typicode.com/users/${user?.id}/todos`
      )
    )
  );
  users$: Observable<any>;

  constructor(private http: HttpClient, private usersService: UsersService) {
    this.users$ = this.usersService.getUsers();
  }

  getUserImage(user) {
    return `https://avatars.dicebear.com/api/avataaars/${user.username}.svg`;
  }
}
