import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from "../../_services/client/client";
import {ClientService} from "../../_services/client/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  client: Client = new Client();

  //Pagination params
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5, 20];

  //Delete confirmation popover
  popoverTitle = 'Potwierdzenie';
  cancelClicked = false;

  //Close buttons for modals
  @ViewChild("closeCreateModalButton") closeCMButton: any;
  @ViewChild("closeDeleteModalButton") closeDMButton: any;
  @ViewChild("closeEditModalButton") closeEMButton: any;


  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  //Get clients  with page number and page size params
  getAllClients(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.clientService.findAll(params).subscribe(response => {
      const {content, totalElements} = response;
      this.clients = content;
      this.count = totalElements;
      console.log(response);
    });
  }

  routeToClientDetails(id: number): void {
    this.router.navigate(["/admin/klient", id]);
  }

  getClient(id: number): Client {
    this.clientService.findOne(id).subscribe(response => {
      this.client = response;
      console.log("Actual client ", this.client.fullName);
    });
    return this.client;
  }

  renewClient() {
    this.client = new Client();
  }

  createClient() {
    this.clientService.save(this.client).subscribe(response => {
      console.log(response);
    });
    this.closeCMButton.nativeElement.click();
    this.reload();
  }

  editClient() {
    this.clientService.edit(this.client).subscribe(response => {
      console.log(response);
    })
    this.closeEMButton.nativeElement.click();
    this.reload();
  }

  deleteClientById(id: number) {
    this.clientService.delete(id).subscribe();
    this.reload();
  }

  reload() {
    window.location.reload();
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
    this.getAllClients();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllClients();
  }

}
