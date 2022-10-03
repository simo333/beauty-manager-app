import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:8080/api/treatments';

@Injectable()
export class TreatmentService {

  constructor(private http: HttpClient) {
  }

}
