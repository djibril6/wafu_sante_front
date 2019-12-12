import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VarConfig } from '../config/var.config';
import { NbWindowService } from '@nebular/theme';
import { LoginComponent } from './wafu/login/login.component';

export class AuthGuard implements CanActivate {

    constructor(private vg: VarConfig, private router: Router, private windowService: NbWindowService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.vg.connected) {
      return true;
    } else {
      this.windowService.open(LoginComponent, { title: `Login` });
    //   this.router.navigate(['/pages/wafu']);
    }
  }
}

export class AuthADMINGuard implements CanActivate {

    constructor(private vg: VarConfig, private router: Router, private windowService: NbWindowService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.vg.connected) {
        if (this.vg.user.response.roles.includes('ADMIN') || this.vg.user.response.roles.includes('ROOT')) {
            return true;
        } else {
            this.windowService.open(LoginComponent, { title: `Login` });
    //   this.router.navigate(['/pages/wafu']);
        }
    } else {
        this.windowService.open(LoginComponent, { title: `Login` });
        //   this.router.navigate(['/pages/wafu']);
    }
  }
}