import {AbstractControl, FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";


//校验器构造形式
/*xxx(control: AbstractControl): { [key: string]: any } {
  return null
}*/

export function mobileValidator(control: FormControl): any {
  //手机号正则
  var myreg = /^1[3|4|5|8][0-9]\d{8}$/;
  let valid = myreg.test(control.value);
  // console.log("mobile校验结果:" + valid);
  return valid ? null : {mobile: {msg: "请输入11位正确格式的手机号码"}};
}

//异步校验，手机号是否已经被注册
/*export function mobileAsyncValidator(control: FormControl,http:Http): any {



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

