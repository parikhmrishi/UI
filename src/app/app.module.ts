import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CreatequizComponent } from './createquiz/createquiz.component';

import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';


import { environment } from '../environments/environment.prod';
import { DataService } from './services/userData.service';
import { TokenGuard } from './validate/Token.guard';
import { AuthGuard } from './validate/auth.guard';
import { HomequizsService } from './services/homequizs.service';
import { ViewquizComponent } from './viewquiz/viewquiz.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.clientId)
  }
])

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CreatequizComponent,
    ErrorComponent,
    HeaderComponent,
    ViewquizComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  
  schemas: [ NO_ERRORS_SCHEMA ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DataService,
    HomequizsService,
    TokenGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
