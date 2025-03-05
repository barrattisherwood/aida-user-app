import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatCard } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registered-users',
  standalone: true,
  imports: [MatCard, MatList, MatListItem, RouterModule, MatIconModule, MatIconButton, MatMenuModule, SearchComponent, CommonModule],
  templateUrl: './registered-users.component.html',
  styleUrl: './registered-users.component.scss'
})
export class RegisteredUsersComponent {
  loggedInUsers: User[] = [];
  filteredUsers: User[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUsers().subscribe(data => {
      this.loggedInUsers = data;
      this.filteredUsers = data;
    });
  }

  openUserDetails(userId: string): void {
    console.log('Open user details for user with ID:', userId);
  }

  trackByUserId(user: User): number {
    return +user.id;
  }

  onSearch(searchTerm: string): void {
    this.filteredUsers = this.loggedInUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  sortUsersBy(field: keyof User): void {
    this.filteredUsers.sort((a, b) => {
      if (a[field] === undefined) return 1;
      if (b[field] === undefined) return -1;
      if (a[field] < b[field]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
