import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  username: String;
  password: String;
  user: any;

  errorFlag: boolean;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMessage = 'Invalid username or password!';
  }

  login () {

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.findUserByCredentials(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.user = data;
          this.errorFlag = false;
          this.router.navigate(['/user', this.user._id]);
        },
        (error: any) => {
          console.log('HERE AT ERROR');
          this.errorFlag = true;
        }
      );
  }

}
