import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = 'assets/config.json';
  private config: Config;

  constructor(private http: HttpClient) { }

  public getConfig() {
    return this.http.get<Config>(this.configUrl).toPromise().then(config => this.config = config);
  }

  get Config(): Config { return this.config; }
}
