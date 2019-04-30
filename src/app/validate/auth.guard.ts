import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { TokenGuard } from './Token.guard';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenGuard: TokenGuard) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    try {
      if (this.tokenGuard.JwtService().azp == environment.clientId) {
        return true;
      }
      else {
        this.router.navigate(['auth']);
        localStorage.removeItem('token');
        return false;
      }
    }
    
    catch {
      this.router.navigate(['auth']);
      localStorage.removeItem('token');
    }
  }
}
