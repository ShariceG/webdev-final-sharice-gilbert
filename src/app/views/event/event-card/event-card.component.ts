import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event: any;

  hostId: string;
  userId: string;
  user: any;

  hostFlag: boolean;
  attendeeFlag: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    if (this.userId !== '0') {
      this.userService.findUserById(this.userId)
        .subscribe(
          (data: any) => {
            this.user = data;
            if (data.role === 'host') {
              this.hostFlag = true;
            } else {
              this.hostFlag = false;
            }
          }
        );
    } else {
      this.hostFlag = false;
    }


    // this.hostId = this.event.hostId;
    //
    // this.route.params.subscribe(
    //   (params: any) => {
    //     this.userId = params['uid'];
    //   }
    // );
    // console.log('userID: ' + this.userId);
    // console.log('hostID: ' + this.hostId);
    // console.log(this.userId === this.hostId)
    // if (this.userId === this.hostId) {
    //   this.hostFlag = true;
    //   this.attendeeFlag = false;
    // } else {
    //   this.hostFlag = false;
    //   this.attendeeFlag = true;
    // }

  }

  viewEvent() {
    this.router.navigate(['/user', this.userId, 'event', this.event._id]);
  }

  editEvent() {
    this.router.navigate(['/user', this.userId, 'event', this.event._id, 'edit']);
  }

}
