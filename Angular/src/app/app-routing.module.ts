import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SecureComponent } from "./secure/secure.component";


const routes: Routes = [
  { path: "", component: HomeComponent}, {path: "secure", component: SecureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
