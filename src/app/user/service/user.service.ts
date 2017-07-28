import {Injectable, ViewContainerRef} from '@angular/core';
import {User} from "../model/user-model";
import {Http, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class UserService {

  public responseData: Observable<any>;
  public userRegisterURL = "http://localhost:8080/user/register";
  public userLoginURL = "http://localhost:8080/user/login";
  public userIsLoginURL = "http://localhost:8080/user/isLogin";
  public userLogoutURL = "http://localhost:8080/user/logout";
  public subject: Subject<User> = new Subject<User>();

  // public currentUser: User = new User;

  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }


  constructor(private http: Http,
              private router: Router,
              private toastr: ToastsManager) {
  }


  //注册
  public register(user: User) {
    console.log("发送http.post请求");
    /*let data = new URLSearchParams();
    data.append("username", user.username);
    data.append("nickname", user.nickname);
    data.append("password", user.password);*/
    let header = new Headers({'Content-Type': 'application/json'});
    //return this.http.post(this.userRegisterURL, data).map(res => res.json());
    return this.http.post(this.userRegisterURL, JSON.stringify(user), {headers: header});
  }

  //登录
  public login(user: User) {
    console.log("登录");
    let data = new URLSearchParams();
    data.append("username", user.username);
    data.append("password", user.password);
    return this.http.post(this.userLoginURL, data)
      .map(res => {
        let user = res.json().data;
        console.log("user object =>" + JSON.stringify(user));
        // console.log("user data =>" + res.json().data.status);
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          //一定得是user.data,这返回的才是user对象
          this.subject.next(Object.assign({}, user));

          console.log("currentUser" + localStorage.getItem("currentUser"));
          this.toastr.success("登陆成功", "系统提示", {toastLife: 1500});
          this.router.navigateByUrl("home");
        } else {
          this.toastr.error(res.json().msg+"", "系统提示", {toastLife: 2500});
        }
        return res;
      }).subscribe(
        data => {
          if (data.status == 0) {
            //this.router.navigateByUrl("home");
          }
        },
        error2 => {
          this.toastr.error("登陆失败", "系统提示", {toastLife: 1500});
        }
      );
  }

  //退出
  public logout() {
    //远端session中删除currentUser
    let data = new URLSearchParams();
    this.http.post(this.userLogoutURL, data).map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          if (data.status == 0) {
            //本地缓存中删除currentUser
            console.log("退出中....");
            localStorage.removeItem("currentUser");
            this.subject.next(Object.assign({}));
            this.toastr.success("ok!", "系统提示", {toastLife: 1500});
          } else {
            this.toastr.error("退出失败", "系统提示", {toastLife: 1500});
          }
        },
        error2 => {
          console.log(error2.message);
          this.toastr.error("退出失败", "系统提示", {toastLife: 1500});
        }
      );
  }

  //是否登录
  public isLogin() {
    this.http.get(this.userIsLoginURL).map(res => res.json())
      .subscribe(
        data => {
          return data.status == 0;
        }
      )
  }


}
