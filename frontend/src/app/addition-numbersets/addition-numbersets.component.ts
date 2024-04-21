import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/TokenServices/token.service';

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
    private route: ActivatedRoute,
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log("numbersets page has initialized");
    this.numbersets = this.tokenService.getCachedNumbersets();
    console.log(this.numbersets);
    this.imageUrls = this.getImageUrls(this.numbersets);
    console.log(this.imageUrls);
    console.log('this.imageUrls', this.imageUrls);
  }

  getImageUrls(numberset_list: string[]): ImageInfo[] {
    const imageUrls: ImageInfo[] = [];

    for (const numberset of numberset_list) {
      let imageUrl = '';
      let name = '';
      let order = 0;

      switch (numberset) {
        case 'Addition':
          {
            name = 'decimals';
            imageUrl = 'assets/images/plus2@300x.png';
            order = 1;
          }
          break;
        case 'Subtraction':
          {
            name = 'subtraction-numbersets';
            imageUrl = 'assets/images/minus2@300x.png';
            order = 2;
          }
          break;
        case 'Multiplication':
          {
            name = 'multiplication-numbersets';
            imageUrl = 'assets/images/times2@300x.png';
            order = 3;
          }
          break;
        case 'Division':
          {
            name = 'division-numbersets';
            imageUrl = 'assets/images/divide2@300x.png';
            order = 4;
          }
          break;
        case 'Ratio':
          {
            name = numberset;
            imageUrl = 'assets/images/ratio@300x.png';
            order = 5;
          }
          break;

        default:
          console.log("No Numbersets to display")
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

interface ImageInfo {
  name: string;
  url: string;
  order: number;
}