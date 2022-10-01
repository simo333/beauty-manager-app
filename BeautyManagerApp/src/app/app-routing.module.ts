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

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'zaloguj', component: LoginComponent},
  {path: 'zarejestruj', component: RegisterComponent},
  {path: 'profil', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'admin', component: BoardAdminComponent, children: [
    {path: 'klienci', title: 'Klienci', component: ClientListComponent},
    {path: 'klient/:id', component: ClientDetailsComponent}
      ]},
  {path: 'o-nas', component: AboutComponent},
  {path: 'zabiegi', component: TreatmentsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
