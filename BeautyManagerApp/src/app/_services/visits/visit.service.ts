import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Visit} from "./visit";

const baseUrl = 'http://localhost:8080/api/visits';

@Injectable()
export class TreatmentService {

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
