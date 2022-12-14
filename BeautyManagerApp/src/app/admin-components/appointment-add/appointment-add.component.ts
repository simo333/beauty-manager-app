import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {
  appointment: Appointment = new Appointment();
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

  @ViewChild("f") form!: NgForm;
  @ViewChild('openModalButton') openModalBtn!: ElementRef;

  constructor(private appointmentService: AppointmentService, private router: Router,
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

  createAppointment() {
    let year = this.selectedDate.startDate.year();
    let month = this.selectedDate.startDate.month();
    let day = this.selectedDate.startDate.date();
    let hour = Number(this.selectedTime.substring(0, 2));
    let minute = Number(this.selectedTime.substring(3));
    let date = new Date(year, month, day, hour, minute, 0);
    this.appointment.dateTime = date;

    this.appointmentService.save(this.appointment).subscribe({
      next: response => {
        this.openModal();
        console.log(response);
      },
      error: error => {
        if (error.error.message === null) {
          this.errorMessage = "Brak wolnych termin??w o podanej godzinie.";
        } else {
          let nextFreeDate = moment(error.error.message);
          this.errorMessage = "Termin zaj??ty. Nast??pny wolny termin: " + nextFreeDate.format("LLLL");
        }
      }
    });
  }

  checkFreeBusy(appointment: Appointment) {
    this.appointmentService.freeBusy(appointment).subscribe(response => {
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
      this.appointment.treatment = this.treatments[0];
    });
  }

  // Categories
  getCategories(): void {
    this.categoryService.findAll().subscribe(response => {
      this.categories = response;
    });
  }

  // Clients
  getClients(): void {
    this.clientService.findAll().subscribe(response => {
      this.clients = response;
    });
  }

  resetData() {
    this.errorMessage = '';
    this.form.resetForm();
  }

  categorySelectionChange() {
    if (this.category) {
      this.getTreatmentsByCategory(this.category.id);
    }
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
