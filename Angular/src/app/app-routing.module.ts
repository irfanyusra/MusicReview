import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SecureComponent } from "./secure/secure.component";
import { SecureGuard } from "./secure.guard";
import { LoginPageComponent } from "./login-page/login-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login-page", component: LoginPageComponent },
  { path: "secure", component: SecureComponent, canActivate: [SecureGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
