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

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbar, MatButton, MatIcon, RouterModule, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  loggedInUsers: User[] = [];

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUsers().subscribe(users => {
      this.loggedInUsers = users;
    });
  }

  setCurrentUser(userId: string): void {
    console.log('Select current userid:', userId);
  }

  openAddUserModal(): void {
    this.dialog.open(AddUserComponent);
  }

  trackByUserId(user: User): number {
    return +user.id;
  }
}
