import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './local-storage-service.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.set(key, value);

    expect(service.get(key)).toBe(value);
  });

  it('should remove item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.set(key, value);
    service.remove(key);

    expect(service.get(key)).toBeNull();
  });
});