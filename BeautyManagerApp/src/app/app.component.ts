import { Component } from '@angular/core';
import {AuthService} from "./_services/auth.service";
import {StorageService} from "./_services/storage.service";
import {Subscription} from "rxjs";
import {EventBusService} from "./_shared/EventBusService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Beauty & SPA';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  email?: string;

  eventBusSub?: Subscription;

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.email = user.email;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
    this.storageService.clean();
    console.log("Storages cleaned. User signed out.");
  }
}
