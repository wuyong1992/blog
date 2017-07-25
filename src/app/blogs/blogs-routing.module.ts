import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodingComponent} from "./coding/coding.component";

const routes: Routes = [
  {
    path: "",
    component: CodingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
