import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../user/service/user.service";
import {User} from "../user/model/user-model";
// import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {
  ngDoCheck(): void {
  }

  public currentUser: User;

  constructor(private userService: UserService,
              // private toast: ToastsManager,
              private router:Router) {

  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser")).data;
    }
    console.log(this.currentUser);
    console.log("初始化");

    this.userService.currentUser
      .subscribe(
      data =>{
        this.currentUser =data;
        console.log("订阅的data:\t"+data)
      }
    )
  }

  userLogin() {
    // alert("弹框");
  }

  /*ngOnChanges() {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser);
    console.log("ngOnChanges")
  }*/

  doLogout(){
    this.userService.logout();
    // this.toast.success("成功退出", "系统提示");
    alert("成功退出");
    this.router.navigateByUrl("home");
  }

}
