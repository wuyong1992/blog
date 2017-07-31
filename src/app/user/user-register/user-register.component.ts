import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {mobileValidator} from "../../validator/custom-validators";

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

    if (this.userForm.valid) {
      //也可以通过ngModel双向绑定
      this.user = this.userForm.value;
      console.log(this.user);
      console.log("开始调用service");
      /*this.user = user;
       console.log(this.user)*/
      this.userService.register(this.user)
        .subscribe(
          (data) => {
            // console.log(data);
            // console.log(JSON.parse(JSON.stringify(data))._body);
            // serverResponse 才是我想返回的数据
            let serverResponse = JSON.parse(JSON.stringify(data))._body;
            if (serverResponse.status == 0) {
              //注册成功后，跳转值登录页面
              //TODO 注册成功后，应该自动登录，跳转值首页
              this.toastr.success("注册成功！", "系统提示", {toastLife: 1500});
              //this.router.navigateByUrl("home");
            } else {
              this.toastr.error(serverResponse.msg + "", "系统提示", {toastLife: 1500});
            }
          },
          error => {
            alert(error.message)
          }
        );
      console.log("调用service结束");
    }
    else {
      this.toastr.error("请检查输入项", "系统提示", {toastLife: 3000});
      console.log(JSON.stringify(this.userForm.get("username").errors));
    }
  }


  builder(): void {
    this.userForm = this.fb.group({
      //['默认值',[校验器,校验器2,...]]
      mobile: ['', mobileValidator],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['']
    })
  }
}
