import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";
import { SecPriv } from "./sec-priv";

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

  get_all_avail_songs() {
    return this._http.get<any>(`/api/open/songs/all-avail`);
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

  get_security_privacy_policiy() {
    return this._http.get<any>(`api/open/security-privacy`);
  }

  add_security_privacy_policy(security_privacy_policy) {
    return this._http.post<any>(
      "api/admin/security-privacy/create",
      security_privacy_policy
    );
  }

  update_security_privacy_policy(security_privacy_policy) {
    return this._http.post<any>(
      `api/admin/security-privacy/update/${security_privacy_policy._id}`,
      security_privacy_policy
    );
  }

  get_dmca_takedown_policiy() {
    return this._http.get<any>(`api/open/dmca-takedown`);
  }

  add_dmca_takedown_policy(dmca_takedown_policy) {
    return this._http.post<any>(
      "api/admin/dmca-takedown/create",
      dmca_takedown_policy
    );
  }

  update_dmca_takedown_policy(dmca_takedown_policy) {
    return this._http.post<any>(
      `api/admin/dmca-takedown/update/${dmca_takedown_policy._id}`,
      dmca_takedown_policy
    );
  }

  get_all_logs() {
    return this._http.get<any>("/api/admin/log/all");
  }

  create_log(log) {
    return this._http.post<any>("/api/admin/log/create", log);
  }

  toggle_copyright(songId) {
    return this._http.put<any>(`api/admin/song/toggle-copyright/${songId}`, {});
  }

}
