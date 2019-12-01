import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
} from "@angular/router";
// import { Observable } from "rxjs";
import { SecureService } from "./secure.service";

@Injectable({
  providedIn: "root"
})
export class SecureGuard implements CanActivate {
  constructor(private _secureService: SecureService, private _router: Router) {}

  canActivate(): boolean {
    if (this._secureService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(["/"]);
      return false;
    }
  }
}
