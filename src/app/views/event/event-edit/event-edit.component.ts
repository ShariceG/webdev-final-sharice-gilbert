import { Component, OnInit, ViewChild } from '@angular/core';
import {EventService} from '../../../services/event.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})


export class EventEditComponent implements OnInit {

  @ViewChild('eventForm') eventForm: NgForm;

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) { }

  userId: string;
  eventId: string;
  event: any;
  date: string;
  day: string;
  month: string;


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

          this.date = dateObj.getFullYear() + '-' + this.month + '-' + this.day;
          console.log(this.date);
          // console.log(data);
        }
      );


  }

  updateEvent() {
    const body = {
      name: this.eventForm.value.eventName,
      date: this.eventForm.value.date,
      image: this.eventForm.value.image,
      description: this.eventForm.value.description,
      capacity: this.eventForm.value.capacity
    };
    this.eventService.updateEvent(this.eventId, body)
      .subscribe(
        (data: any) => {
          this.event = data;
          this.eventList();
        }
      );
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventId)
      .subscribe(
        (data: any) => {
          const message = data;
          this.router.navigate(['/user', this.userId, 'event']);
        }
      );
  }

  eventList() {
    this.router.navigate(['/user', this.userId, 'event']);
  }
  eventEdit() {
    this.router.navigate(['/user', this.userId, 'event', this.eventId, 'edit']);
  }

  profile() {
    this.router.navigate(['/user', this.userId]);
  }

}
