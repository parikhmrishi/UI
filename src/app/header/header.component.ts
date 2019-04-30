import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { DataService } from '../services/userData.service';
import { TokenGuard } from '../validate/Token.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name: string;
  email: string;
  admin: boolean = false;

  constructor(private router: Router, private authService: AuthService, private dataService: DataService, private tokenGuard: TokenGuard) { }
  public sidemenu: boolean = false;
  public displaysidemenu() {
    if (this.sidemenu == false) {
      this.sidemenu = true;
    }
    else if (this.sidemenu == true) {
      this.sidemenu = false;
    }
    console.log(this.sidemenu);

  }

  ngOnInit() {
    this.admin = this.dataService.getRole();
    this.name = this.tokenGuard.JwtService().name;
    this.email = this.tokenGuard.JwtService().email;
  }

  signOut() {
    localStorage.removeItem("token");
    this.router.navigate(['auth']);
  }

  public createquiz() {
    this.router.navigate(['/createquiz']);
  }
}