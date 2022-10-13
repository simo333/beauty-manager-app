import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TreatmentCategory} from "../../_services/treatment-category/TreatmentCategory";
import {TreatmentCategoryService} from "../../_services/treatment-category/TreatmentCategory.service";
import {TreatmentService} from "../../_services/treatment/treatment.service";
import {Treatment} from "../../_services/treatment/treatment";
import {Duration} from "@js-joda/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-treatments-panel',
  templateUrl: './treatments-panel.component.html',
  styleUrls: ['./treatments-panel.component.css']
})
export class TreatmentsPanelComponent implements OnInit {

  categories: TreatmentCategory[] = [];
  allCategories: TreatmentCategory[] = [];
  category: TreatmentCategory = new TreatmentCategory();
  treatments: Treatment[] = [];
  treatment: Treatment = new Treatment();

  // Pagination params
  // for list of categories
  pageCategory = 1;
  countCategory = 0;
  pageSizeCategory = 10;
  // for list of treatments
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  // Delete confirmation popover
  popoverTitle = 'Potwierdzenie';
  cancelClicked = false;

  errorMessage: string = "";

  // Close buttons for modals
  // For categories
  @ViewChild("closeCreateModalButton") closeCMButton!: ElementRef;
  @ViewChild("closeEditModalButton") closeEMButton!: ElementRef;
  @ViewChild("formCC") categoryForm!: NgForm;
  // For treatments
  @ViewChild("closeCMTreatmentButton") closeCMTreatmentButton!: ElementRef;
  @ViewChild("closeEMTreatmentButton") closeEMTreatmentButton!: ElementRef;
  @ViewChild("formCT") treatmentForm!: NgForm;

  constructor(private categoryService: TreatmentCategoryService,
              private treatmentService: TreatmentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllTreatments();
    this.getAllCategoriesInPages();
    this.getAllCategories();
  }

  /* Treatments */

  //Get treatments  with page number and page size params
  getAllTreatments(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.treatmentService.findAll(params).subscribe(response => {
      const {content, totalElements} = response;
      this.treatments = content;
      this.count = totalElements;
      console.log(response);
    });
  }

  routeToTreatmentDetails(id: number): void {
    this.router.navigate(["/admin/zabieg/", id]);
  }

  getTreatment(id: number): Treatment {
    this.treatmentService.findOne(id).subscribe(response => {
      this.treatment = response;
      console.log("Actual treatment ", this.treatment.name);
    });
    return this.treatment;
  }

  renewTreatment() {
    this.treatmentForm.resetForm();
    this.treatment = new Treatment();
    this.errorMessage = "";
  }

  createTreatment() {
    this.treatmentService.save(this.treatment).subscribe({
      next: response => console.log(response),
      error: () => this.errorMessage = "Ta nazwa jest już zajęta.",
      complete: () => {
        this.getAllTreatments();
        this.closeCMTreatmentButton.nativeElement.click();
      }
    });
  }

  editTreatment() {
    this.treatmentService.edit(this.treatment).subscribe({
      next: response => console.log(response),
      error: () => this.errorMessage = "Ta nazwa jest już zajęta.",
      complete: () => {
        this.getAllTreatments();
        this.closeEMTreatmentButton.nativeElement.click();
      }
    });
  }

  deleteTreatmentById(id: number) {
    this.treatmentService.delete(id).subscribe({
      next: response => console.log(response),
      error: () => alert("Nie można usunąć tego zabiegu."),
      complete: () => this.getAllTreatments()
    });
  }

  /* Treatment Categories */

  //Get categories  with page number and page size params
  getAllCategoriesInPages(): void {
    const params = this.getRequestParams(this.pageCategory, this.pageSizeCategory);

    this.categoryService.findAllInPages(params).subscribe(response => {
      const {content, totalElements} = response;
      this.categories = content;
      this.countCategory = totalElements;
      console.log(response);
    });
  }

  //Get all categories
  getAllCategories(): void {
    this.categoryService.findAll().subscribe(response => {
      this.allCategories = response;
      console.log(response);
    });
  }

  getCategory(id: number): TreatmentCategory {
    this.categoryService.findOne(id).subscribe(response => {
      this.category = response;
      console.log("Actual category ", this.category.name);
    });
    return this.category;
  }

  renewCategory() {
    this.categoryForm.resetForm();
    this.category = new TreatmentCategory();
    this.errorMessage = "";
  }

  createCategory() {
    this.categoryService.save(this.category).subscribe({
      next: response => console.log(response),
      error: () => this.errorMessage = "Ta nazwa jest już zajęta.",
      complete: () => {
        this.getAllCategoriesInPages();
        this.closeCMButton.nativeElement.click();
      }
    });

  }

  editCategory() {
    this.categoryService.edit(this.category).subscribe({
      next: response => console.log(response),
      error: () => this.errorMessage = "Ta nazwa jest już zajęta.",
      complete: () => {
        this.getAllCategoriesInPages();
        this.closeEMButton.nativeElement.click();
      }
    });
  }

  deleteCategoryById(id: number) {
    this.categoryService.delete(id).subscribe({
      next: response => console.log(response),
      error: () => alert("Nie można usunąć tej kategorii."),
      complete: () => this.getAllCategoriesInPages()
    });
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

  // For Categories
  handlePageChange(event: number): void {
    this.pageCategory = event;
    this.getAllCategoriesInPages();
  }

  handlePageSizeChange(event: any): void {
    this.pageSizeCategory = event.target.value;
    this.pageCategory = 1;
    this.getAllCategoriesInPages();
  }

  // For treatments
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
}
