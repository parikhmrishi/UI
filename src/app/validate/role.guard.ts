import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { TokenGuard } from './Token.guard';
import { environment } from '../../environments/environment.prod';
import { DataService } from '../services/userData.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private userService: DataService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    try {
        if ( this.userService.getRole() === false) {
              this.router.navigate(['home']);
              return false;
      }
      else {
        this.router.navigate(['createquiz']);
        return true;
      }
    }
    
    catch {
      this.router.navigate(['auth']);
      localStorage.removeItem('token');
    }
  }
}
