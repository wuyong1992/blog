import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {UserService} from "../user/service/user.service";
import {User} from "../model/user-model";
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
  public service: UserService;

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastsManager) {

  }

  ngOnInit() {
    if (localStorage.getItem("currentUser") != null && localStorage.getItem("currentUser") != "") {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    this.userService.currentUser
      .subscribe(
        data => {
          this.currentUser = data;
        }
      )
  }

  doLogout() {
    this.userService.logout();
    this.toastr.success("退出成功", "系统提示", {toastLife: 1000});
    this.router.navigateByUrl("home");
  }

  toast() {
    this.toastr.success("ok!", "系统提示", {toastLife: 1000});
  }

}
