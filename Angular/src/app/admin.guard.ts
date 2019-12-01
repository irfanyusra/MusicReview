import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { SecureService } from "./secure.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private _secureService: SecureService, private _router: Router) {}
  canActivate(): boolean {
    if (this._secureService.loggedIn()) {
      if (this._secureService.checkAdmin()) 
      {
        return true;
    }
      else {
        this._router.navigate(["/secure"]);
        return false;
      }
    }
    else {
      this._router.navigate(["/"]);
      return false;
    }
  }
}
