import {Injectable} from '@angular/core';
import {User} from "../model/user-model";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class UserService {

  public responseData: Observable<any>;
  public userRegisterURL = "http://localhost:8080/user/test";
  public serverResponse: any;

  constructor(private http:Http) {
  }

  //向后台post数据的写法如下
  // let data = new URLSearchParams();
  // data.append('email', user.email);
  // data.append('password', user.password);
  // return this.http.post(this.userRegisterURL,data);

  public register(user: User) {
    console.log("发送http.post请求");
    let data = new URLSearchParams();
    data.append("username", user.username);
    data.append("nickname", user.nickname);
    data.append("password", user.password);
    return this.http.post(this.userRegisterURL, data).map(res => res.json());
  }
}
