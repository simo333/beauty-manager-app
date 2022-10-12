import {Component, OnInit, ViewChild} from '@angular/core';
import {Treatment} from "../../_services/treatment/treatment";
import {TreatmentCategory} from "../../_services/treatment-category/TreatmentCategory";
import {Appointment} from "../../_services/appointments/appointment";
import {AppointmentService} from "../../_services/appointments/appointment.service";

import {TreatmentService} from "../../_services/treatment/treatment.service";
import {TreatmentCategoryService} from "../../_services/treatment-category/TreatmentCategory.service";
import {Router} from "@angular/router";
import * as moment from "moment";
import {Moment} from "moment";
import {Duration} from "@js-joda/core";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {ClientService} from "../../_services/client/client.service";
import {Client} from "../../_services/client/client";

@Component({
  selector: 'app-visit-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {
  visit: Appointment = new Appointment();
  nextFreeDate = "";
  isBusy = false;

  treatments: Treatment[] = [];

  categories: TreatmentCategory[] = [];
  category!: TreatmentCategory;

  clients: Client[] = [];
  client!: Client;

  // DatePicker
  date!: { year: number, month: number };
  minDate: Moment;
  maxDate: Moment;
  selectedDate!: { startDate: Moment };
  selectedTime!: string;
  errorMessage: string = '';

  constructor(private visitService: AppointmentService, private router: Router,
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
    let year = this.selectedDate.startDate.year();
    let month = this.selectedDate.startDate.month();
    let day = this.selectedDate.startDate.date();
    let hour = Number(this.selectedTime.substring(0, 2));
    let minute = Number(this.selectedTime.substring(3));
    let date = new Date(year, month, day, hour, minute, 0);
    this.visit.dateTime = date;
    this.visitService.save(this.visit).subscribe(response => {
      this.openModal();
      console.log(response);
    }, error => {
      let nextFreeDate = moment(error.error.message).add(2, 'hour');
      console.log(nextFreeDate);
      this.errorMessage = "Termin zajęty. Następny wolny termin: " + nextFreeDate.format("LLLL");
    });
  }

  checkFreeBusy(visit: Appointment) {
    this.visitService.freeBusy(visit).subscribe(response => {
      const {busy, nextFreeDate} = response;
      this.isBusy = busy;
      this.nextFreeDate = nextFreeDate;
      console.log(this.isBusy);
      console.log(this.nextFreeDate);
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
    if (isNaN(Number(treatment.duration))) {
      time = Duration.parse(treatment.duration.toString());
    } else {
      time = Duration.ofMinutes(Number(treatment.duration));
    }
    return time.toMinutes();
  }

  @ViewChild('openModalButton') openModalBtn!: any;

  openModal() {
    this.openModalBtn.nativeElement.click();
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
