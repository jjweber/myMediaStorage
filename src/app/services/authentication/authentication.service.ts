import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
  authToken: any;
  user: any;
  private _registerUserUrl = '/api/register';
  private _authenticateUserUrl = '/api/authenticate';

  constructor(private _http: Http) { }

  registerUser(user) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._registerUserUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

  authenticateUser(user) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._authenticateUserUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }

}
