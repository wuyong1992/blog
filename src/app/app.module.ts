import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {UserRegisterComponent} from "./user/user-register/user-register.component";
import {UserLoginComponent} from "./user/user-login/user-login.component";
import {UserService} from "./service/user.service";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastOptionSelf} from "./util/toast-option-self";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {FileUploadModule} from "ng2-file-upload";
import {CommonModule} from "@angular/common";
import {BlogService} from "./service/blog.service";
import {HomeService} from "./service/home.service";
import {CategoryService} from "./service/category.service";


/*const routeConfig: Routes = [
  {path: '', component: ContentComponent},
  {path: 'blogDetail/:blogId', component: BlogDetailsComponent}
];*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    UserRegisterComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule.forRoot(),
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
    CommonModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    UserService,
    {provide: ToastOptions, useClass: ToastOptionSelf},
    BlogService,
    HomeService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
