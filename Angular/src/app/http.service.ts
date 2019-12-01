import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  get_top_10_songs() {
    return this._http.get(`/api/open/songs/top-10`);
  }

  user_login(user: User) {
    return this._http.post<any>(`/api/open/user/login`, user);
  }
  get_most_recent_review(songId) {
    return this._http.get<any>(`/api/open/review/most-recent/${songId}`);
  }

  get_all_reviews(songId) {
    return this._http.get<any>(`/api/open/review/get-ordered/${songId}`);
  }

  add_new_user(user: User) {
    return this._http.post<any>(`/api/open/user/add`, user);
  }

  add_review(review) {
    return this._http.post<any>(`/api/secure/review/add`, review);
  }
}
