import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'registered-users', component: RegisteredUsersComponent, canActivate: [AuthGuard] }
];
