import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { CodingComponent } from './coding/coding.component';
import {FileUploadModule} from "ng2-file-upload";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RichtextComponent} from "../richtext/richtext.component";
import {FileuploadComponent} from "../fileupload/fileupload.component";
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogEditorComponent } from './blog-editor/blog-editor.component';


@NgModule({
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FileUploadModule,
  ],
  declarations: [
    CodingComponent,
    RichtextComponent,
    FileuploadComponent,
    BlogsComponent,
    BlogDetailComponent,
    BlogEditorComponent,
  ]
})
export class BlogsModule { }
