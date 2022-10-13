import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Client} from "../../_services/client/client";
import {ClientService} from "../../_services/client/client.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


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
  @ViewChild("closeCreateModalButton") closeCMButton!: ElementRef;
  @ViewChild("closeEditModalButton") closeEMButton!: ElementRef
  @ViewChild("f") form!: NgForm;


  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  //Get clients  with page number and page size params
  getAllClients(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.clientService.findAllPages(params).subscribe({
      next: response => {
        const {content, totalElements} = response;
        this.clients = content;
        this.count = totalElements;
        console.log(response);
      }, error: error => console.log(error)
    });
  }

  routeToClientDetails(id: number): void {
    this.router.navigate(["/admin/klient", id]);
  }

  getClient(id: number): void {
    this.clientService.findOne(id).subscribe({
      next: response => this.client = response,
      error: error => console.log(error),
      complete: () => console.log("Actual client ", this.client.fullName)
    });
  }

  renewClient() {
    this.client = new Client();
  }

  createClient() {
    this.clientService.save(this.client).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => {
        this.getAllClients();
        this.form.resetForm();
        this.closeCMButton.nativeElement.click();
      }
    });
  }

  editClient() {
    this.clientService.edit(this.client).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => {
        this.getAllClients();
        this.closeEMButton.nativeElement.click();
      }
    });
  }

  deleteClientById(id: number) {
    this.clientService.delete(id).subscribe({
      next: response => console.log(response),
      error: () => alert("Nie można usunąć tego klienta."),
      complete: () => this.getAllClients()
    });
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
