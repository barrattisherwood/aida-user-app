import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatCard } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { SearchComponent } from '../search/search.component';
import { MatIconButton } from '@angular/material/button';
import { User } from '../../models/user.model';
import { SortPipe } from '../../pipes/sort.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatCard, MatList, MatListItem, RouterModule, MatIconModule, MatIconButton, MatMenuModule, SearchComponent, SortPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  sortField: string = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  openUserDetails(userId: string): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '400px',
      data: { id: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
      this.filteredUsers = this.filteredUsers.filter((user) => user.id !== userId);
    });
  }

  trackByUserId(user: User): number {
    return +user.id;
  }

  onSearch(searchTerm: string): void {
    this.filteredUsers = this.users.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  sortUsersBy(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }
}
