import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {UserService} from "../user/service/user.service";
import {User} from "../user/model/user-model";
// import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  ngDoCheck(): void {
  }

  public currentUser: User;

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastsManager,) {

  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    console.log("初始化");

    this.userService.currentUser
      .subscribe(
        data => {
          this.currentUser = data;
          console.log("订阅的data:\t" + data)
        }
      )
  }

  doLogout() {
    this.userService.logout();
    // this.toast.success("成功退出", "系统提示");
    this.router.navigateByUrl("home");
  }

  toast() {
    this.toastr.success("ok!", "系统提示", {toastLife: 1000});
  }

}
