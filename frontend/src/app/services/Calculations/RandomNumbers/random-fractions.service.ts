import { Injectable } from '@angular/core';
import { RandomWholeNumbersService } from './random-whole-numbers.service';

@Injectable({
  providedIn: 'root'
})
export class RandomFractionsService {

  constructor(
    private randomInteger: RandomWholeNumbersService
  ) { }
  
  gcd(a: number, b: number): number {
    // Implement Euclidean algorithm to find GCD
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

generateRandomFractionWithinThreshold(baseFraction: { numerator: number, denominator: number }, maxNumerator: number, maxDenominator: number, threshold: number): { numerator: number, denominator: number } {
  // Generate random numerator and denominator within the specified range
  let numerator = this.randomInteger.generateIntegers(Math.max(1, baseFraction.numerator - threshold), Math.min(maxNumerator, baseFraction.numerator + threshold));
  let denominator = this.randomInteger.generateIntegers(Math.max(1, baseFraction.denominator - threshold), Math.min(maxDenominator, baseFraction.denominator + threshold));

  // Ensure the generated fraction is not equivalent to the base fraction
  while (numerator === baseFraction.numerator && denominator === baseFraction.denominator) {
    numerator = this.randomInteger.generateIntegers(Math.max(1, baseFraction.numerator - threshold), Math.min(maxNumerator, baseFraction.numerator + threshold));
    denominator = this.randomInteger.generateIntegers(Math.max(1, baseFraction.denominator - threshold), Math.min(maxDenominator, baseFraction.denominator + threshold));
  }

  return { numerator, denominator };
}


generateRandomFraction(MIN_NUM: number, MAX_NUM: number, MIN_DEM: number, MAX_DEM: number ): { numerator: number, denominator: number } {
  // Generate random numerator and denominator
  console.log('generate random fraction accessed')
  
  let numerator = this.randomInteger.generateIntegers(MIN_NUM, MAX_NUM); // Random numerator between 1 and 10
  let denominator = this.randomInteger.generateIntegers(MIN_DEM, MAX_DEM); // Random denominator between 1 and 10
  
  // Calculate the greatest common divisor (GCD) of numerator and denominator
  const divisor = this.gcd(numerator, denominator);
  
  // If the GCD is greater than 1, divide both numerator and denominator by the GCD
  if (divisor > 1) {
      numerator /= divisor;
      denominator /= divisor;
  }
  console.log(numerator, denominator)
  return { numerator, denominator };
}

}
