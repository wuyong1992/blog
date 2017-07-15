import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from "../content/content.component";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:[
      {
        path:'',
        component:ContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
