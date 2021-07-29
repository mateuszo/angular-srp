import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class SelectedUserService {

  private readonly selectedUser$ = new BehaviorSubject<User>(null);

  getSelectedUser(): Observable<User> {
    return this.selectedUser$.asObservable();
  }

  select(user: User): void {
    this.selectedUser$.next(user);
  }
}
