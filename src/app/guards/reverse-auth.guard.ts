import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

export const reverseAuthGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('userId') === null || cookieService.get('userId') === undefined || cookieService.get('userId') === '') {
    return true
  }

  router.navigate(['/home'],{replaceUrl : true});
  return false;
};
