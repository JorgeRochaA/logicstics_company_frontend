import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  login(data: FormData): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiUrl}/login`, data);
  }

  setUser(user: UserResponse): void {
    this.cookie.set('user', JSON.stringify(user), 1);
  }
}
