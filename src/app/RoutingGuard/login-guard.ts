import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable, OnInit} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {Http} from "@angular/http";
import {User} from "../model/user-model";
import {UserService} from "../service/user.service";

/**
 * 路由守卫
 * 注意：注入Router 必须使用注解!!!
 */
//是否已经登录守卫

@Injectable()
export class LoginGuard implements CanActivate ,OnInit{


  public token: string;
  public currentUser: User;
  constructor(private router: Router,
              private toastr: ToastsManager,
              private http:Http,
              private userService:UserService) {

  }

  ngOnInit(): void {

  }

  canActivate(): boolean {
    if (localStorage.getItem("currentUser") != "" && localStorage.getItem("token") != "") {
      //已经登录
      return true;
    } else {
      //并没有登录
      this.toastr.warning("请先登录!", "系统提示:");
      this.router.navigateByUrl("login");
      return false;
    }
  }

}
