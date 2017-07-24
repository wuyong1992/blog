import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodingRoutingModule } from './coding-routing.module';
import {FormsModule} from "@angular/forms";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {CodingComponent} from "./coding.component";
import {RichtextComponent} from "../richtext/richtext.component";

@NgModule({
  imports: [
    CommonModule,
    CodingRoutingModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [CodingComponent,RichtextComponent]
})
export class CodingModule { }
