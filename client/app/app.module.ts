import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { LoginFormComponent } from './login/login-form.component';
import { DashboardFormComponent} from './dashboard/dashboard-form.component';
import { UsersListFormComponent } from './usersList/users-list-form.component';

import { AuthUserGuard } from './_guards/auth.user-guard';
import { AuthAdminGuard } from './_guards/auth.admin-guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService }  from './_services/user.service';


@NgModule({
  imports:      [BrowserModule
                  , FormsModule 
                  , HttpModule
                  , AppRoutingModule],
  declarations: [AppComponent
                  , LoginFormComponent
                  , DashboardFormComponent
                  , UsersListFormComponent],
  bootstrap:    [AppComponent],
  providers:    [AuthUserGuard
                  , AuthAdminGuard
                  , AuthenticationService
                  , UserService]
})
export class AppModule { }
