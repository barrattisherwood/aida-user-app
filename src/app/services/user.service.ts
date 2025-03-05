import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrUsers = 'http://localhost:3000/users';
  private apiUrlLoggedInUsers = 'http://localhost:3000/loggedInUsers';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

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
    this.currentUserSubject.next(user);
  }

}
