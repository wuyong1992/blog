import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user-model";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
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
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
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

    this.userService.login(this.user).subscribe(
      data => {
        this.currentUser = data.data;
        if (this.currentUser.status == 0) {
          localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
          localStorage.setItem("token", "");
          this.toastr.success("登陆成功", "系统提示", {toastLife: 1500});
          this.router.navigateByUrl("home");
        }
      }
    );

  }

}
