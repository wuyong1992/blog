import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/service/user.service";
import {User} from "../user/model/user-model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser: User;

  constructor(private userService:UserService) {

  }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser.nickname);
    console.log("初始化")
  }

  userLogin() {
    // alert("弹框");
  }
}
