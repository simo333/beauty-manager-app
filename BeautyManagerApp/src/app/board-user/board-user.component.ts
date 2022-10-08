import {Component, OnInit} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {ClientService} from "../_services/client/client.service";
import {UserService} from "../_services/users/user.service";
import {User} from "../_services/users/user";
import {Visit} from "../_services/visits/visit";
import {VisitService} from "../_services/visits/visit.service";
import * as moment from "moment";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  isUser: boolean = false;
  user: User = new User();
  visits: Visit[] = [];

  // Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  constructor(private storage: StorageService,
              private clientService: ClientService,
              private userService: UserService,
              private visitService: VisitService) {
  }

  ngOnInit(): void {
    this.isUser = this.storage.isLoggedIn();
    this.userService.findOneByEmail(this.storage.getUser().email).subscribe(response => {
      this.user = response;
      this.getAllVisits();
    });
    moment.locale('pl');
  }

  getAllVisits() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.visitService.findAllByClient(this.user.client.id, params).subscribe(response => {
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
    this.getAllVisits();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllVisits();
  }

}
