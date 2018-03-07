import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SavedMediaService } from '../../services/Saved-Media/saved-media.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(private _savedMediaService: SavedMediaService) { }
  media: any = [];

  selectedContent: any = {};

  ngOnInit() {
    this._savedMediaService.getVideos()
    .subscribe(resVideoData => {
      this.media = resVideoData;
      console.log(this.media);
    });
  }

  onSelectObject(content: any) {
    this.selectedContent = content;
    console.log(this.selectedContent);
  }

  removeContent(content: any) {
    // Calling addVideo from savedMediaService and passing it my videoStore array.
    this._savedMediaService.deleteVideo(this.selectedContent);

  }

}
