import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Blog} from "../model/blog-model";
import {BlogService} from "../service/blog.service";

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {

  //富文本的值
  froala: string;

  //表单
  public blogForm: FormGroup;

  public blog: Blog;

  constructor(private fb: FormBuilder,
              private router: Router,
              private blogService:BlogService) {
    this.froala = "";
  }

  ngOnInit() {
    this.builder();
  }

  froalaContent(event: string) {
    this.froala = event;
  }

  //构建表单
  builder() {
    this.blogForm = this.fb.group({
      title: [],
      imgUrl: [],
      intro: [],
      content: []
    });
  }

  onSubmit(){
    this.blog = this.blogForm.value;
    this.blog.content = this.froala;
    console.log(this.blog);
    this.blogService.submit(this.blog);
  }

}
