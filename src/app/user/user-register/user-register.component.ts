import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              public router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.builder()
  }

  ngOnInit() {

  }

  onSubmit() {
    this.user = this.userForm.value;
    console.log(this.user);
    console.log("开始调用service");
    /*this.user = user;
     console.log(this.user)*/
    this.userService.register(this.user)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.status == 0) {
            //注册成功后，跳转值登录页面
            //TODO 注册成功后，应该自动登录，跳转值首页
            this.router.navigateByUrl("login");
          } else {
            this.toastr.error("注册失败，请重新提交", "系统提示", {toastLife: 1000});
          }
        },
        error => {
          alert(error.message)
        }
      );
    console.log("调用service结束");
  }


  builder(): void {
    this.userForm = this.fb.group({
      username: [''],
      nickname: [''],
      password: ['']
    })
  }
}
