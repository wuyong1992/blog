import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user-model";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


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
    console.log(this.user);
    this.userService.login(this.user).subscribe(
      data => {
        console.log(data);
        if (data.status == 0) {
          let token = data.data;
          localStorage.setItem("token", token);
          this.userService.getCurrentUserWithToken(token).subscribe(
            data => {
              if (data.status == 0) {
                this.currentUser = data.data;
                console.log("当前用户:"+this.currentUser);
                localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                this.toastr.success("登陆成功", "系统提示", {toastLife: 1500});
                this.router.navigateByUrl("home");
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
