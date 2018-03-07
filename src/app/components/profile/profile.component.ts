import { ProfileInfo } from './../../profile-info';
import { Video } from './../../video';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SavedMediaService } from '../../services/Saved-Media/saved-media.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SavedMediaService]
})
export class ProfileComponent implements OnInit {
  videos: Array<Video>;

  selectedVideo: Video;

  constructor(private _savedMediaService: SavedMediaService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._savedMediaService.getVideos()
    .subscribe(resVideoData => {
      this.videos = resVideoData;
      console.log(this.videos);
    });
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    console.log(this.selectedVideo);
  }

}
