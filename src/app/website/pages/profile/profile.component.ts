import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User | null = null;

  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.authService.user$
    .subscribe(data => {
      this.user = data;
    })
  }

}
