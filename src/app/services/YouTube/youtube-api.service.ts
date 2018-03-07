import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class YoutubeApiService {
  baseDefaultYTURL = 'https://www.googleapis.com/youtube/v3/videos?';
  baseSearchedYTURL = 'https://www.googleapis.com/youtube/v3/search?';
  part = 'snippet';
  // channelID  = 'UCPsopTKQfSgW9XdYkKA6Gdw';
  // searchQuery= 'The Hulk';
  type = 'video';
  maxResults = 20;
  API_key    = 'AIzaSyB6fDbzn-_44vn0_zYHiVWkRnOL5xbhK60';

  constructor(private http: Http) {}

  getVideos() {

      // videoList = json_decode(file_get_contents('https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId='.$channelID.'&maxResults='.$maxResults.'&key='.$API_key.''));
      // const videoList = this.baseYTURL + 'part=' + this.part + '&q=' + this.searchQuery + '&apiKey=' + this.API_key;

      const popularVideos = this.baseDefaultYTURL + `part=` + this.part + `&chart=mostpopular&maxResults=` + this.maxResults + `&key=` + this.API_key;
      return this.http.get(popularVideos)
      // Mapping the results to json.
      .map((res: any) => res.json());
  }

  getVideoBySearchedTopic(searchQuery) {
    const passedVideoSearchQuery = this.baseSearchedYTURL + `part=` + this.part + `&maxResults=` + this.maxResults + `&q=` + searchQuery + `&key=` + this.API_key;
    return this.http.get(passedVideoSearchQuery)
      .map((res: any) => res.json());
  }

}
