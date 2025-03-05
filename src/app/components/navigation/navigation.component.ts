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
import { CommonModule } from '@angular/common';
import { AnimatedTooltipDirective } from '../../directives/animated-tooltip.directive';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbar, MatButton, MatIcon, RouterModule, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem, CommonModule, AnimatedTooltipDirective],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  allUsers: User[] = [];
  loggedInUsers: User[] = [];
  currentUser: User | null = null;

  constructor(private dialog: MatDialog, public userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.userService.getLoggedInUsers().subscribe(users => {
      this.loggedInUsers = users;
    });
    this.userService.getAllUsers().subscribe();
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
