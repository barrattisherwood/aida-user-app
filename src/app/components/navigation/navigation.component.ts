import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { AddUserComponent } from '../add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AnimatedTooltipDirective } from '../../directives/animated-tooltip.directive';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbar, MatButton, MatIcon, RouterModule, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem, AsyncPipe, CommonModule, AnimatedTooltipDirective],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  loggedInUsers: User[] = [];
  currentUser$: Observable<User | null>;

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.currentUser$ = this.userService.currentUser$;
  }

  ngOnInit(): void {
    this.userService.getLoggedInUsers().subscribe(users => {
      this.loggedInUsers = users;
    });
  }

  setCurrentUser(userId: string): void {
    const selectedUser = this.loggedInUsers.find(user => user.id === userId);
    if (selectedUser) {
      this.userService.setCurrentUser(selectedUser);
    }
  }

  openAddUserModal(): void {
    this.dialog.open(AddUserComponent);
  }

  trackByUserId(user: User): number {
    return +user.id;
  }
}
