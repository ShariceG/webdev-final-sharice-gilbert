import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { SharedService} from './shared.service';

import { map } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()

export class UserService {
  constructor(private _http: HttpClient, private router: Router) {}

  baseUrl = environment.baseUrl;
  sharedService = new SharedService();

  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById,
    'findUserByUsername': this.findUserByUsername,
    'findUserByCredentials': this.findUserByCredentials,
    'updateUser': this.updateUser,
    'deleteUser': this.deleteUser,
    'login': this.login,
    'logout': this.logout
  };

  login(username: String, password: String) {
    const body = {
      username : username,
      password : password
    };

    console.log(body);
    return this._http.post(this.baseUrl + 'api/login', body, {withCredentials: true})
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  loggedIn() {
    return this._http.get(this.baseUrl + 'api/loggedin', {withCredentials: true})
      .map(
        (res: any) => {
          const user = res;
          if (user !== 0) {
            this.sharedService.user = user;
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  logout() {
    return this._http.get(this.baseUrl + 'api/logout', {withCredentials: true})
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  register(username: String, password: String, role: String) {
    const user = {
      username: username,
      password: password,
      role: role
    };
    return this._http.post(this.baseUrl + 'api/register', user, {withCredentials: true});
  }


  createUser(username: String, password: String, role: String) {
    const body = {
      username: username,
      password: password,
      role: role,

    };
    return this._http.post(this.baseUrl + 'api/user', body)
      .map(
        (res: Response) => {
          return res;
          // return data;
        }
      );
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + 'api/user/' + userId)
      .map(
        (res: Response) => {
          return res;
          // return data;
        }
      );
  }

  findUserByUsername(username: String) {
    return this._http.get(this.baseUrl + 'api/user?username=' + username)
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  findUserByCredentials(username: String, password: String) {
    const url = this.baseUrl + 'api/user?username=' + username + '&password=' + password;
    return this._http.get(url)
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  updateUser(user: any, body: any) {
    const url = this.baseUrl + 'api/user/' + user._id;
    console.log(body);
    return this._http.put(url, body);
  }

  deleteUser(userId: String) {
    return this._http.delete(this.baseUrl + 'api/user/' + userId);
  }

}


