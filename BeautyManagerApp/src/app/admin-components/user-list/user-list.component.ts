import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../_services/users/user";
import {Router} from "@angular/router";
import {UserService} from "../../_services/users/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  user: User = new User();
  actualUserId!: number;
  errorMessage: string = '';
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

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  //Get users with page number and page size params
  getAllUsers(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.userService.findAll(params).subscribe(response => {
      const {content, totalElements} = response;
      this.users = content;
      this.count = totalElements;
      console.log(response);
    });
  }

  routeToUserDetails(id: number): void {
    this.router.navigate(["/admin/uzytkownik", id]);
  }

  getUser(id: number): User {
    this.userService.findOne(id).subscribe(response => {
      this.user = response;
      console.log("Actual user ", this.user.email);
    });
    return this.user;
  }

  cleanUser() {
    this.user = new User();
  }

  setActualUserId(id: number) {
    this.actualUserId = id;
  }

  editUser() {
    this.userService.edit(this.user).subscribe(response => {
      console.log(response);
    })
    this.closeEMButton.nativeElement.click();
    this.reload();
  }

  patchUser() {
    this.user.id = this.actualUserId;
    this.userService.patch(this.user).subscribe(response => {
      console.log(response);
      this.closeEMButton.nativeElement.click();
      this.reload();
    })
  }

  deleteUserById(id: number) {
    this.userService.delete(id).subscribe();
    this.closeDMButton.nativeElement.click();
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
    this.getAllUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllUsers();
  }


  //To display roles names
  rolesNames(user: User): string {
    let userRoles = '';
    user.roles.forEach(role => {
      userRoles = userRoles.concat(role.name + ", ");
    });
    userRoles = userRoles.substring(0, userRoles.length - 2);
    return userRoles;
  }

}
