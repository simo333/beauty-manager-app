import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "./appointment";

const baseUrl = 'http://localhost:8080/api/appointments';

@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  public findAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
  }

  public findAllByClient(clientId: number, params: any): Observable<any> {
    return this.http.get<any>(baseUrl + `/client/${clientId}`, {params});
  }

  public findOne(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(baseUrl + `/${appointmentId}`);
  }

  public freeBusy(appointment: Appointment): Observable<any> {
    return this.http.post<any>(baseUrl + `/free-busy`, appointment);
  }

  public save(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(baseUrl, appointment);
  }

  public edit(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(baseUrl + `/${appointment.id}`, appointment);
  }

  public delete(appointmentId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + `/${appointmentId}`);
  }

}
