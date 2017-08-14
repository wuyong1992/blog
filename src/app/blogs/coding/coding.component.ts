import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Blog} from "../model/blog-model";
import {BlogService} from "../service/blog.service";
import {User} from "../../user/model/user-model";
import {ToastsManager} from "ng2-toastr";

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
  public currentUser: User;
  public token: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private blogService: BlogService,
              private toastr: ToastsManager) {
    this.froala = "";
    this.token = localStorage.getItem("token");
  }

  ngOnInit() {
    this.builder();
    if (localStorage.getItem("currentUser") == "") {
      this.toastr.warning("请先登录！", "系统提示");
      this.router.navigateByUrl("login");
    } else {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  froalaContent(event: string) {
    this.froala = event;
  }

  //构建表单
  builder() {
    this.blogForm = this.fb.group({
      title: [],
      intro: [],
      content: []
    });
  }

  //提交
  onSubmit() {
    this.blog = this.blogForm.value;
    this.blog.content = this.froala;
    this.blog.authorId = this.currentUser.id;
    console.log(this.blog);
    if (this.blog.authorId == null) {
      this.toastr.warning("请先登录！", "系统提示");
      this.router.navigateByUrl("login");
    }
    this.blogService.blogSave(this.blog, this.token)
      .subscribe(
        data => {
          if (data.status == 0) {
            this.toastr.success("上传成功！", "系统提示", 1500);
            this.router.navigateByUrl("home");
          }
          else {
            this.toastr.warning("您需要重新登录！", "系统提示", 2500);
            this.router.navigateByUrl("login");
          }
        },
        error2 => {
          console.log(error2.message);
          this.toastr.error(error2.message + "", "系统提示", 2500);
        }
      );
  }

}
