import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CodingComponent} from "./coding/coding.component";
import {BlogsComponent} from "./blogs.component";
import {BlogDetailComponent} from "./blog-detail/blog-detail.component";
import {LoginGuard} from "../RoutingGuard/login-guard";
import {BlogEditorComponent} from "./blog-editor/blog-editor.component";

const routes: Routes = [
  {
    path: "coding",
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: CodingComponent
      }
    ],
   canActivate: [LoginGuard]
  },
  {
    path: "blogDetail/:id",
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: BlogDetailComponent
      }
    ]
  },
  {
    path: "editor/:id",
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: BlogEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule {
}
