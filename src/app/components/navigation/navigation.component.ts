import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbar, MatButton, MatIcon],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(private dialog: MatDialog) { }

  openAddUserModal(): void {
    this.dialog.open(AddUserComponent);
  }
}
