import { Injectable } from '@angular/core';
import { TokenService } from '../TokenServices/token.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private tokenService: TokenService
  ) { }

  getGradeLevel(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.tokenService.decodeToken(token);
      return decodedToken ? decodedToken['grade_level'] : null;
    }
    return null;
  }

  getTopicsFromLocalStorage(): any[] {
    const topics = localStorage.getItem('topics_list');
    if (topics) {
      // Parse the JSON string to convert it back to an array of objects
      const topicsList: any[] = JSON.parse(topics);
      console.log('Topics retrieved from local storage:', topicsList);
      return topicsList;
    } else {
      console.log('No topics found in local storage');
      return [];
    }
  }

  getNumbersetsFromLocalStorage(): any[] {
    const numbersets = localStorage.getItem('numbersets_list');
    if (numbersets) {
      // Parse the JSON string to convert it back to an array of objects
      const numbersetsList: any[] = JSON.parse(numbersets);
      console.log('Numbersets retrieved from local storage:', numbersetsList);
      return numbersetsList;
    } else {
      console.log('No Numbersets found in local storage');
      return [];
    }
  }

}

