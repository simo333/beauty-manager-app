import {Component, OnInit, ViewChild} from '@angular/core';
import {Visit} from "../_services/visits/visit";
import {Treatment} from "../_services/treatment/treatment";
import {TreatmentCategory} from "../_services/treatment-category/TreatmentCategory";
import {Client} from "../_services/client/client";
import {Moment} from "moment";
import {VisitService} from "../_services/visits/visit.service";
import {Router} from "@angular/router";
import {TreatmentService} from "../_services/treatment/treatment.service";
import {TreatmentCategoryService} from "../_services/treatment-category/TreatmentCategory.service";
import * as moment from "moment/moment";
import {Duration} from "@js-joda/core";
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {StorageService} from "../_services/storage.service";
import {ClientService} from "../_services/client/client.service";
import {UserService} from "../_services/users/user.service";

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
  selectedDate!: { startDate: Moment };
  selectedTime!: string;
  isLoggedIn = false;
  errorMessage: string = '';

  constructor(private visitService: VisitService, private router: Router,
              private treatmentService: TreatmentService,
              private categoryService: TreatmentCategoryService,
              private storage: StorageService,
              private clientService: ClientService,
              private userService: UserService) {
    this.minDate = moment(Date.now()).add(1, 'day');
    this.maxDate = moment(Date.now()).add(50, 'day');
    moment.locale('pl');
  }

  ngOnInit(): void {
    moment.locale('pl');
    this.getCategories();
    this.visit.client = new Client();
    this.isLoggedIn = this.storage.isLoggedIn();
    this.setClientIfLoggedIn();
  }

  createVisit() {
    let year = this.selectedDate.startDate.year();
    let month = this.selectedDate.startDate.month();
    let day = this.selectedDate.startDate.date();
    let hour = Number(this.selectedTime.substring(0, 2));
    let minute = Number(this.selectedTime.substring(3));
    let date = new Date(year, month, day, hour, minute, 0);
    this.visit.dateTime = date;
    console.log(this.visit.dateTime);
    this.visitService.save(this.visit).subscribe(response => {
      console.log(response);
      this.openModal();
    }, error => {
      let nextFreeDate = moment(error.error.message).add(2, 'hour');
      console.log(nextFreeDate);
      this.errorMessage = "Termin zajęty. Następny wolny termin: " + nextFreeDate.format("LLLL");
    });
  }

  setClientIfLoggedIn() {
    if (this.isLoggedIn) {
      this.userService.findOneByEmail(this.storage.getUser().email).subscribe(response => {
        let loggedUser = response;
        this.visit.client = loggedUser.client;
      })

    }
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
    if (isNaN(Number(treatment.duration))) {
      time = Duration.parse(treatment.duration.toString());
    } else {
      time = Duration.ofMinutes(Number(treatment.duration));
    }
    return time.toMinutes();
  }

  invalidDates: Moment[] = []
  isInvalidDate = (m: moment.Moment): boolean => {
    // this.invalidDates.push(moment().add(3, 'days'))
    let saturday = new Date(2022, 10, 8);
    let sunday = new Date(2022, 10, 9);
    this.invalidDates.push(moment(saturday));
    this.invalidDates.push(moment(sunday));
    return this.invalidDates.some((d) => d.isSame(m.weekday()));
  };

  @ViewChild('openModalButton') openModalBtn!: any;

  openModal() {
    this.openModalBtn.nativeElement.click();
  }

  onModalClose() {
    this.router.navigate(['/home']);
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