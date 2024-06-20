import { Injectable, isDevMode } from "@angular/core";
import { ADDRESS, API_URL } from "../constants/api-config";

@Injectable({
	providedIn: 'root'
})
export class AppConfigService {
	private _apiUrl?: string;

	get appApiUrl(): string {
		if (this._apiUrl) {
			return this._apiUrl
		}
		this._apiUrl = this.createApiUrl();
		return this._apiUrl;
	}

	public createApiUrl(): string {
		if (!isDevMode()) {
			return `${window.location.origin}/${API_URL}`;
		}
		return `${ADDRESS}/${API_URL}`;
	}
}