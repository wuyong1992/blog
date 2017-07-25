import {Injectable} from '@angular/core';
import {Blog} from "../model/blog-model";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class BlogService {

  public blog: Blog;

  public blogSubmitURL = "http://localhost:8080/blog/blogSubmit";


  constructor(private http: Http,
              private router: Router,
              private toastr: ToastsManager) {
  }


  //提交表单

  public submit(blog: Blog) {
    console.log("发送blog请求");

    let data = new URLSearchParams();
    data.append("title",blog.title);
    data.append("intro",blog.intro);
    data.append("content",blog.content);

    return this.http.post(this.blogSubmitURL, data)
      .map(res => {
        let data = res.json();
        console.log("user object =>" + data);
        // console.log("user data =>" + res.json().data.status);
        if (data.status == 0) {
          console.log(data.data);
          this.toastr.success("提交成功", "系统提示", {toastLife: 1500});
          //this.router.navigateByUrl("home");
        }
        return res;
      }).subscribe(
        data => {
          if (data.status == 0) {
            //this.router.navigateByUrl("home");
          }
        },
        error2 => {
          this.toastr.error("提交失败", "系统提示", {toastLife: 1500});
        }
      );

  }

}
