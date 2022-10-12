import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {BoardUserComponent} from "./board-user/board-user.component";
import {BoardAdminComponent} from "./admin-components/board-admin/board-admin.component";
import {AboutComponent} from "./about/about.component";
import {TreatmentsComponent} from "./treatments/treatments.component";
import {ClientListComponent} from "./admin-components/client-list/client-list.component";
import {ClientDetailsComponent} from "./admin-components/client-details/client-details.component";
import {UserListComponent} from "./admin-components/user-list/user-list.component";
import {TreatmentsPanelComponent} from "./admin-components/treatments-panel/treatments-panel.component";
import {TreatmentDetailsComponent} from "./admin-components/treatment-details/treatment-details.component";
import {TreatmentInfoComponent} from "./treatments/treatment-info/treatment-info.component";
import {AppointmentListComponent} from "./admin-components/appointment-list/appointment-list.component";
import {AppointmentAddComponent} from "./admin-components/appointment-add/appointment-add.component";
import {ClientAddAppointmentComponent} from "./client-add-appointment/client-add-appointment.component";

const appTitle = 'BeautyManagerApp';

const routes: Routes = [
  {path: 'home', title: `${appTitle}`, component: HomeComponent},
  {path: 'logowanie', title: `Logowanie - ${appTitle}`, component: LoginComponent},
  {path: 'logowanie/expired', title: `Logowanie - ${appTitle}`, component: LoginComponent},
  {path: 'rejestracja', title: `Rejestracja - ${appTitle}`, component: RegisterComponent},
  {path: 'profil', title: `Profil - ${appTitle}`, component: ProfileComponent},
  {path: 'user', title: `Panel użytkownika - ${appTitle}`, component: BoardUserComponent},
  {
    path: 'admin', title: `Panel admina - ${appTitle}`, component: BoardAdminComponent, children: [
      {path: 'wizyty', title: `Wiztyty - ${appTitle}`, component: AppointmentListComponent},
      {path: 'wizyty/dodaj', title: `Dodaj wizytę - ${appTitle}`, component: AppointmentAddComponent},
      {path: 'klienci', title: `Klienci - ${appTitle}`, component: ClientListComponent},
      {path: 'klient/:id', title: `Klient - ${appTitle}`, component: ClientDetailsComponent},
      {path: 'uzytkownicy', title: `Użytkownicy - ${appTitle}`, component: UserListComponent},
      {path: 'uzytkownik/:id', title: `Użytkownik - ${appTitle}`, component: ClientDetailsComponent}, //TODO CHANGE COMPONENT OR RESIGN USER DETAILS
      {path: 'zabiegi', title: `Zabiegi - ${appTitle}`, component: TreatmentsPanelComponent},
      {path: 'zabieg/:id', title: `Zabieg - ${appTitle}`, component: TreatmentDetailsComponent},
    ]
  },
  {path: 'o-nas', title: `O nas - ${appTitle}`, component: AboutComponent},
  {path: 'zabiegi', title: `Zabiegi - ${appTitle}`, component: TreatmentsComponent},
  {path: 'zabiegi/:id', title: `Zabieg - ${appTitle}`, component: TreatmentInfoComponent},
  {path: 'zamow-wizyte', title: `Zamów wizytę - ${appTitle}`, component: ClientAddAppointmentComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
