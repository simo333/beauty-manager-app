import {Component, OnInit} from '@angular/core';
import {Client} from "../../_services/client/client";
import {ClientService} from "../../_services/client/client.service";
import {ActivatedRoute} from "@angular/router";
import {Appointment} from "../../_services/appointments/appointment";
import * as moment from "moment/moment";
import {AppointmentService} from "../../_services/appointments/appointment.service";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client = new Client();
  appointments: Appointment[] = [];

  // Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  constructor(private clientService: ClientService,
              private activeRoute: ActivatedRoute,
              private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    moment.locale('pl');
    this.activeRoute.paramMap.subscribe(params => {
      let clientId = params.get("id");
      if (!isNaN(Number(clientId))) {
        this.clientService.findOne(Number(clientId)).subscribe(data => {
          this.client = data
          this.getAppointments();
        });
      } else {
        console.log('Not a Number');
      }
    });
  }

  getAppointments() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.appointmentService.findAllByClient(this.client.id, params).subscribe(response => {
      const {content, totalElements} = response;
      this.appointments = content;
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
