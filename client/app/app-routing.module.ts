import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { DashboardFormComponent} from './dashboard/dashboard-form.component';
import { UsersListFormComponent } from './usersList/users-list-form.component';

import { GenericErrorComponent } from './errors/generic-error.component';
import { Error401Component } from './errors/error-401.component';
import { Error401TokenExpiredComponent } from './errors/error-401-token-expired.component';


import { AuthUserGuard } from './_guards/auth.user-guard';
import { AuthAdminGuard } from './_guards/auth.admin-guard';


const routes: Routes = [
  { path: 'login',  component: LoginFormComponent }
   , { path: 'usersList', component: UsersListFormComponent, canActivate: [AuthAdminGuard] }
   , { path: 'genericError', component: GenericErrorComponent }   
   , { path: 'error401', component: Error401Component }   
   , { path: 'error401TokenExpired', component: Error401TokenExpiredComponent }   
   , { path: '', component: DashboardFormComponent, canActivate: [AuthUserGuard] }
    // otherwise redirect to home
   , { path: '**', redirectTo: '' }
  , 
];

export const AppRoutingModule = RouterModule.forRoot(routes);