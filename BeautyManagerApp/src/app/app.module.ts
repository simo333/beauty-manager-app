import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './admin-components/board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {httpInterceptorProviders} from './_helpers/http.interceptor';
import { AboutComponent } from './about/about.component';
import { TreatmentsComponent } from './treatments/treatments.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ClientService} from "./_services/client/client.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import { ClientListComponent } from './admin-components/client-list/client-list.component';
import { ClientDetailsComponent } from './admin-components/client-details/client-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AboutComponent,
    TreatmentsComponent,
    ClientListComponent,
    ClientDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'})
  ],
  providers: [
    httpInterceptorProviders,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
