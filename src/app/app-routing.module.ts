import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {HomeComponent} from './views/user/home/home.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {EventSearchComponent} from './views/event/event-search/event-search.component';
import {EventListComponent} from './views/event/event-list/event-list.component';
import {EventNewComponent} from './views/event/event-new/event-new.component';
import {EventViewComponent} from './views/event/event-view/event-view.component';
import {EventEditComponent} from './views/event/event-edit/event-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:uid', component: ProfileComponent},
  {path: 'user/:uid/search', component: EventSearchComponent},
  {path: 'user/:uid/event', component: EventListComponent},
  {path: 'user/:uid/event/new', component: EventNewComponent},
  {path: 'user/:uid/event/:eid', component: EventViewComponent},
  {path: 'user/:uid/event/:eid/edit', component: EventEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
