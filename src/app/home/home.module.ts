import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {ContentComponent} from "../content/content.component";
import {SingleComponent} from "../single/single.component";
import {RightSideComponent} from "../right-side/right-side.component";
import {PagingComponent} from "../paging/paging.component";
import {SearchComponent} from "../search/search.component";
import {HomeComponent} from "./home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    ContentComponent,
    SingleComponent,
    RightSideComponent,
    PagingComponent,
    SearchComponent
  ]
})
export class HomeModule { }
