import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {mobileValidator} from "../../validator/custom-validators";
import {Http, URLSearchParams, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ServerResponse} from "../../server-response";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public validateMobile = "http://localhost:8080/user/validateMobile";
  public userForm: FormGroup;
  public user: User;
  public serverResponse: ServerResponse;
  public registered: boolean = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              public router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private http: Http) {
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
          res => {
            this.serverResponse = res;
            if (this.serverResponse.status == 0) {
              //注册成功后，跳转值登录页面
              //TODO 注册成功后，应该自动登录，跳转值首页
              this.toastr.success("注册成功！", "系统提示", {toastLife: 1500});
              this.router.navigateByUrl("home");
            } else {
              this.toastr.error(this.serverResponse.msg + "", "系统提示", {toastLife: 1500});
            }
          },
          error => {
            this.toastr.error(error.message + "", "系统提示", {toastLife: 1500})
          }
        );
      console.log("调用service结束");
    }
    else {
      this.toastr.error("请检查输入项", "系统提示", {toastLife: 3000});
      //console.log(JSON.stringify(this.userForm.get("username").errors));
    }
  }


  builder(): void {
    this.userForm = this.fb.group({
      //['默认值',[校验器,校验器2,...],异步校验]
      // mobile: ['', mobileValidator, this.mobileAsyncValidator],
      mobile: ['', mobileValidator],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    })
  }

//异步校验，手机号是否已经被注册
  /*mobileAsyncValidator(control: FormControl): any {

    let flag = false;

    let data = new URLSearchParams();
    data.append("mobile", control.value);
    this.http.post(this.validateMobile, data)
      .subscribe(
        data => {
          console.log(data);
        }
      );

    var myreg = /^1[3|4|5|8][0-9]\d{8}$/;
    let valid = myreg.test(control.value);
    // console.log("mobile校验结果:" + valid);
    return Observable.of(valid ? null : {mobile: {msg: "异步校验"}}).delay(2000);
  }*/

}



