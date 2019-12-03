import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { Song } from "../song";
import { User } from "../user";
import { Review } from "../review";
import * as jwt_decode from "jwt-decode";
import { SecPriv } from "../sec-priv";
import { DmcaTakedown } from "../dmca-takedown";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  users: Object;
  songs: Object;
  // selected_song: Song;
  current_user: User;
  refresh_top10 = true;
  update_sec_priv_policy = new SecPriv("", "", "");
  add_sec_priv_policy = new SecPriv("", "", "");

  update_dmcaTakedown_policy = new DmcaTakedown("", "", "");
  add_dmcaTakedown_policy = new DmcaTakedown("", "", "");

  toggle_admin_output = "";
  toggle_active_output = "";
  toggle_hidden_output = "";

  selected_user_admin_id: "";
  selected_song_id: "";
  selected_user_active_id: "";
  output_priv_sec_add = "";
  output_priv_sec_update = "";
  output_dmca_takedown_add = "";
  output_dmca_takedown_update = "";
  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    this.get_all_users();
    this.get_all_songs();
    this.current_user = jwt_decode(localStorage.getItem("token"));
    this.get_priv_sec_policy();
    this.get_dmca_takedown_policy();
  }

  get_all_songs() {
    this._http.get_all_songs().subscribe(data => {
      this.songs = data.msg;
    });
  }

  get_all_users() {
    this._http.get_all_users().subscribe(data => {
      this.users = data.msg;
      console.log("this.users");

      console.log(this.users);
    });
  }

  toggle_admin() {
    console.log(this.selected_user_admin_id);
    this._http.toggle_admin(this.selected_user_admin_id).subscribe(data => {
      if (data.error) this.toggle_admin_output = data.error;
      else {
        console.log("data " + data.msg);
        this.toggle_admin_output = data.msg;
        this.get_all_users();
      }
    });
  }

  toggle_hide() {
    console.log(this.selected_song_id);
    this._http.toggle_hide(this.selected_song_id).subscribe(data => {
      if (data.error) this.toggle_hidden_output = data.error;
      else {
        console.log("data " + data.msg);
        this.toggle_hidden_output = data.msg;
        this.get_all_songs();
        this.refresh_top10 = !this.refresh_top10;
      }
    });
  }

  toggle_active() {
    console.log(this.selected_user_active_id);
    this._http.toggle_active(this.selected_user_active_id).subscribe(data => {
      if (data.error) this.toggle_active_output = data.error;
      else {
        console.log("data " + data.msg);
        this.toggle_active_output = data.msg;
        this.get_all_users();
      }
    });
  }

  get_priv_sec_policy() {
    this._http.get_security_privacy_policiy().subscribe(data => {
      if (data.msg) {
        this.update_sec_priv_policy = data.msg;
        console.log(data.msg);
      } else console.log("getting policy error: " + data.error);
    });
  }

  add_priv_sec_policy() {
    this._http
      .add_security_privacy_policy(this.add_sec_priv_policy)
      .subscribe(data => {
        if (data.msg) {
          this.output_priv_sec_add = "added new policy message";
          this.get_priv_sec_policy();
        } else {
          console.log("Error" + data.error);
          this.output_priv_sec_add = "Error when adding a policy";
        }
      });
  }

  update_priv_sec_policy() {
    console.log(this.update_sec_priv_policy);
    this._http
      .update_security_privacy_policy(this.update_sec_priv_policy)
      .subscribe(data => {
        console.log(data);
        if (data.msg) {
          this.output_priv_sec_update = "successful edit: " + data.msg;
          this.get_priv_sec_policy;
        } else {
          this.output_priv_sec_update = "getting policy error: " + data.error;
        }
      });
  }

  show_security_policy() {
    this._router.navigate(["security-privacy-policy"]);
  }

  get_dmca_takedown_policy() {
    this._http.get_dmca_takedown_policiy().subscribe(data => {
      if (data.msg) {
        this.update_dmcaTakedown_policy = data.msg;
        console.log(data.msg);
      } else console.log("getting policy error: " + data.error);
    });
  }

  add_dmca_takedown_policy() {
    console.log("this policy to submit : " + this.add_dmcaTakedown_policy._id);
    this._http
      .add_dmca_takedown_policy(this.add_dmcaTakedown_policy)
      .subscribe(data => {
        if (data.msg) {
          this.output_dmca_takedown_add =
            "added new policy message: " + data.msg;
        } else {
          this.output_dmca_takedown_add = "Error" + data.error;
        }
      });
  }

  update_dmca_takedown_policy() {
    console.log(this.update_dmca_takedown_policy);
    this._http
      .update_dmca_takedown_policy(this.update_dmca_takedown_policy)
      .subscribe(data => {
        console.log(data);
        if (data.msg) {
          this.output_dmca_takedown_update = "successful edit: " + data.msg;
          this.get_dmca_takedown_policy();
        } else {
          this.output_dmca_takedown_update =
            "getting policy error: " + data.error;
        }
      });
  }

  show_DCMA_policy() {
    this._router.navigate(["dmca-takedown-policy"]);
  }

  logs() {
    this._router.navigate(["logs"]);
  }
}
