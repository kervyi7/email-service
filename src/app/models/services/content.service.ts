import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from "./app-config.service";
import { BaseDataService } from "./base-data.service";
import { IContent } from "../interfaces/content";

@Injectable({
  providedIn: 'root'
})
export class ContentService extends BaseDataService {
  public baseUrl = 'contents';

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public getContent(
    id: string,
  ): Observable<IContent> {
    return this.http.get<IContent>(this.getUrlById(`${this.baseUrl}/content`, id), this.defaultHttpOptions);
  }
}