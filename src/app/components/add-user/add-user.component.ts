import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.addUserForm = this.fb.group({
      fullName: ['', Validators.required],
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      details: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const newUser: User = this.addUserForm.value as User;
      this.userService.addUser(newUser).subscribe(user => {
        this.snackBar.open('User added successfully', 'Close', {
          duration: 3000,
        });
      });
      this.dialogRef.close();
    }
  }
}
