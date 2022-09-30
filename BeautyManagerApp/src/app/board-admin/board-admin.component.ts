import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../_services/user.service";
import {ClientService} from "../_services/client/client.service";
import {Client} from "../_services/client/client";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  clients: Client[] = [];
  client: Client = new Client();
  actualClientId!: number;

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

  constructor(private userService: UserService, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        this.getAllClients();
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
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
    console.log("TODO: routeToClientDetails");
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

  setActualClientId(id: number) {
    this.actualClientId = id;
    this.client = this.getClient(id);
    console.log("Actual client id", this.actualClientId);
  }

  getClient(id: number): Client {
    this.clientService.findOne(id).subscribe(response => {
      this.client = response;
      console.log("Actual client ", this.client.fullName);
    });
    return this.client;
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

  deleteClient() {
    this.clientService.delete(this.actualClientId).subscribe();
    console.log("Client deleted.", "id: " + this.actualClientId);
    this.closeDMButton.nativeElement.click();
    this.reload();
  }

  deleteClientById(id: number) {
    this.clientService.delete(id).subscribe();
    console.log("Client deleted.", "id: " + this.client.id);
    this.closeDMButton.nativeElement.click();
    this.reload();
  }

  reload() {
    window.location.reload();
  }
}
