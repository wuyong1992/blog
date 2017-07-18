import {Injectable} from '@angular/core';
import {User} from "../model/user-model";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class UserService {

  public responseData: Observable<any>;
  public userRegisterURL = "http://localhost:8080/user/register";
  public userLoginURL = "http://localhost:8080/user/login";
  public currentUser: User = new User;


  constructor(private http: Http) {
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
    return this.http.post(this.userLoginURL, data).map(res => res.json());
  }

  //获取当前用户
  public getCurrentUser(user: User){
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
        console.log(error.message)
      }
    )
  }
}
