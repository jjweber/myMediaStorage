import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './../../user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SaveUserService {
  private _getUrl = '/api';
  private _registerUrl = '/api/register';
  private _loginUrl = '/api/login';

  constructor(private _http: Http) { }

  getUser() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addUser(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._registerUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

  SigninUser(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._loginUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

}
