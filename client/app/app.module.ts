import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler  }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { ConfirmationPopoverModule}  from 'angular-confirmation-popover';

import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { LoginFormComponent } from './login/login-form.component';
import { DashboardFormComponent} from './dashboard/dashboard-form.component';
import { UsersListFormComponent } from './users/usersList/users-list-form.component';
import { UserFormComponent } from './users/userForm/user-form.component';
import { MasterListComponent } from './masters/mastersList/masters-list.component';
import { MasterFormComponent } from './masters/masterForm/master-form.component';
import { FilmListComponent } from './films/filmsList/films-list.component';
import { FilmFormComponent } from  './films/filmForm/film-form.component';

import { AuthUserGuard } from './_guards/auth.user-guard';
import { AuthAdminGuard } from './_guards/auth.admin-guard';

import { ErrorHandlerService } from './_services/error-handler.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService }  from './_services/user.service';
import { MasterService } from './_services/master.service';
import { FilmService } from './_services/film.service';
import { FormsHelper } from './_helpers/forms.helper'

import { GenericErrorComponent } from './errors/generic-error.component';
import { Error401Component } from './errors/error-401.component';
import { Error401TokenExpiredComponent } from './errors/error-401-token-expired.component';

@NgModule({
  imports:      [BrowserModule
                  , FormsModule 
                  , HttpModule
                  , AppRoutingModule
                  , ConfirmationPopoverModule.forRoot({
                      focusButton: 'confirm'
                    })],
  declarations: [AppComponent
                  , LoginFormComponent
                  , DashboardFormComponent
                  , UsersListFormComponent
                  , UserFormComponent
                  , MasterListComponent
                  , MasterFormComponent
                  , FilmListComponent
                  , FilmFormComponent
                  , GenericErrorComponent
                  , Error401Component
                  , Error401TokenExpiredComponent],
  bootstrap:    [AppComponent],
  providers:    [ AuthUserGuard
                  , AuthAdminGuard
                  , ErrorHandlerService
                  , AuthenticationService
                  , UserService
                  , MasterService
                  , FilmService
                  , FormsHelper]
})
export class AppModule { }
