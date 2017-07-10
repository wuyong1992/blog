import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ContentComponent} from './content/content.component';
import {SingleComponent} from './single/single.component';
import {RightSideComponent} from './right-side/right-side.component';
import {SearchComponent} from './search/search.component';
import {PagingComponent} from './paging/paging.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";


const routeConfig: Routes = [
  {path: '', component: ContentComponent},
  {path: 'blogDetail/:blogId', component: BlogDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    SingleComponent,
    RightSideComponent,
    SearchComponent,
    PagingComponent,
    BlogDetailsComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
