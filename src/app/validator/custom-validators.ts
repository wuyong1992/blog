import {AbstractControl, FormControl} from "@angular/forms";


//校验器构造形式
/*xxx(control: AbstractControl): { [key: string]: any } {
  return null
}*/

export function mobileValidator(control: FormControl): any {
  //手机号正则
  var myreg = /^1[3|4|5|8][0-9]\d{8}$/;
  let valid = myreg.test(control.value);
  // console.log("mobile校验结果:" + valid);
  return valid ? null : {mobile: "不符合手机号正则"};
}


