import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodingComponent} from "./coding/coding.component";
import {BlogsComponent} from "./blogs.component";

const routes: Routes = [
  {
    path: "",
    component: BlogsComponent,
    children:[
      {
        path:'',
        component:CodingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
