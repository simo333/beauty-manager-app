import { Component, OnInit } from '@angular/core';
import {Visit} from "../_services/visits/visit";
import {Treatment} from "../_services/treatment/treatment";
import {TreatmentCategory} from "../_services/treatment-category/TreatmentCategory";
import {Client} from "../_services/client/client";
import {Moment} from "moment";
import {VisitService} from "../_services/visits/visit.service";
import {Router} from "@angular/router";
import {TreatmentService} from "../_services/treatment/treatment.service";
import {TreatmentCategoryService} from "../_services/treatment-category/TreatmentCategory.service";
import {ClientService} from "../_services/client/client.service";
import * as moment from "moment/moment";
import {Duration} from "@js-joda/core";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";

@Component({
  selector: 'app-client-add-visit',
  templateUrl: './client-add-visit.component.html',
  styleUrls: ['./client-add-visit.component.css']
})
export class ClientAddVisitComponent implements OnInit {
  visit: Visit = new Visit();
  nextFreeDate = "";
  isBusy = false;

  treatments: Treatment[] = [];

  categories: TreatmentCategory[] = [];
  category!: TreatmentCategory;

  // DatePicker
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
    moment.locale('pl');
    this.getCategories();
    this.visit.client = new Client();
  }

  createVisit() {
    let year = this.selectedDate.startDate.year();
    let month = this.selectedDate.startDate.month();
    let day = this.selectedDate.startDate.date();
    let hour = Number(this.selectedTime.substring(0,2));
    let minute = Number(this.selectedTime.substring(3));
    let date = new Date(year, month, day, hour, minute, 0);
    this.visit.dateTime = date;
    this.visitService.save(this.visit).subscribe(response => {
      console.log(response);
    });
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

  reload() {
    window.location.reload();
  }

  categorySelectionChange() {
    this.getTreatmentsByCategory(this.category.id);
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
