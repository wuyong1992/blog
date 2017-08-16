import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Blog} from "../../model/blog-model";
import {BlogService} from "../../service/blog.service";
import {ToastsManager} from "ng2-toastr";
import {User} from "../../model/user-model";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  public blog: Blog = new Blog;
  public user: User = new User;
  public isAuthor: boolean = false;

  constructor(private activateRouter: ActivatedRoute,
              private router: Router,
              private blogService: BlogService,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
    // this.blog.id = this.activateRouter.snapshot.params["id"]   //这个是参数快照，不推荐使用
    this.activateRouter.params.subscribe((params: Params) => {
      this.blog.id = params["id"];
      this.getBlogById();
    });

  }

  getBlogById() {
    this.blogService.getBlogById(this.blog.id)
      .subscribe(
        data => {
          this.blog = data.data;
          localStorage.setItem("currentBlog", JSON.stringify(this.blog));
          this.user = JSON.parse(localStorage.getItem("currentUser"));
          if (this.user.username == this.blog.authorName) {
            this.isAuthor = true;
            return this.isAuthor;
          }
        },
        error2 => {
          this.toastr.warning("系统错误，读取blog失败！", "系统提示", 2500)
        }
      );
  }

  checkAuthor() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))

  }


}
