import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from "./app-config.service";
import { IMail } from "../interfaces/mail";
import { BaseDataService } from "./base-data.service";

@Injectable({
  providedIn: 'root'
})
export class MailService extends BaseDataService {
  public baseUrl = 'messages';

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public getMails(
    page: number,
    count: number,
    searchValue: string
  ): Observable<IMail[]> {
    const url = this.getUrl(`${this.baseUrl}/page/${page}/count/${count}/search/${searchValue}`);
    return this.http.get<IMail[]>(url, this.defaultHttpOptions);
  }

  public getMail(
    id: number,
  ): Observable<IMail> {
    return this.http.get<IMail>(this.getUrlById(this.baseUrl, id), this.defaultHttpOptions);
  }

  public getCount(): Observable<number> {
    return this.http.get<number>(this.getUrl(`${this.baseUrl}/count`), this.defaultHttpOptions);
  }
}