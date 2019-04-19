import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { RegisterComponent } from './views/user/register/register.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { HomeComponent } from './views/user/home/home.component';
import { EventSearchComponent } from './views/event/event-search/event-search.component';
import { EventViewComponent } from './views/event/event-view/event-view.component';
import { EventNewComponent } from './views/event/event-new/event-new.component';
import { EventListComponent } from './views/event/event-list/event-list.component';
import { EventEditComponent } from './views/event/event-edit/event-edit.component';

import {UserService} from './services/user.service.client';
import {EventService} from './services/event.service.client';
import { EventCardComponent } from './views/event/event-card/event-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    EventSearchComponent,
    EventViewComponent,
    EventNewComponent,
    EventListComponent,
    EventEditComponent,
    EventCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [UserService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
