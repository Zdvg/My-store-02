import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export function exitGuard<T extends OnExit>( // No fue exportada en modo de clase, y tampoco emplea ninguno de los CanDeactivate
  component: T,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
): boolean | Observable<boolean> | Promise<boolean> {
  return component.onExit ? component.onExit() : true;
}
