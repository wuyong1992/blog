import {ToastOptions} from "ng2-toastr";

export class ToastOptionSelf extends ToastOptions {
  animate = 'flyRight';
  newestOnTop = false;
  showCloseButton = true;
  positionClass: 'toast-top-full-width';  //无效
  dismiss = 'auto';
  toastLife:1000; //这里设置无效

}
