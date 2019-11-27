import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authentificationService.userDataSub().pipe(
      take(1),
      map((user) => {
        console.log('user',user)
        if (user) { return true };
        this.router.navigate(['/start']);
        return false;
      })
    )
  }

}
