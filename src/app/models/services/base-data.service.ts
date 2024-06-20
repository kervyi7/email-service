import { HttpHeaders } from '@angular/common/http';
import { AppConfigService } from "./app-config.service";
import { IHttpOptions } from "../interfaces/http-options";

export abstract class BaseDataService {
  private _apiUrl: string;
  public defaultHttpOptions: IHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public abstract baseUrl: string;

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(protected appConfigService: AppConfigService) {
    this._apiUrl = this.appConfigService.appApiUrl;
  }

  public getUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  public getUrlById(endpoint: string, id: number | string): string {
    return `${this.apiUrl}/${endpoint}/${id}`;
  }
}