import { Component } from '@angular/core';
import { AuthService } from '../services/AuthenticationServices/auth.service';
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
  styleUrl:    './addition-numbersets.component.scss'
})

export class AdditionNumbersetsComponent {

  message: string | null = null;
  numbersets: string[] = [];
  imageUrls: ImageInfo[] = [];
  private numbersetSubscription: Subscription | undefined;
  

  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    console.log("numbersets page has initialized");
    this.loadNumbersets();
    this.getImageUrls(this.numbersets);
    
  };

  ngOnDestroy(): void {
    if (this.numbersetSubscription) {
      this.numbersetSubscription.unsubscribe();
    }
  }

  loadNumbersets(): void {
    this.dataService.getTopics().subscribe(
      (numbersets: any[]) => {
        this.numbersets = numbersets;
        console.log('Topics:', this.numbersets);
      },
      (error: any) => {
        console.error('Failed to load topics. Error:', error);
      }
    );
  }

  constructRouterLink(name: string): string {
    // Ensure name is converted to lowercase
    const normalizedName = name.toLowerCase();
    return `/Addition-${normalizedName}`;
  }

  getImageUrls(numberset_list: string[]): ImageInfo[] {
    const imageUrls: ImageInfo[] = [];

    for (const numberset of numberset_list) {
      let imageUrl = '';
      let name = '';
      let order = 0;
      let routerLinkName = '';

      switch (numberset) {
        case 'Positive Whole Numbers':          
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/NumberSets/AddWPWholeNumbers.png';
            order = 1;
            break;
        case 'Positive Decimals':          
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/NumberSets/AddWPositiveDecimals.png';
            order = 2;          
          break;
        case 'Integers':
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
            break;
        case 'Fractions':
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/divide2@300x.png';
            order = 4;
          break;
        case 'Real Numbers':
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/ratio@300x.png';
            order = 5;          
          break;
        default:
          console.log("No Numbersets to display")
          break;
      }
      if (imageUrl !== '') { // Only push if imageUrl is not empty
        imageUrls.push({ name, url: imageUrl, order, routerLinkName }); // Push imageUrl directly
      }
    }
    // Sort the imageUrls array based on the order property
    imageUrls.sort((a, b) => a.order - b.order);
    console.log(imageUrls)
    return imageUrls;
  }
}