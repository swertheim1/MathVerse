import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/TokenServices/token.service';

interface ImageInfo {
  name: string;
  url: string;
  order: number;
  routerLinkName: string;
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
    console.log('this.imageUrls', this.imageUrls);
  }

  constructRouterLink(name: string): string {
    // Ensure name is converted to lowercase
    const normalizedName = `${name.toLowerCase()}`;
    // console.log('normalized name', normalizedName)
    // Construct the router link with the normalized name
    return `/${normalizedName}-numbersets`;
}

  getImageUrls(topic_list: string[]): ImageInfo[] {
    const imageUrls: ImageInfo[] = [];

    for (const topic of topic_list) {
      let imageUrl = '';
      let name = '';
      let order = 0;
      let routerLinkName = '';

      switch (topic) {
        case 'Addition':
          {
            name = 'Addition';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/plus2@300x.png';
            order = 1;
          }
          console.log('additionNumberset', routerLinkName)
          break;
        case 'Subtraction':
          {
            name = 'Subtraction';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/minus2@300x.png';
            order = 2;
          }
          console.log('subtractionNumberset', routerLinkName)
          break;
        case 'Multiplication':
          {
            name = 'Multiplication';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
          }
          console.log('multiplicationNumberset', routerLinkName)
          break;
        case 'Division':
          {
            name = 'Division';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/divide2@300x.png';
            order = 4;
          }
          console.log('divisionNumberset', routerLinkName)
          break;
        case 'Ratio':
          {
            name = topic;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/ratio3@300x.png';
            order = 5;
          }
          console.log('ratioNumberset', routerLinkName)
          break;

        default:
          console.log("No Topics to display")
          break;
      }
      if (imageUrl !== '') { // Only push if imageUrl is not empty
        imageUrls.push({ name, url: imageUrl, order, routerLinkName }); // Push imageUrl directly
      }
    }
    // Sort the imageUrls array based on the order property
    imageUrls.sort((a, b) => a.order - b.order);
    // console.log(imageUrls)
    return imageUrls;
  }

}
