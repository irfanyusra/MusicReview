import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SecureComponent } from "./secure/secure.component";

import { SecureService } from "./secure.service";
import { SecureGuard } from "./secure.guard";
import { HttpService } from "./http.service";
import { TokenInterceptorService } from "./token-interceptor.service";

@NgModule({
  declarations: [AppComponent, HomeComponent, SecureComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [SecureGuard, SecureService, HttpService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
