import { Component, OnInit } from '@angular/core';
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
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log("topics page has initialized");
    // Subscribe to the observable to get the topics and cache them
    this.tokenService.getTopics().subscribe((topics: any[]) => {
      // Cache the topics
      const fetchedTopics = this.tokenService.getCachedTopics();
      // Log the cached topics
      console.debug('Print Cached TOPICS: ', this.tokenService.getCachedTopics());
      // Assign the fetched topics to a variable
      
      // Once you have the topics, you can proceed with any further processing
      this.imageUrls = this.getImageUrls(fetchedTopics);
      console.log('LIST THE IMAGE URLS', this.imageUrls);

      // Now you can log the fetched topics from the variable
      console.log('LIST THE TOPICS', fetchedTopics);
    });
  }

  constructRouterLink(name: string): string {
    // Ensure name is converted to lowercase
    const normalizedName = `${name.toLowerCase()}`;
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
            name = topic;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/plus2@300x.png';
            order = 1;
          }
          console.log('additionNumberset', routerLinkName)
          break;
        case 'Subtraction':
          {
            name = topic;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/minus2@300x.png';
            order = 2;
          }
          console.log('subtractionNumberset', routerLinkName)
          break;
        case 'Multiplication':
          {
            name = topic;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
          }
          console.log('multiplicationNumberset', routerLinkName)
          break;
        case 'Division':
          {
            name = topic;
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
