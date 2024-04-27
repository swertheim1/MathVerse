import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/DataServices/data.service';

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
  imageUrls: ImageInfo[] = [];
  topics: any[] | null = null;
  private topicsSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,

  ) { }

  ngOnInit(): void {
    console.log("topics page has initialized");
    this.loadTopics();

  };
  
  ngOnDestroy(): void {
    if (this.topicsSubscription) {
      this.topicsSubscription.unsubscribe();
    }
  }

  loadTopics(): void {
    this.topicsSubscription = this.dataService.getTopics().subscribe(
      (topics: any[]) => {
        this.topics = topics;
        console.log('Topics:', this.topics);
        this.imageUrls = this.getImageUrls(this.topics);
        console.log('Image URLs:', this.imageUrls);
      },
      (error: any) => {
        console.error('Failed to load topics. Error:', error);
      }
    );
  }

  constructRouterLink(name: string): string {
    // Ensure name is converted to lowercase
    const normalizedName = `${name.toLowerCase()}`;
    return `/${normalizedName}-numbersets`;
  }

  getImageUrls(topic_list: string[]): ImageInfo[] {
    console.log('get images url called', topic_list)
    const imageUrls: ImageInfo[] = [];

    this.topics?.forEach(obj =>  {
      let topic_name = obj.topic_name;
      let imageUrl = '';
      let name = '';
      let order = 0;
      let routerLinkName = '';

      switch (topic_name) {
        case 'Addition':
            name = 'addition';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/plus2@300x.png';
            order = 1;
            console.log('additionNumberset', routerLinkName, 'topic', topic_name)
            break;
        case 'Subtraction':
            name = 'subtraction';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/minus2@300x.png';
            order = 2;
            console.log('subtractionNumberset', routerLinkName, 'topic', topic_name)
            break;
        case 'Multiplication':
            name = 'multiplication';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
            console.log('multiplicationNumberset', routerLinkName, 'topic', topic_name)
            break;
        case 'Division':
            name = 'division';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/divide2@300x.png';
            order = 4;
            console.log('divisionNumberset', routerLinkName, 'topic', topic_name)
            break;
        case 'Ratio':
            name = 'ratio';
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/ratio3@300x.png';
            order = 5;
            console.log('ratioNumberset', routerLinkName, 'topic', topic_name)
            break;
        default:
            console.log("No Topics to display")
            break;
    }    
      if (imageUrl !== '') { // Only push if imageUrl is not empty
        imageUrls.push({ name, url: imageUrl, order, routerLinkName }); // Push imageUrl directly
      }
    });
    // Sort the imageUrls array based on the order property
    imageUrls.sort((a, b) => a.order - b.order);
    console.log('image locations',imageUrls)
    return imageUrls;
  }

}
