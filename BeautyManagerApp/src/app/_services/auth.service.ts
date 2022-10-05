import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private storage: StorageService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(email: string, password: string, firstName: string, lastName: string, phoneNumber: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    this.storage.clean();
    this.redirectToLoginPage();
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }

  refreshToken() {
    return this.http.post(AUTH_API + 'refresh-token', { }, httpOptions);
  }

  redirectToLoginPage() {
    this.router.navigate(["/logowanie", {"expired": true}]).then(() => {
      window.location.assign("logowanie:expired=true");
      window.location.reload();
    });
  }
}
