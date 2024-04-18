import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {  
  private cookieStore: { [key: string]: string } = {};

  constructor() {
    this.parseCookies(document.cookie);
  }

  /**
   * Parses the document cookies and populates the cookieStore object.
   * @param cookies - A string containing the document cookies.
   */
  public parseCookies(cookies = document.cookie): void {
    this.cookieStore = {}; // Initialize as empty object
    if (!cookies) {
      return;
    }
    const cookiesArray = cookies.split(';');
    for (const cookie of cookiesArray) {
      const [key, value] = cookie.split('=').map(part => part.trim());
      console.log('Parsed set of cookies: ', key, value);
      this.cookieStore[key] = decodeURIComponent(value);
    }
  }

  /**
   * Retrieves the value of a cookie by its key from the cookieStore.
   * @param key - The key of the cookie to retrieve.
   * @returns The value of the cookie if found, otherwise null.
   */
  public get(key: string): string | null {
    this.parseCookies();
    console.log('PARSED COOKIES', this.parseCookies());
    return this.cookieStore[key] || null;
  }

  /**
   * Removes a cookie from the document by setting its expiration date to the past
   * and deleting it from the cookieStore.
   * @param key - The key of the cookie to remove.
   */
  public remove(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    delete this.cookieStore[key];
  }

  /**
   * Sets a cookie in the document with the specified key, value, and optional expiration date.
   * It also updates the cookieStore accordingly.
   * @param key - The key of the cookie to set.
   * @param value - The value to set for the cookie.
   * @param expires - Optional expiration date for the cookie.
   */
  public set(key: string, value: string, expires?: Date): void {
    let cookieString = `${key}=${encodeURIComponent(value || '')}`;
    if (expires) {
      cookieString += `; expires=${expires.toUTCString()}`;
    }
    cookieString += '; path=/';
    document.cookie = cookieString;
    this.cookieStore[key] = value;
  }
}
