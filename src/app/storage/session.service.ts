import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public set(key: string, value: any): any {
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  public get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
