import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrUsers = 'http://localhost:3000/users';
  private apiUrlLoggedInUsers = 'http://localhost:3000/loggedInUsers';
  private currentUserSignal = signal<User | null>(null);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrUsers);
  }

  getLoggedInUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlLoggedInUsers);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrUsers}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrUsers, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrUsers}/${id}`);
  }

  setCurrentUser(user: User): void {
    this.currentUserSignal.set(user);
  }

  getCurrentUser() {
    return this.currentUserSignal();
  }

}
