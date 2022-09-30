import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./client";

const clientUrl = 'http://localhost:8080/api/clients';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) {
  }

  public findAll(params: any): Observable<any> {
    return this.http.get<any>(clientUrl, {params});
  }

  public findOne(clientId: number): Observable<Client> {
    return this.http.get<Client>(clientUrl + `/${clientId}`);
  }

  public save(client: Client): Observable<Client> {
    return this.http.post<Client>(clientUrl, client);
  }

  public edit(client: Client): Observable<Client> {
    return this.http.put<Client>(clientUrl + `/${client.id}`, client);
  }

  public delete(clientId: number): Observable<void> {
    return this.http.delete<void>(clientUrl + `/${clientId}`);
  }
}
