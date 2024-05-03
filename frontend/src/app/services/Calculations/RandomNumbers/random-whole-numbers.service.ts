import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomWholeNumbersService {

  constructor() { }

  generateIntegers(min: number, max: number): number {
    console.log('generate a random positive whole number function accessed')
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



}

