import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLogged: boolean = false;
  email!: string;
  @Input() location?: string;
  constructor(
    private cookie: CookieService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser(): void {
    this.userLogged = this.cookie.check('user');
    if (this.userLogged) {
      const {
        user: { email },
      } = JSON.parse(this.cookie.get('user'));
      this.email = email;
    }
  }

  logout(): void {
    this.user.logout().subscribe({
      next: (res) => {
        this.cookie.delete('user');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
