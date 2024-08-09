import { CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

export const authGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('userId') === null || cookieService.get('userId') === undefined || cookieService.get('userId') === '') {
    router.navigate(['/login'],{replaceUrl : true});
    return false
  }


  return true;
};


