import {Component, OnInit} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {ClientService} from "../_services/client/client.service";
import {UserService} from "../_services/users/user.service";
import {User} from "../_services/users/user";
import {Appointment} from "../_services/appointments/appointment";
import {AppointmentService} from "../_services/appointments/appointment.service";
import * as moment from "moment";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  isUser: boolean = false;
  user: User = new User();
  visits: Appointment[] = [];

  // Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  constructor(private storage: StorageService,
              private clientService: ClientService,
              private userService: UserService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.isUser = this.storage.isLoggedIn();
    this.userService.findOneByEmail(this.storage.getUser().email).subscribe(response => {
      this.user = response;
      this.getAppointments();
    });
    moment.locale('pl');
  }

  getAppointments() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.appointmentService.findAllByClient(this.user.client.id, params).subscribe(response => {
      const {content, totalElements} = response;
      this.visits = content;
      this.count = totalElements;
      console.log(response);
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
