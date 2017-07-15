import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public userForm: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder) {
    this.builder()
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.userForm.value)
  }


  builder():void {
    this.userForm = this.fb.group({
      username: [''],
      nickname: [''],
      password: ['']
    })
  }
}
