import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../model/user-model";
import {UserService} from "../../service/user.service";
import {Router, RouterStateSnapshot} from "@angular/router";
import {ToastsManager} from "ng2-toastr";



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;
  public currentUser: User = new User;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.builder();
    if (localStorage.getItem("currentUser") != null && localStorage.getItem("currentUser")!="" ) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  builder(): void {
    this.userForm = this.fb.group({
      mobile: [''],
      password: ['']
    })
  }

  onLogin() {
    this.user = this.userForm.value;
    this.userService.login(this.user).subscribe(
      data => {
        if (data.status == 0) {
          let token = data.data;
          localStorage.setItem("token", token);
          this.userService.getCurrentUserWithToken(token).subscribe(
            data => {
              if (data.status == 0) {
                this.currentUser = data.data;
                localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                this.toastr.success("登陆成功", "系统提示", {toastLife: 1500});
                let routerStateSnapshot: RouterStateSnapshot = this.router.routerState.snapshot;  //路由快照
                if (routerStateSnapshot.url.indexOf("/login") == 0) {
                  this.router.navigateByUrl("home");  //如果是从 /login 这个路径登录则跳转，负责不跳转
                }
              }
              if (data.status == 10) {
                this.toastr.warning("Token已过期，需要重新登录", "系统提示", {toastLife: 1500});
                localStorage.setItem("token", "");
                localStorage.setItem("currentUser", "");
              }
            },
            error2 => {
              this.toastr.error(error2.message + "", "系统提示", {toastLife: 1500});
            }
          )

        }
      },
      error2 => {
        this.toastr.error(error2.message + "", "系统提示", {toastLife: 1500});
      }
    );

  }

}
