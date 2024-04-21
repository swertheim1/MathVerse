import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/TokenServices/token.service';

interface ImageInfo {
  name: string;
  url: string;
  order: number;
}


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})


export class TopicsComponent implements OnInit {
  message: string | null = null;
  topics: string[] = [];
  imageUrls: ImageInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log("topics page has initialized");
    this.topics = this.tokenService.getCachedTopics();
    console.log(this.topics);
    this.imageUrls = this.getImageUrls(this.topics);
    console.log(this.imageUrls);

    console.log('this.imageUrls', this.imageUrls);

  }


  getImageUrls(topic_list: string[]): ImageInfo[] {
    const imageUrls: ImageInfo[] = [];

    for (const topic of topic_list) {
      let imageUrl = '';
      let name = '';
      let order = 0;

      switch (topic) {
        case 'Addition':
          {
            name = topic;
            imageUrl = 'assets/images/plus2@300x.png';
            order = 1;
          }
          break;
        case 'Subtraction':
          {
            name = topic;
            imageUrl = 'assets/images/minus2@300x.png';
            order = 2;
          }
          break;
        case 'Multiplication':
          {
            name = topic;
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
          }
          break;
        case 'Division':
          {
            name = topic;
            imageUrl = 'assets/images/divide2@300x.png';
            order = 4;
          }
          break;
        case 'Ratio':
          {
            name = topic;
            imageUrl = 'assets/images/ratio@300x.png';
            order = 5;
          }
          break;

        default:
          console.log("No Topics to display")
          break;
      }
      if (imageUrl !== '') { // Only push if imageUrl is not empty
        imageUrls.push({ name, url: imageUrl, order }); // Push imageUrl directly
      }
    }
    // Sort the imageUrls array based on the order property
    imageUrls.sort((a, b) => a.order - b.order);
    console.log(imageUrls)
    return imageUrls;
  }

}
