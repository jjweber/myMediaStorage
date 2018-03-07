import { Video } from './../../video';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { YoutubeApiService } from '../../services/YouTube/youtube-api.service';
import { SavedMediaService } from '../../services/Saved-Media/saved-media.service';

import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  youtubeData: any = [];
  videosList: any = [];
  filteredVideos: any [];
  selectedVideo: any = {
      title: '',
      description: '',
      imageUrl: '',
      videoUrl: '',
      publishedAt: '',
  };
  videoStore: any = [];
  searchedTitle = 'Most Popular';
  // searchBar = (<HTMLInputElement>document.getElementById('searchedTopic'));

  constructor(private youtubeApiService: YoutubeApiService, private savedMediaService: SavedMediaService) {}

  ngOnInit() {
      this.youtubeApiService.getVideos()

      // Subscribing to the function to get access to its data.
      .subscribe((data) => {

          this.youtubeData = data.items;

          for (const newData of this.youtubeData) {

              const videoModel: any = {
                  title: newData.snippet.title,
                  description: newData.snippet.description,
                  imageUrl: newData.snippet.thumbnails.high.url,
                  videoUrl: 'http://www.youtube.com/embed/' + newData.id,
                  publishedAt: newData.snippet.publishedAt,
              };
              this.videosList.push(videoModel);
          }

          console.log(this.videosList);
      });
  }

    // Function that calls the youtube api and passes it a search query to find videos for searched topic.
    SearchForVideos(searchedTopic: string) {
      this.videosList = [];
      if (searchedTopic) {
          this.youtubeApiService.getVideoBySearchedTopic(searchedTopic)

          // Subscribing to the function to get access to its data.
          .subscribe((data) => {

              this.youtubeData = data.items;
              console.log(this.youtubeData);

              for (const newData of this.youtubeData) {

                  const searchedVideoModel: any = {
                      title: newData.snippet.title,
                      description: newData.snippet.description,
                      imageUrl: newData.snippet.thumbnails.high.url,
                      videoUrl: 'http://www.youtube.com/embed/' + newData.id.videoId,
                      publishedAt: newData.snippet.publishedAt,
                  };
                  this.videosList.push(searchedVideoModel);
              }

              console.log(this.videosList);
          });
          this.searchedTitle = searchedTopic;
        }
    }

    // Function that is passed the data from the video that is clicked to populate the modal with correct video data.
    SelectVideo(video: any) {
        // Setting the passed video to the selectedVideo variable.
        this.selectedVideo = video;
        console.log(this.selectedVideo);
    }

    SaveVideo (video: any) {

        // Pushing the selectedVideo to my videoStore array.
        console.log('Pushing up saved video of: ', this.selectedVideo);

        // Calling addVideo from savedMediaService and passing it my videoStore array.
        this.savedMediaService.addVideo(this.selectedVideo)
          .subscribe(resNewVideo => {
            this.videoStore.push(resNewVideo);
            this.selectedVideo = resNewVideo;
          });
    }

}
