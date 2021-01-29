import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/start/app.component';
import { LoginComponent } from './components/authenticate/login.component';

import { APP_LAZY_ROUTING } from './components/start/app.lazy.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './components/authenticate/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './components/shared/topbar/topbar.component';
import { SideBarComponent } from './components/shared/sidebar/sidebar.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { RxTranslateModule } from '@rxweb/translate';
//import { WindowRef } from './WindowRef';


@NgModule({
  declarations: [
    AppComponent , LoginComponent,TopBarComponent,SideBarComponent
  ],
  imports: [
    BrowserModule, APP_LAZY_ROUTING , FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule,
    RxTranslateModule.forRoot({cacheLanguageWiseObject:true, 
      filePath:'assets/i18n/{{language-code}}/{{translation-name}}.json'}),
    BackButtonDisableModule.forRoot()//to disable the backbutton.
  ],
  providers: [AuthenticationService],
  
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {

   constructor() {

     }
 }
