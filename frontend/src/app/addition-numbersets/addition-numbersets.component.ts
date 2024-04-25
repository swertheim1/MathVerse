import { Component } from '@angular/core';
import { TokenService } from '../services/TokenServices/token.service';

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
  

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log("topics page has initialized");
    // Subscribe to the observable to get the topics and cache them
    this.tokenService.getNumbersets().subscribe((topics: any[]) => {
      // Cache the topics
      const fetchedNumbersets = this.tokenService.getCachedNumbersets();
      // Log the cached topics
      console.debug('Print Cached TOPICS: ', this.tokenService.getCachedNumbersets());
      // Assign the fetched topics to a variable
      
      // Once you have the topics, you can proceed with any further processing
      this.imageUrls = this.getImageUrls(fetchedNumbersets);
      console.log('LIST THE IMAGE URLS', this.imageUrls);

      // Now you can log the fetched topics from the variable
      console.log('LIST THE NUMBERSETS', fetchedNumbersets);
    });
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
          {
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/NumberSets/AddWPWholeNumbers.png';
            order = 1;
          }
          break;
        case 'Positive Decimals':
          {
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/NumberSets/AddWPositiveDecimals.png';
            order = 2;
          }
          break;
        case 'Integers':
          {
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
          }
          break;
        case 'Fractions':
          {
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/divide2@300x.png';
            order = 4;
          }
          break;
        case 'Real Numbers':
          {
            name = numberset;
            routerLinkName = this.constructRouterLink(name)
            imageUrl = 'assets/images/ratio@300x.png';
            order = 5;
          }
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