import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../services/event.service.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  userId: string;
  user: any;
  events: [];
  hostFlag: boolean;

  constructor(private eventService: EventService, private userService: UserService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    this.userService.findUserById(this.userId)
      .subscribe(
        (data: any) => {
          this.user = data;

          if (data.role === 'host') {
            this.hostFlag = true;
            this.eventService.findEventsByHostId(data._id)
              .subscribe(
                (e_data: any) => {
                  this.events = e_data;
                }
              );
          } else {
            this.hostFlag = false;
            this.events = data.events;
          }
        }
      );
  }

  profile() {
    this.router.navigate(['/user', this.user._id]);
  }

  search() {
    this.router.navigate(['/user', this.user._id, 'search']);
  }

  newEvent() {
    this.router.navigate(['/user', this.user._id, 'event', 'new']);
  }

  returnEvents() {
    this.router.navigate(['/user', this.user._id, 'event']);
  }

}
