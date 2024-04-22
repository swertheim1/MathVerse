import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string) {
    return this.http.post('https://mathverse.net/login', { username, password }, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://mathverse.net'
      }
    });
  }
}
