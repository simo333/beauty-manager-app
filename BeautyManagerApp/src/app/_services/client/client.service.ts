import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Client} from "./client";

const baseUrl = 'http://localhost:8080/api/clients';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) {
  }

  public findAllPages(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
  }

  public findAll(): Observable<any> {
    return this.http.get<any>(baseUrl + "/all");
  }

  public findOne(clientId: number): Observable<Client> {
    return this.http.get<Client>(baseUrl + `/${clientId}`);
  }

  public save(client: Client): Observable<Client> {
    return this.http.post<Client>(baseUrl, client);
  }

  public edit(client: Client): Observable<Client> {
    return this.http.put<Client>(baseUrl + `/${client.id}`, client);
  }

  public delete(clientId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + `/${clientId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 400) {
      console.log('Error code 400', error.error);
    } else if(error.status === 404) {
      console.log('Error code 404', error.error);
    } else if(error.status === 500) {
      console.log('Error code 500', error.error);
    }
    return throwError(() => new Error('Error' + error.error));
  }
}
