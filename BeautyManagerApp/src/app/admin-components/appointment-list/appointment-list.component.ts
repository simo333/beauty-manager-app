import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../_services/appointments/appointment";
import {AppointmentService} from "../../_services/appointments/appointment.service";
import {Router} from "@angular/router";
import * as moment from "moment/moment";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointment: Appointment = new Appointment();
  appointments: Appointment[] = [];

  // Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  // Delete confirmation popover
  popoverTitle = 'Potwierdzenie';
  cancelClicked = false;


  constructor(private appointmentService: AppointmentService, private router: Router) {
    moment.locale('pl');
  }

  ngOnInit(): void {
    this.getAppointments();
  }


  //Get clients  with page number and page size params
  getAppointments(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.appointmentService.findAll(params).subscribe(response => {
      const {content, totalElements} = response;
      this.appointments = content;
      this.count = totalElements;
      console.log(response);
    });
  }

  routeToAppointmentDetails(id: number): void {
    this.router.navigate(["/admin/klient", id]);  //TODO refactor address
  }

  getAppointment(id: number): Appointment {
    this.appointmentService.findOne(id).subscribe(response => {
      this.appointment = response;
      console.log("Actual appointment ", this.appointment.id);
    });
    return this.appointment;
  }

  renewAppointment() {
    this.appointment = new Appointment();
  }

  deleteAppointmentById(id: number) {
    this.appointmentService.delete(id).subscribe({
      next: response => console.log(response),
      error: () => alert("Nie można usunąć tej wizyty."),
      complete: () => this.getAppointments()
    });
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
    this.getAppointments();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAppointments();
  }
}
