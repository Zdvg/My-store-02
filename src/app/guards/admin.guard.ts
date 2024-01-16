import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | UrlTree | Promise<boolean> | boolean {
    return this.authService.user$
    .pipe(
      map(user => {
      if (user?.role === 'admin'){
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }));
  }
}
