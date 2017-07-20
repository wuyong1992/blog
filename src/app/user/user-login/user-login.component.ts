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

    this.userService.login(this.user);

  }

}
