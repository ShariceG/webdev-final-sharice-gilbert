import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileForm') profileForm: NgForm;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  userId: String;
  user: any;
  hostFlag: boolean;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      // console.log('user id: ' + this.userId);
    });

    this.userService.findUserById(this.userId)
      .subscribe(
        (data: any) => {
          this.user = data;
          // console.log(data);
          if (data.role === 'host') {
            this.hostFlag = true;
          } else {
            this.hostFlag = false;
          }
        }
      );
  }

  updateUser() {
    // console.log(this.user);

    let body = {};

    if (this.hostFlag === true) {
      body = {
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        organization: this.user.organization
      };
    } else {
      body = {
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      };
    }
    // console.log(body);

    this.userService.updateUser(this.user, body)
      .subscribe(
        (data: any) => {
          this.user = data;
        }
      );
  }


  events() {
    this.router.navigate(['/user', this.user._id, 'event' ]);
  }

  profile() {
    this.router.navigate(['/user', this.user._id]);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  search() {
    this.router.navigate(['/user', this.user._id, 'search']);
  }

}
