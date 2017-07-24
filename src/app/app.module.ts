import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {UserRegisterComponent} from "./user/user-register/user-register.component";
import {UserLoginComponent} from "./user/user-login/user-login.component";
import {UserService} from "./user/service/user.service";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastOptionSelf} from "./util/toast-option-self";
import { RichtextComponent } from './richtext/richtext.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";


/*const routeConfig: Routes = [
  {path: '', component: ContentComponent},
  {path: 'blogDetail/:blogId', component: BlogDetailsComponent}
];*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    BlogDetailsComponent,
    FooterComponent,
    UserRegisterComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
  ],
  providers: [
    UserService,
    {provide:ToastOptions,useClass:ToastOptionSelf}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
