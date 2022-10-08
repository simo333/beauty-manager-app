import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

const baseUrl = 'http://localhost:8080/api/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public findAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
  }

  public findOne(userId: number): Observable<User> {
    return this.http.get<User>(baseUrl + `/${userId}`);
  }

  public findOneByEmail(email: string): Observable<User> {
    return this.http.get<User>(baseUrl + `/email/${email}`);
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(baseUrl, user);
  }

  public edit(user: User): Observable<User> {
    return this.http.put<User>(baseUrl + `/${user.id}`, user);
  }

  public patch(user: User): Observable<User> {
    return this.http.patch<User>(baseUrl + `/${user.id}`, user);
  }

  public delete(userId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + `/${userId}`);
  }
}
