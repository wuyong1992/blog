import {Injectable} from '@angular/core';
import {Blog} from "../model/blog-model";
import {Http, URLSearchParams, Headers, Response} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {SearchParams} from "../model/search-params";

@Injectable()
export class BlogService {


  public blog: Blog;

  public blogSaveURL = environment.blogSaveURL;
  public blogUpdateURL = environment.blogUpdateURL;
  public getAllBlogsUrl = environment.getAllBlogsUrl;
  public getBlogByIdUrl = environment.getBlogByIdUrl;


  constructor(private http: Http,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastsManager) {
  }

  //TODO save update with one url:SaveOrUpdate

  //提交新建blog保存表单
  public blogSave(blog: Blog, token: string) {
    let heard = new Headers({"Authorization": "Bearer " + token, "Content-Type": "application/json"});
    /*return this.http.post(this.blogSaveURL, JSON.stringify(blog), {headers: heardToken})
      .map(res => {
        let data = res.json();
        console.log("data object =>" + data);
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
      );*/
    return this.http
      .post(this.blogSaveURL, JSON.stringify(blog), {headers: heard})
      .map(this.extractData)
      .catch(this.handleError)
  }

  //提交blog更新表单
  public blogUpdate(blog: Blog, token: string) {
    let heard = new Headers({"Authorization": "Bearer " + token, "Content-Type": "application/json"});
    return this.http
      .post(this.blogUpdateURL, JSON.stringify(blog), {headers: heard})
      .map(this.extractData)
      .catch(this.handleError);
  }

  //获取所有的blog信息
  getAllBlogs() {
    return this.http.get(this.getAllBlogsUrl)
      .map(this.extractData)
      .catch(this.handleError)
  }

  //根据传输的id，来展示不同的blog
  getBlogById(id: number) {
    let data = new URLSearchParams();
    data.append("id", id + "");
    return this.http.post(this.getBlogByIdUrl, data)
      .map(this.extractData)
      .catch(this.handleError)
  }

  //根据搜索条件查找对应的blogs
  searchBlog(serachParams: SearchParams)
  {
    // return this.http.post()
  }

  //从可观察对象中提取数据
  private extractData(res: Response) {
    return res.json();
  }

  //http异常捕捉
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
