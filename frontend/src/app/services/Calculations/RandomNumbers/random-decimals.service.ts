import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomDecimalsService {

  constructor() { }

  generatePositiveDecimals(min: number, max: number): number {
    console.log('generate a random positive decimals function accessed')
    return (Math.random() * (max - min + 1)) + min;
  }
}
