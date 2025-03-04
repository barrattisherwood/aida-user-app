import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.sass'
})
export class UserDetailsComponent {
  user: any;
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.data.id;
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
    });
  }

  saveUser(): void {
    this.userService.addUser(this.user).subscribe((data) => {
      this.user = data;
      this.editMode = false;
      this.dialogRef.close();
    });
  }
}
