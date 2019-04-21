import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../services/event.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  userId: string;
  events: any;
  hostFlag: boolean;
  noEventFlag: boolean;


  ngOnInit() {

    this.events = [];
    this.noEventFlag =  false;

    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    // this.hostId = this.event.hostId;

    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );
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

  search() {
    const searchString = this.searchForm.value.searchStr;
    this.eventService.findEventsByName(searchString)
      .subscribe(
        (data: any) => {
          this.events = data;
          if (data.length === 0) {
            this.noEventFlag = true;
          } else {
            this.noEventFlag =  false;
          }
        }
      );
  }

  profile() {
    if (this.userId === '0') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/user', this.userId]);
    }
  }

  searchPage() {
    this.router.navigate(['/user', this.userId, 'search']);
  }


}
