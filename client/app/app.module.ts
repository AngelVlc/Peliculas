import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler  }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { LoginFormComponent } from './login/login-form.component';
import { DashboardFormComponent} from './dashboard/dashboard-form.component';
import { UsersListFormComponent } from './users/usersList/users-list-form.component';
import { UserFormComponent } from './users/userForm/user-form.component';

import { AuthUserGuard } from './_guards/auth.user-guard';
import { AuthAdminGuard } from './_guards/auth.admin-guard';

import { ErrorHandlerService } from './_services/error-handler.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService }  from './_services/user.service';

import { GenericErrorComponent } from './errors/generic-error.component';
import { Error401Component } from './errors/error-401.component';
import { Error401TokenExpiredComponent } from './errors/error-401-token-expired.component';

@NgModule({
  imports:      [BrowserModule
                  , FormsModule 
                  , HttpModule
                  , AppRoutingModule],
  declarations: [AppComponent
                  , LoginFormComponent
                  , DashboardFormComponent
                  , UsersListFormComponent
                  , UserFormComponent
                  , GenericErrorComponent
                  , Error401Component
                  , Error401TokenExpiredComponent],
  bootstrap:    [AppComponent],
  providers:    [ AuthUserGuard
                  , AuthAdminGuard
                  , ErrorHandlerService
                  , AuthenticationService
                  , UserService]
})
export class AppModule { }
