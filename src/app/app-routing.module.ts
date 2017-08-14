/**
 * Created by Administrator on 2017/7/15.
 */

import {RouterModule, Routes} from "@angular/router";
import {ContentComponent} from "./content/content.component";
import {NgModule} from "@angular/core";
import {UserRegisterComponent} from "./user/user-register/user-register.component";
import {UserLoginComponent} from "./user/user-login/user-login.component";
import {LoginGuard} from "./RoutingGuard/login-guard";


/*const routeConfig: Routes = [
  {path: '', component: ContentComponent},
  {path: 'blogDetail/:blogId', component: BlogDetailsComponent},
  {path:'register',loadChildren:'./user/user.module#UserModule'}
];*/
const routeConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  // {path: 'blogDetail/:blogId', component: BlogDetailsComponent},
  // {path:'register',loadChildren:'./user/user.module#UserModule'},
  // {path:'login',loadChildren:'./user/user.module#UserModule'}
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'blogs', loadChildren: './blogs/blogs.module#BlogsModule', canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule {
}
