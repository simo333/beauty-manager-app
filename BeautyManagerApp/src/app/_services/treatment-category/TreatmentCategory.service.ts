import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TreatmentCategory} from "./TreatmentCategory";

const baseUrl = 'http://localhost:8080/api/categories';

@Injectable()
export class TreatmentCategoryService {

  constructor(private http: HttpClient) {
  }

  public findAllInPages(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, {params});
  }

  public findAll(): Observable<any> {
    return this.http.get<any>(baseUrl + "/all");
  }

  public findOne(categoryId: number): Observable<TreatmentCategory> {
    return this.http.get<TreatmentCategory>(baseUrl + `/${categoryId}`);
  }

  public save(category: TreatmentCategory): Observable<TreatmentCategory> {
    return this.http.post<TreatmentCategory>(baseUrl, category);
  }

  public edit(category: TreatmentCategory): Observable<TreatmentCategory> {
    return this.http.put<TreatmentCategory>(baseUrl + `/${category.id}`, category);
  }

  public delete(categoryId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + `/${categoryId}`);
  }

}
