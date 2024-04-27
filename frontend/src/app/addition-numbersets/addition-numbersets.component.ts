import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/DataServices/data.service';

interface ImageInfo {
  name: string;
  url: string;
  order: number;
  routerLinkName: string;
}

@Component({
  selector: 'app-addition-numbersets',
  templateUrl: './addition-numbersets.component.html',
  styleUrl: './addition-numbersets.component.scss'
})

export class AdditionNumbersetsComponent {
  message: string | null = null;
  numbersets: string[] = [];
  imageUrls: ImageInfo[] = [];
  private numbersetSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    console.log("numbersets page has initialized");
    this.loadNumbersets();

  };

  ngOnDestroy(): void {
    if (this.numbersetSubscription) {
      this.numbersetSubscription.unsubscribe();
    }
  }

  loadNumbersets(): void {
    this.numbersetSubscription = this.dataService.getNumbersets().subscribe(
      (numbersets: any[]) => {
        this.numbersets = numbersets;
        console.log('Numbersets:', this.numbersets);
        this.imageUrls = this.getImageUrls(this.numbersets);
        console.log('Image URLs:', this.imageUrls);
      },
      (error: any) => {
        console.error('Failed to load numbersets. Error:', error);
      }
    );
  }

  constructRouterLink(name: string): string {
    // Ensure name is converted to lowercase
    const normalizedName = name.toLowerCase();
    return `/Addition-${normalizedName}`;
  }

  getImageUrls(numberset_list: string[]): ImageInfo[] {
    console.log('get images url called', numberset_list)
    const imageUrls: ImageInfo[] = [];

    this.numbersets?.forEach(obj => {
      let numberset_name = (obj as any).numberset_name;
      let imageUrl = '../../../assets/images/NumberSets/plus2@300x_blank.png';
      let name = '';
      let order = 0;
      let routerLinkName = '';

      switch (numberset_name) {
        case 'Positive Whole Numbers':
          name = 'Positive Whole Numbers';
          routerLinkName = this.constructRouterLink(name)
          imageUrl = imageUrl;
          order = 1;
          console.log('additionNumberset', routerLinkName, 'topic', numberset_name)
          break;
        case 'Decimals':
          name = 'Positive Decimals';
          routerLinkName = this.constructRouterLink(name)
          imageUrl = imageUrl;
          order = 2;
          break;
        case 'Integers':
          name = 'integers';
          routerLinkName = this.constructRouterLink(name)
          imageUrl = imageUrl;
          order = 3;
          break;
        case 'Fractions':
          name = 'Fractions';
          routerLinkName = this.constructRouterLink(name)
          imageUrl = imageUrl;
          order = 4;
          break;
        case 'Real Numbers':
          name = 'Real Numbers';
          routerLinkName = this.constructRouterLink(name)
          imageUrl = imageUrl;
          order = 5;
          break;
        default:
          console.log("No Numbersets to display")
          break;
      }
      if (imageUrl !== '') { // Only push if imageUrl is not empty
        imageUrls.push({ name, url: imageUrl, order, routerLinkName }); // Push imageUrl directly
      };
    });

    // Sort the imageUrls array based on the order property
    imageUrls.sort((a, b) => a.order - b.order);
    console.log(imageUrls)
    return imageUrls;
  }
}