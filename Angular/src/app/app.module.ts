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
import { AdminGuard } from "./admin.guard";
import { HttpService } from "./http.service";
import { TokenInterceptorService } from "./token-interceptor.service";
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminComponent } from './admin/admin.component';
import { Top10SongsComponent } from './top10-songs/top10-songs.component';
import { ShowDmcaTakedownComponent } from './show-dmca-takedown/show-dmca-takedown.component';
import { ShowSecPrivComponent } from './show-sec-priv/show-sec-priv.component';
import { LogComponent } from './log/log.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, SecureComponent, LoginPageComponent, AdminComponent, Top10SongsComponent, ShowDmcaTakedownComponent, ShowSecPrivComponent, LogComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [SecureGuard, SecureService, HttpService,AdminGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
