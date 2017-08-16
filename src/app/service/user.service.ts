import {Injectable, ViewContainerRef} from '@angular/core';
import {User} from "../model/user-model";
import {Http, URLSearchParams, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {

  public responseData: Observable<any>;
  public userRegisterURL = environment.userRegisterURL;
  public userLoginURL = environment.userLoginURL;
  public userIsLoginURL = environment.userIsLoginURL;
  public userLogoutURL = environment.userLogoutURL;
  public getCurrentUserWithTokenUrl = environment.getCurrentUserWithTokenUrl;
  public subject: Subject<User> = new Subject<User>();
  public logined:boolean = false;

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
    let data = new URLSearchParams();
    data.append("mobile", user.mobile + "");
    data.append("password", user.password);
    //let header = new Headers({'Content-Type': 'application/json'});
    //return this.http.post(this.userRegisterURL, data).map(res => res.json());
    return this.http
      .post(this.userRegisterURL, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //账号登录获取token
  /*public login(user: User) {
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
          this.toastr.error(res.json().msg + "", "系统提示", {toastLife: 2500});
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
  }*/
  public login(user: User) {
    let data = new URLSearchParams();
    data.append("mobile", user.mobile + "");
    data.append("password", user.password);
    return this.http.post(this.userLoginURL, data)
      .map(this.extractData)
      .catch(this.handleError)
  }

  //发送token，获取当前用户信息
  public getCurrentUserWithToken(token: string) {
    let heardToken = new Headers({"Authorization": "Bearer " + token})
    return this.http
      .get(this.getCurrentUserWithTokenUrl, {headers: heardToken})
      .map(
        res => {
          let user = res.json().data;
          this.subject.next(Object.assign({}, user));
          return res.json();
        })
      .catch(this.handleError);
  }

  //退出
  public logout() {
    /*//远端session中删除currentUser
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
      );*/

    localStorage.setItem("currentUser", "");
    localStorage.setItem("token", "");
    this.subject.next(Object.assign({}));
  }

  //是否登录
  public checkLogin() {
    /*this.http.get(this.userIsLoginURL).map(res => res.json())
      .subscribe(
        data => {
          return data.status == 0;
        }
      )*/

    if (localStorage.getItem("currentUser") != "" && localStorage.getItem("token") != "") {
      let heardToken = new Headers({"Authorization": "Bearer " + localStorage.getItem("token")});
      this.http.get(this.userIsLoginURL, {headers: heardToken})
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(
          data=>{
            this.logined = data.status == 0;
          },
          error2 => {
            this.logined = false;
          }
        );
      return this.logined;
    } else {
      return this.logined;
    }
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
