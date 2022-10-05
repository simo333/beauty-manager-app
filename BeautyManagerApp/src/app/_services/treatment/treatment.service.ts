import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Treatment} from "./treatment";
import {TreatmentCategory} from "../treatment-category/TreatmentCategory";

const baseUrl = 'http://localhost:8080/api/treatments';

@Injectable()
export class TreatmentService {

  // For TreatmentInfoComponent - which category is chosen
  category: TreatmentCategory = new TreatmentCategory();

  constructor(private http: HttpClient) {
  }

  public findAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
  }

  public findAllByCategory(categoryId: number, params: any): Observable<any> {
    return this.http.get<any>(baseUrl + `/category/${categoryId}`, {params});
  }

  public findOne(treatmentId: number): Observable<Treatment> {
    return this.http.get<Treatment>(baseUrl + `/${treatmentId}`);
  }

  public save(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(baseUrl, treatment);
  }

  public edit(treatment: Treatment): Observable<Treatment> {
    return this.http.put<Treatment>(baseUrl + `/${treatment.id}`, treatment);
  }

  public delete(treatmentId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + `/${treatmentId}`);
  }

}
