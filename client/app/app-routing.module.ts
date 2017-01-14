import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { DashboardFormComponent} from './dashboard/dashboard-form.component';
import { UsersListFormComponent } from './usersList/users-list-form.component';

import { AuthUserGuard } from './_guards/auth.user-guard';
import { AuthAdminGuard } from './_guards/auth.admin-guard';


const routes: Routes = [
  { path: 'login',  component: LoginFormComponent }
   , { path: 'usersList', component: UsersListFormComponent, canActivate: [AuthAdminGuard] }   
   , { path: '', component: DashboardFormComponent, canActivate: [AuthUserGuard] }
    // otherwise redirect to home
   , { path: '**', redirectTo: '' }
  , 
];

export const AppRoutingModule = RouterModule.forRoot(routes);