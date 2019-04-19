import { Component, OnInit, ViewChild } from '@angular/core';
import {EventService} from '../../../services/event.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  hostId: string;
  userId: string;
  user: any;
  event: any;
  eventId: string;

  date: string;
  day: string;
  month: string;

  attendees: number;

  hostFlag: boolean;
  attendeeFlag: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.eventId = params['eid'];
      }
    );

    this.eventService.findEventById(this.eventId)
      .subscribe(
        (data: any) => {
          this.event = data;
          const dateObj = new Date(data.date);
          this.attendees  = this.event.attendees.length;

          if (dateObj.getMonth() < 10) {
            this.month = '0' + dateObj.getMonth();
          } else {
            this.month = dateObj.getMonth().toString();
          }

          if (dateObj.getDay() < 10) {
            this.day = '0' + dateObj.getDay();
          } else {
            this.day = dateObj.getDay().toString();
          }

          this.date = dateObj.getFullYear() + '/' + this.month + '/' + this.day;
          // console.log(this.date);
          // console.log(data);
        }
      );

    this.hostId = this.event.hostId;

    console.log('userID: ' + this.userId);
    console.log('hostID: ' + this.hostId);
    console.log(this.userId === this.hostId)
    if (this.userId === this.hostId) {
      this.hostFlag = true;
      this.attendeeFlag = false;
    } else {
      this.hostFlag = false;
      this.attendeeFlag = true;
    }
  }

  eventList() {
    this.router.navigate(['/user', this.userId, 'event']);
  }

  profile() {
    this.router.navigate(['/user', this.userId]);
  }

  search() {
    this.router.navigate(['/user', this.userId, 'search']);
  }


}
