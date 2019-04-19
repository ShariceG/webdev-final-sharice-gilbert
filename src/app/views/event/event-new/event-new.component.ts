import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {EventService} from '../../../services/event.service.client';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {

  @ViewChild('eventForm') eventForm: NgForm;

  userId: string;
  event: any;
  errorFlag: boolean;
  errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMessage = 'Please fill all fields';

    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );
  }

  createEvent() {

    const body = {
      name: this.eventForm.value.eventName,
      date: this.eventForm.value.date,
      image: this.eventForm.value.image,
      description: this.eventForm.value.description,
      capacity: this.eventForm.value.capacity
    };

    console.log(body.name);

    this.eventService.createEvent(this.userId , body)
      .subscribe(
        (data: any) => {
          this.event = data;
          this.router.navigate(['/user', this.userId, 'event']);
        },
        (error: any) => {
          this.errorFlag = true;
        }
      );
  }

  eventList() {
    this.router.navigate(['/user', this.userId, 'event']);
  }

  eventNew() {
    this.router.navigate(['/user', this.userId, 'event', 'new']);
  }

  search() {
    this.router.navigate(['/user', this.userId, 'search']);
  }

  profile() {
    this.router.navigate(['/user', this.userId]);
  }



}
