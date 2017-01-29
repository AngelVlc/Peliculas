import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { DashboardFormComponent} from './dashboard/dashboard-form.component';
import { UsersListFormComponent } from './users/usersList/users-list-form.component';
import { UserFormComponent } from './users/userForm/user-form.component';
import { MasterListComponent } from './masters/mastersList/masters-list.component';
import { MasterFormComponent } from './masters/masterForm/master-form.component';
import { FilmFormComponent } from  './films/filmForm/film-form.component';

import { GenericErrorComponent } from './errors/generic-error.component';
import { Error401Component } from './errors/error-401.component';
import { Error401TokenExpiredComponent } from './errors/error-401-token-expired.component';


import { AuthUserGuard } from './_guards/auth.user-guard';
import { AuthAdminGuard } from './_guards/auth.admin-guard';


const routes: Routes = [
  { path: 'login',  component: LoginFormComponent }
   , { path: 'usersList', component: UsersListFormComponent, canActivate: [AuthAdminGuard] }
   , { path: 'user/:id', component: UserFormComponent, canActivate: [AuthAdminGuard] }
   , { path: 'types', component: MasterListComponent, data: [{masterType: "0"}]}
   , { path: 'locs', component: MasterListComponent, data: [{masterType: "1"}]}
   , { path: 'type/:id', component: MasterFormComponent, data: [{masterType: "0"}], canActivate: [AuthAdminGuard] }
   , { path: 'loc/:id', component: MasterFormComponent, data: [{masterType: "1"}], canActivate: [AuthAdminGuard] }
   , { path: 'film/:id', component: FilmFormComponent, canActivate: [AuthAdminGuard]}
   , { path: 'genericError', component: GenericErrorComponent }   
   , { path: 'error401', component: Error401Component }   
   , { path: 'error401TokenExpired', component: Error401TokenExpiredComponent }   
   , { path: '', component: DashboardFormComponent, canActivate: [AuthUserGuard] }
    // otherwise redirect to home
   , { path: '**', redirectTo: '' }
  , 
];
 
export const AppRoutingModule = RouterModule.forRoot(routes);