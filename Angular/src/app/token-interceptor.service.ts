import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { SecureService } from "./secure.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService {
  constructor(private _secureService: SecureService) {}

  intercept(req, next) {
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._secureService.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }
}
