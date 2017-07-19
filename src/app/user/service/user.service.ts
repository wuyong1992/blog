import {Injectable} from '@angular/core';
import {User} from "../model/user-model";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  public responseData: Observable<any>;
  public userRegisterURL = "http://localhost:8080/user/register";
  public userLoginURL = "http://localhost:8080/user/login";
  public userIsLoginURL = "http://localhost:8080/user/isLogin";
  public userLogoutURL = "http://localhost:8080/user/logout";
  public subject: Subject<User> = new Subject<User>();
  // public currentUser: User = new User;

  public get currentUser():Observable<User>{
    return this.subject.asObservable();
  }


  constructor(private http: Http,
              private router:Router) {
  }

  //向后台post数据的写法如下
  // let data = new URLSearchParams();
  // data.append('email', user.email);
  // data.append('password', user.password);
  // return this.http.post(this.userRegisterURL,data);

  //注册
  public register(user: User) {
    console.log("发送http.post请求");
    let data = new URLSearchParams();
    data.append("username", user.username);
    data.append("nickname", user.nickname);
    data.append("password", user.password);
    return this.http.post(this.userRegisterURL, data).map(res => res.json());
  }

  //登录
  public login(user: User) {
    console.log("登录");
    let data = new URLSearchParams();
    data.append("username", user.username);
    data.append("password", user.password);
    return this.http.post(this.userLoginURL, data)
      .map(res => {
        let user = res.json();
        console.log("user object =>" + user);
        // console.log("user data =>" + res.json().data.status);
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          //一定得是user.data,这返回的才是user对象
          this.subject.next(Object.assign({},user.data));

          console.log(localStorage.getItem("currentUser"));
          this.router.navigateByUrl("home");
        }
        return res;
      }).subscribe(
        data =>{
          if (data.status == 0) {
            this.router.navigateByUrl("home");
          }
        },
        error2 => {
          alert("登录失败");
        }
      );
  }

  //退出
  public logout(){
    //远端session中删除currentUser
    this.http.get(this.userLogoutURL)
      .subscribe(
        data =>{
          if (data.status == 0) {
            //本地缓存中删除currentUser
            localStorage.removeItem("currentUser");
            this.subject.next(Object.assign({}));
          }else {
            alert("退出失败");
          }
        },
        error2 => {
          alert("退出失败");
        }
      );
  }



  //获取当前用户
  /*public getCurrentUser(user: User):User{
    this.login(user).subscribe(
      data => {
        if (data.status == 0) {
          this.currentUser = data.data;
          console.log(this.currentUser);
          return this.currentUser;
        }
        else {
          alert(data.msg);
          return null;
        }
      },
      error => {
        console.log(error.message);
        return null;
      }
    );
    return null;
  }*/

  /*public returnCurrentUser():User{
    console.log(this.currentUser);
    return this.currentUser;
  }*/

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
