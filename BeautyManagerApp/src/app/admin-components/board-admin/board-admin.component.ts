import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private storage: StorageService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.storage.isLoggedIn();
  }

}
