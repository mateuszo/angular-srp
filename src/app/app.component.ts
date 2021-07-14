import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  users$ = this.http.get('https://jsonplaceholder.typicode.com/users/');

  selectedUser$ = new BehaviorSubject(null);

  selectedUserTodos$ = this.selectedUser$.pipe(
    switchMap((user) =>
      this.http.get(
        `https://jsonplaceholder.typicode.com/users/${user?.id}/todos`
      )
    )
  );

  constructor(private http: HttpClient) {}

  getUserImage(user) {
    return `https://avatars.dicebear.com/api/avataaars/${user.username}.svg`;
  }
}
