import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { MainPageComponent } from './page/main-page/main-page.component';

const routes: Routes = [
  {path: "" , redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginPageComponent,  pathMatch: "full"},
  {path: "messenger", component: MainPageComponent,  pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
