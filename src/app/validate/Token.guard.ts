import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenGuard {
  constructor(private router: Router) { }
  public JwtService() {
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(localStorage.getItem('token'));
  console.log(decodedToken);
  return decodedToken;
  }
}