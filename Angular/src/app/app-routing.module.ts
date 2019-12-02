import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { SecureComponent } from "./secure/secure.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminGuard } from "./admin.guard";
import { SecureGuard } from "./secure.guard";
import { ShowSecPrivComponent } from "./show-sec-priv/show-sec-priv.component";
import { ShowDmcaTakedownComponent } from "./show-dmca-takedown/show-dmca-takedown.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login-page", component: LoginPageComponent },
  { path: "secure", component: SecureComponent, canActivate: [SecureGuard] },
  {
    path: "secure/admin",
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: "security-privacy-policy", component: ShowSecPrivComponent },
  { path: "dmca-takedown-policy", component: ShowDmcaTakedownComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
