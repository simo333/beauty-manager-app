import {Component, OnInit} from '@angular/core';
import {TreatmentService} from "../_services/treatment/treatment.service";
import {Treatment} from "../_services/treatment/treatment";
import {Duration} from "@js-joda/core";
import {TreatmentCategory} from "../_services/treatment-category/TreatmentCategory";
import {TreatmentCategoryService} from "../_services/treatment-category/TreatmentCategory.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

  treatments: Treatment[] = [];
  categories: TreatmentCategory[] = [];
  categoryVal: TreatmentCategory = this.treatmentService.category;

  // Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  constructor(private treatmentService: TreatmentService,
              private categoryService: TreatmentCategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllTreatments();
    this.getAllCategories();
  }

  //Get treatments  with page number and page size params
  getAllTreatments(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    if (this.categoryVal.name === undefined) {
      this.treatmentService.findAll(params).subscribe(response => {
        const {content, totalElements} = response;
        this.treatments = content;
        this.count = totalElements;
        console.log("All categories", this.treatments);
      });
    } else {
      this.treatmentService.findPageByCategory(this.categoryVal.id, params).subscribe(response => {
        const {content, totalElements} = response;
        this.treatments = content;
        this.count = totalElements;
        console.log(this.categoryVal.name, response);
      });
    }
  }

  routeToTreatmentDetails(id: number) {
    this.router.navigate(["zabiegi/", id]);
  }

  //Get all categories
  getAllCategories(): void {
    this.categoryService.findAll().subscribe(response => this.categories = response);
  }

  // Pagination
  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params['page'] = page - 1;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }
    return params;
  }

  handleTreatmentPageChange(event: number): void {
    this.page = event;
    this.getAllTreatments();
  }

  handleTreatmentPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllTreatments();
  }

  durationToMinutes(treatment: Treatment) {
    let time;
    if (isNaN(Number(treatment.duration))) {
      time = Duration.parse(treatment.duration.toString());
    } else {
      time = Duration.ofMinutes(Number(treatment.duration));
    }
    return time.toMinutes();
  }

  selectionChange() {
    this.page = 1;
    this.treatmentService.category = this.categoryVal;
    this.getAllTreatments();
  }

}
