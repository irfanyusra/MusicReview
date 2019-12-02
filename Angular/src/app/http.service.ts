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

  get_all_songs() {
    return this._http.get<any>(`/api/open/songs/all`);
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

  get_all_users() {
    console.log("ddd");
    return this._http.get<any>(`/api/admin/user/all`);
  }

  toggle_admin(userId) {
    return this._http.post<any>(`/api/admin/user/toggle-admin/${userId}`, {});
  }

  toggle_active(userId) {
    return this._http.post<any>(`/api/admin/user/toggle-active/${userId}`, {});
  }
  add_review(review) {
    return this._http.post<any>(`/api/secure/review/add`, review);
  }
  add_song(song) {
    console.log(song);
    return this._http.post<any>(`/api/secure/song/add`, song);
  }

  toggle_hide(songId) {
    return this._http.post<any>(`/api/admin/song/toggle-hide/${songId}`, {});
  }
}
