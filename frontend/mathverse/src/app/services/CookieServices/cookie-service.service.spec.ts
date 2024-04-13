import { CookieService } from './cookie-service.service';

describe('CookieService', () => {
  let cookieService: CookieService;

  beforeEach(() => {
    cookieService = new CookieService();
  });

  afterEach(() => {
    // Clean up cookies after each test
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  });

  it('should set and get a cookie', () => {
    const key = 'testCookie';
    const value = 'testValue';

    cookieService.set(key, value);
    
    expect(cookieService.get(key)).toEqual(value);
  });

  it('should remove a cookie', () => {
    const key = 'testCookie';
    const value = 'testValue';

    cookieService.set(key, value);
    cookieService.remove(key);

    expect(cookieService.get(key)).toBeNull();
  });

  it('should parse existing cookies on initialization', () => {
    const key = 'testCookie';
    const value = 'testValue';

    document.cookie = `${key}=${encodeURIComponent(value)}`;

    cookieService = new CookieService();

    expect(cookieService.get(key)).toEqual(value);
  });

  it('should parse cookies after calling parseCookies method', () => {
    const key = 'testCookie';
    const value = 'testValue';

    document.cookie = `${key}=${encodeURIComponent(value)}`;
    
    cookieService.parseCookies();
    
    expect(cookieService.get(key)).toEqual(value);
  });

  it('should handle decoding special characters in cookie value', () => {
    const key = 'testCookie';
    const value = 'test%20value'; // URL encoded value
  
    document.cookie = `${key}=${encodeURIComponent(value)}`;
    
    cookieService = new CookieService();
    
    expect(cookieService.get(key)).toEqual(value); // Expect encoded value
  });
});
