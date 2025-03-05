import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrUsers = 'http://localhost:3000/users';
  private apiUrlLoggedInUsers = 'http://localhost:3000/loggedInUsers';
  private currentUserSignal = signal<User | null>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrUsers);
  }

  getLoggedInUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlLoggedInUsers);
  }

  getAllUsers(): Observable<User[]> {
    return forkJoin([this.getUsers(), this.getLoggedInUsers()]).pipe(
      map(([users, loggedInUsers]) => [...users, ...loggedInUsers]),
      tap(allUsers => this.setTotalUsersCookie(allUsers.length))
    );
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

  private setTotalUsersCookie(totalUsers: number): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // Set expiry time to 1 day
    this.cookieService.set('RABO_USERS', totalUsers.toString(), expiryDate, '/');
  }
}
