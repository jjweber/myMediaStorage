import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Video } from './../../video';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SavedMediaService {

  private _getUrl = '/api/videos';
  private _postUrl = '/api/video';
  private _deleteUrl = '/api/video/:id';

  constructor(private _http: Http) { }

  getVideos() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addVideo(video: Video) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(video), options)
      .map((response: Response) => response.json());
  }

  deleteVideo(video: Video) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._deleteUrl, JSON.stringify(video), options)
      .map((response: Response) => response.json());
  }

}
