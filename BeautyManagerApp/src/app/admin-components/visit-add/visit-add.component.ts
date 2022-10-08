import { Component, OnInit } from '@angular/core';
import {Treatment} from "../../_services/treatment/treatment";
import {TreatmentCategory} from "../../_services/treatment-category/TreatmentCategory";
import {NgbCalendar, NgbDateStruct, NgbTimepickerConfig, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Time} from "@angular/common";
import {Visit} from "../../_services/visits/visit";
import {VisitService} from "../../_services/visits/visit.service";

import {TreatmentService} from "../../_services/treatment/treatment.service";
import {TreatmentCategoryService} from "../../_services/treatment-category/TreatmentCategory.service";
import {Router} from "@angular/router";
import {Moment} from "moment";
import {ALL} from "dns";
import {formats} from "@angular-devkit/schematics";
import * as moment from "moment";
import {Duration, LocalDate} from "@js-joda/core";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {ClientService} from "../../_services/client/client.service";
import {Client} from "../../_services/client/client";

@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css']
})
export class VisitAddComponent implements OnInit {
  visit: Visit = new Visit();
  nextFreeDate = "";
  isBusy = false;

  treatments: Treatment[] = [];

  categories: TreatmentCategory[] = [];
  category!: TreatmentCategory;

  clients: Client[] = [];
  client!: Client;

  // DatePicker
  dateStruct!: NgbDateStruct;
  date!: { year: number, month: number };
  minDate: Moment;
  maxDate: Moment;
  selectedDate!: {startDate: Moment};
  selectedTime!: string;

  constructor(private visitService: VisitService, private router: Router,
              private treatmentService: TreatmentService,
              private categoryService: TreatmentCategoryService,
              private clientService: ClientService) {
    this.minDate = moment(Date.now()).add(1, 'day');
    this.maxDate = moment(Date.now()).add(50, 'day');
    moment.locale('pl');
  }

  ngOnInit(): void {
    this.getClients()
    this.getCategories();
  }

  createVisit() {
    this.visitService.save(this.visit).subscribe(response => {
      console.log(response);
    });
  }

  checkFreeBusy(visit: Visit) {
    this.visitService.freeBusy(visit).subscribe(response => {
      const {busy, nextFreeDate} = response;
      this.isBusy = busy;
      this.nextFreeDate = nextFreeDate;
      console.log(this.isBusy);
      console.log(this.nextFreeDate);
    });
  }

  show() {  //TODO delete
    let year = this.selectedDate.startDate.year();
    let month = this.selectedDate.startDate.month();
    let day = this.selectedDate.startDate.date();
    let hour = Number(this.selectedTime.substring(0,2));
    let minute = Number(this.selectedTime.substring(3));
    let date = new Date(year, month, day, hour, minute, 0);
    this.visit.dateTime = date;
    console.log(this.visit);
    console.log("Selected date", this.selectedDate.startDate.format("DD-MM-YYYY"));
    console.log("Selected time", this.selectedTime);
  }

  // Treatments
  getTreatmentsByCategory(categoryId: number): void {
    this.treatmentService.findAllByCategory(categoryId).subscribe(response => {
      this.treatments = response;
      console.log("Treatment service", response);
    });
  }

  // Categories
  getCategories(): void {
    this.categoryService.findAll().subscribe(response => {
      this.categories = response;
      console.log("Category service", response);
    });
  }

  // Clients
  getClients(): void {
    this.clientService.findAll().subscribe(response => {
      this.clients = response;
      console.log("Client service", response);
    });
  }

  reload() {
    window.location.reload();
  }

  categorySelectionChange() {
    this.getTreatmentsByCategory(this.category.id);
    console.log("found treatments", this.treatments)
  }

  durationToMinutes(treatment: Treatment) {
    let time;
    if(isNaN(Number(treatment.duration))) {
      time =  Duration.parse(treatment.duration.toString());
    } else {
      time = Duration.ofMinutes(Number(treatment.duration));
    }
    return time.toMinutes();
  }

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
}
