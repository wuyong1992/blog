import {Component, OnInit} from '@angular/core';
import {Blog} from "../../model/blog-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../model/user-model";
import {Router} from "@angular/router";
import {BlogService} from "../../service/blog.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {

  //富文本的值
  froala: string;

  //表单
  public blogForm: FormGroup;
  public blog: Blog;
  public currentBlog: Blog;
  public currentUser: User;
  public token: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private blogService: BlogService,
              private toastr: ToastsManager) {
    this.froala = "";
  }

  ngOnInit() {
    if (localStorage.getItem("currentUser") == "" || localStorage.getItem("token") == "" || localStorage.getItem("currentBlog") == "") {
      this.toastr.warning("没有登录或者没有按流程进入！", "系统提示");
      this.router.navigateByUrl("login");
    } else {
      this.token = localStorage.getItem("token");
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.currentBlog = JSON.parse(localStorage.getItem("currentBlog"));
    }
    this.builder();
  }

  froalaContent(event: string) {
    this.froala = event;
  }

  //构建表单
  builder() {
    this.blogForm = this.fb.group({
      title: [this.currentBlog.title],
      intro: [this.currentBlog.intro],
      content: []
    });
  }

  //提交
  onSubmit() {
    this.blog = this.blogForm.value;
    this.blog.content = this.froala;
    this.blog.id = this.currentBlog.id;
    this.blog.authorId = this.currentUser.id;
    if (this.blog.authorId == null) {
      this.toastr.warning("请先登录！", "系统提示");
      this.router.navigateByUrl("login");
    }
    this.blogService.blogUpdate(this.blog, this.token)
      .subscribe(
        data => {
          if (data.status == 0) {
            this.toastr.success("更新成功！", "系统提示", 1500);
            this.router.navigate(['/blogs/blogDetail',this.blog.id]);
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
