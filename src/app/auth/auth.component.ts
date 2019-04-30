import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router } from '@angular/router'
import { DataService } from '../services/userData.service';
import { IUserDetails } from '../model/IUserDetail'
import { TokenGuard } from '../validate/Token.guard';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private user: SocialUser;
  constructor(private authService: AuthService, private dataService: DataService, private router: Router, private tokenGuard: TokenGuard) { }

  ngOnInit() {
    if (localStorage.getItem("token") === null) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.router.navigate(['auth']);
      });
    }
    else {
      this.router.navigate(['home']);
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      localStorage.clear();
      localStorage.setItem("token", this.user.idToken);
      this.tokenGuard.JwtService();
      if (this.user.idToken != undefined) {
        console.log
        (this.tokenGuard.JwtService().email);
          //this.dataService.setUser(this.user.id, this.user.name, this.user.email).subscribe(result => {
          //this.dataService.setRole(result);
          this.router.navigate(['home']);
        //});
      }
    });
  }
}

