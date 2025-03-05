import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    const user = this.userService.getCurrentUser(); // Or this.userService.currentUser() if public
    if (user && user.role === UserRole.ADMIN) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
