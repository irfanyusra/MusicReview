import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  baseURL = "http://localhost:8080"
  constructor(private _http: HttpClient) {}

  get_top_10_songs() {
    return this._http.get(`${this.baseURL}/api/open/songs/top-10`);
  }
}
