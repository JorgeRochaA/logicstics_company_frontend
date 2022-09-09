import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userExist = this.cookie.check('user');

    if (userExist) {
      const { access_token } = JSON.parse(this.cookie.get('user'));
      if (access_token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        return next.handle(request);
      }
    }

    return next.handle(request);
  }
}
