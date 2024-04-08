import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {  
  private cookieStore: { [key: string]: string } = {};


  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = {}; // Initialize as empty object
    if (!cookies) return;

    const cookiesArray = cookies.split(';');
    for (const cookie of cookiesArray) {
      const [key, value] = cookie.split('=').map(part => part.trim());
      this.cookieStore[key] = decodeURIComponent(value);
    }
  }

  get(key: string) {
    this.parseCookies();
    return this.cookieStore[key] || null;
  }

  remove(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    delete this.cookieStore[key];
  }


  set(key: string, value: string, expires?: Date) {
    let cookieString = `${key}=${encodeURIComponent(value || '')}`;
    if (expires) {
      cookieString += `; expires=${expires.toUTCString()}`;
    }
    cookieString += '; path=/';
    document.cookie = cookieString;
    this.cookieStore[key] = value;
  }
}
