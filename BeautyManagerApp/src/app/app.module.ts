import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './admin-components/board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {HttpClientModule} from "@angular/common/http";

import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {AboutComponent} from './about/about.component';
import {TreatmentsComponent} from './treatments/treatments.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ClientService} from "./_services/client/client.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {ClientListComponent} from './admin-components/client-list/client-list.component';
import {ClientDetailsComponent} from './admin-components/client-details/client-details.component';
import {UserListComponent} from './admin-components/user-list/user-list.component';
import {UserService} from "./_services/users/user.service";
import {TreatmentsPanelComponent} from './admin-components/treatments-panel/treatments-panel.component';
import {TreatmentCategoryService} from "./_services/treatment-category/TreatmentCategory.service";
import {TreatmentService} from "./_services/treatment/treatment.service";
import {TreatmentDetailsComponent} from './admin-components/treatment-details/treatment-details.component';
import {TreatmentInfoComponent} from "./treatments/treatment-info/treatment-info.component";
import {AppointmentListComponent} from './admin-components/appointment-list/appointment-list.component';
import {AppointmentService} from "./_services/appointments/appointment.service";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {AppointmentAddComponent} from './admin-components/appointment-add/appointment-add.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgxDaterangepickerMd} from "ngx-datepicker-material";
import {MatInputModule} from "@angular/material/input";
import {ClientAddAppointmentComponent} from './client-add-appointment/client-add-appointment.component';


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
    UserListComponent,
    TreatmentsPanelComponent,
    TreatmentDetailsComponent,
    TreatmentInfoComponent,
    AppointmentListComponent,
    AppointmentAddComponent,
    ClientAddAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'}),
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    NgxDaterangepickerMd,
    MatInputModule,
  ],
  providers: [
    httpInterceptorProviders,
    ClientService,
    UserService,
    TreatmentCategoryService,
    TreatmentService,
    AppointmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
