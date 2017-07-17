import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user-model";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;

  constructor(private userService: UserService,
              private fb: FormBuilder) {
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
          alert("注册成功");
        }else {
          alert("注册失败");
        }
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
