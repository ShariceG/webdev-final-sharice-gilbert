import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../services/event.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('searchForm') searchForm: NgForm;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  userId: String;

  ngOnInit() {
    this.userId = '0';

  }

  login() {
    this.router.navigate(['/login']);
  }

  search() {
    this.router.navigate(['/user', this.userId, 'search']);
  }

  home() {
    this.router.navigate(['/']);
  }

}
