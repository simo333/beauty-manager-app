import {Component, OnInit} from '@angular/core';
import {Visit} from "../../_services/visits/visit";
import {VisitService} from "../../_services/visits/visit.service";
import {Router} from "@angular/router";
import * as moment from "moment/moment";

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {
  visit: Visit = new Visit();
  visits: Visit[] = [];

  // Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  // Delete confirmation popover
  popoverTitle = 'Potwierdzenie';
  cancelClicked = false;


  constructor(private visitService: VisitService, private router: Router) {
    moment.locale('pl');
  }

  ngOnInit(): void {
    this.getAllVisits();
  }


  //Get clients  with page number and page size params
  getAllVisits(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.visitService.findAll(params).subscribe(response => {
      const {content, totalElements} = response;
      this.visits = content;
      this.count = totalElements;
      console.log(response);
    });
  }

  routeToVisitDetails(id: number): void {
    this.router.navigate(["/admin/klient", id]);  //TODO refactor address
  }

  getVisit(id: number): Visit {
    this.visitService.findOne(id).subscribe(response => {
      this.visit = response;
      console.log("Actual visit ", this.visit.id);
    });
    return this.visit;
  }

  renewVisit() {
    this.visit = new Visit();
  }

  deleteVisitById(id: number) {
    this.visitService.delete(id).subscribe();
    this.reload();
  }

  reload() {
    window.location.reload();
  }

  formatDate(date: Date) {
    return moment(date).format('LLLL');
  }

  //Pagination
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

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllVisits();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllVisits();
  }
}
