import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatCard],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.sass'
})
export class UserDetailsComponent {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId ?? '').subscribe((data) => {
      this.user = data;
    });
  }
}
