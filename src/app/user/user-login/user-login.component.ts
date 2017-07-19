import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user-model";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";


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
              private router: Router) {
  }

  ngOnInit() {
    this.builder();
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser")).data;
    }
  }

  builder(): void {
    this.userForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  onLogin() {
    this.user = this.userForm.value;
    // this.userService.returnCurrentUser();
    // this.userService.getCurrentUser(this.user);
    // console.log("发起请求之后");
    // this.userService.returnCurrentUser();
    // console.log(this.userService.currentUser.nickname);
    // console.log(this.currentUser.username);

    this.userService.login(this.user);
      /*.subscribe(
        data =>{
          if (data.status == 0) {
            console.log("登陆成功");
            this.router.navigateByUrl("home");
            this.userService.currentUser = data.data;
            console.log("登录成功，返回data已经放入service" + this.userService.currentUser.nickname);
          /!*  localStorage.setItem("currentUser", data.data);
            console.log(localStorage.getItem("存储currentUser"));*!/
            /!*this.currentUser = this.localStorage.getObject("currentUser");
            console.log(this.currentUser.nickname)*!/
          } else {
            alert("登录失败");
          }
        },
        error2 => {
          alert("登录失败");
        }
      );*/
  }

}
