import { Component, OnInit, ViewChild } from '@angular/core';
import {EventService} from '../../../services/event.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';

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
  joinedFlag: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService,
              private userService: UserService) { }

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
          console.log('HOST: ' + data.host + '\n' + 'USER: ' + this.userId);
          this.hostId = data.host;
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

          if (this.userId === this.hostId) {
            this.hostFlag = true;
            this.attendeeFlag = false;
          } else {
            this.hostFlag = false;
            this.attendeeFlag = true;
            // console.log(this.event.attendees.includes(this.userId));
            if (this.event.attendees.includes(this.userId)) {
              this.joinedFlag = true;
              this.attendeeFlag = false;
            } else {
              this.joinedFlag = false;
            }
          }
        }
      );

    this.userService.findUserById(this.userId)
      .subscribe(
        (data: any) => {
          this.user = data;
        }
      );



    // console.log('userID: ' + this.userId);
    // console.log('hostID: ' + this.hostId);
    // console.log(this.userId === this.hostId);
    // if (this.userId === this.hostId) {
    //   this.hostFlag = true;
    //   this.attendeeFlag = false;
    // } else {
    //   this.hostFlag = false;
    //   this.attendeeFlag = true;
    //   if (this.event.attendees.includes(this.userId)) {
    //     this.joinedFlag = true;
    //   } else {
    //     this.joinedFlag = false;
    //   }
    // }
  }

  eventList() {
    if (this.userId === '0') {
      this.router.navigate(['/user', this.userId, 'search']);
    } else {
      this.router.navigate(['/user', this.userId, 'event']);
    }
  }

  profile() {
    if (this.userId === '0') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/user', this.userId]);
    }
  }

  search() {
    this.router.navigate(['/user', this.userId, 'search']);
  }

  joinEvent() {
    if (this.userId === '0') {
      this.router.navigate(['/login']);
    } else {
      const attendeeList = this.event.attendees;
      attendeeList.push(this.userId);
      const userEventList = this.user.events;
      userEventList.push(this.event);

      const eventBody = {
        attendees: attendeeList
      };

      const userBody = {
        events: userEventList
      };

      this.eventService.updateEvent(this.eventId, eventBody)
        .subscribe(
          (data: any) => {
            this.event = data;
          }
        );
      // console.log(this.userId);
      this.userService.updateUser(this.user, userBody)
        .subscribe(
          (data: any) => {
            this.user = data;
          }
        );

      this.router.navigate(['/user', this.user._id, 'event']);
    }
  }

  removeItem(list, id: string) {
    for (let x = 0; x < list.length; x++) {
      if (list[x]._id === id) {
        list.splice(x, 1);
      }
    }
  }

  removeId(list, id: string) {
    for (let x = 0; x < list.length; x++) {
      if (list[x] === id) {
        list.splice(x, 1);
      }
    }
  }

  leaveEvent() {
    const attendeeList = this.event.attendees;
    this.removeId(attendeeList, this.userId);
    const userEventList = this.user.events;
    this.removeItem(userEventList, this.eventId);

    const eventBody = {
      attendees: attendeeList
    };

    const userBody = {
      events: userEventList
    };


    this.eventService.updateEvent(this.eventId, eventBody)
      .subscribe(
        (data: any) => {
          this.event = data;
        }
      );
    this.userService.updateUser(this.user, userBody)
      .subscribe(
        (data: any) => {
          this.user = data;
        }
      );

    this.router.navigate(['/user', this.user._id, 'event']);

  }


}
