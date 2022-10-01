import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./client";

const baseUrl = 'http://localhost:8080/api/clients';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) {
  }

  public findAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
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
}
