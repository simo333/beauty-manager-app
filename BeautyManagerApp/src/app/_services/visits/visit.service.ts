import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Visit} from "./visit";
import {catchError} from "rxjs/operators";

const baseUrl = 'http://localhost:8080/api/visits';

@Injectable()
export class VisitService {

  constructor(private http: HttpClient) {
  }

  public findAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
  }

  public findAllByClient(clientId: number, params: any): Observable<any> {
    return this.http.get<any>(baseUrl + `/client/${clientId}`, {params});
  }

  public findOne(visitId: number): Observable<Visit> {
    return this.http.get<Visit>(baseUrl + `/${visitId}`);
  }

  public freeBusy(visit: Visit): Observable<any> {
    return this.http.post<any>(baseUrl + `/free-busy`, visit);
  }

  public save(visit: Visit): Observable<Visit> {
    return this.http.post<Visit>(baseUrl, visit);
  }

  public edit(visit: Visit): Observable<Visit> {
    return this.http.put<Visit>(baseUrl + `/${visit.id}`, visit);
  }

  public delete(visitId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + `/${visitId}`);
  }

}
