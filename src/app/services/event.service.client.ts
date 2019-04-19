import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { map } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable()

export class EventService {
  constructor(private _http: HttpClient, private router: Router) {}

  baseUrl = environment.baseUrl;

  api = {
    'createEvent': this.createEvent,
    'findEventById': this.findEventById,
    'findEventsByHostId': this.findEventsByHostId,
    'findEventsByName': this.findEventsByName,
    'findEventsByDate': this.findEventsByDate,
    'updateEvent': this.updateEvent,
    'deleteEvent': this.deleteEvent
  }

  createEvent(userId: string, body: any) {
    return this._http.post(this.baseUrl + 'api/user/' + userId + '/event' , body)
      .map(
        (res: Response) => {
          return res;
          // return data;
        }
      );
  }

  findEventById(eventId: String) {
    return this._http.get(this.baseUrl + 'api/event/' + eventId)
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  findEventsByHostId(hostId: String) {
    return this._http.get(this.baseUrl + 'api/event/host/' + hostId)
      .map(
        (res: Response) => {
          return res;
          // return data;
        }
      );
  }

  findEventsByName(name: String) {
    return this._http.get(this.baseUrl + 'api/event?name=' + name)
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  findEventsByDate(date: String) {
    const url = this.baseUrl + 'api/event?date=' + date;
    // console.log(url);
    // console.log('HERE');
    return this._http.get(url)
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  updateEvent(eventId: any, body: any) {
    const url = this.baseUrl + 'api/event/' + eventId;
    console.log(body);
    return this._http.put(url, body);
  }

  deleteEvent(eventId: String) {
    return this._http.delete(this.baseUrl + 'api/event/' + eventId);
  }

}


