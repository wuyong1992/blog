import {Component, OnInit} from '@angular/core';
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {UserService} from "../user/service/user.service";
import {Headers} from "@angular/http";

const URL = 'http://localhost:8080/blog/rest/imgUpload';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  //true显示，false隐藏
  show: boolean = true;
  values: ImageFile[] = [];
  file: Array<Object>;
  token = localStorage.getItem("token");
  //heardToken = new Headers({"Authorization": "Bearer " + this.token});

  constructor(private router: Router,
              private toastr: ToastsManager,
              private userService: UserService) {
    this.file = [];

  }

  public uploader: FileUploader = new FileUploader(
    {
      url: URL,
      method: 'POST',
      authTokenHeader: "Authorization",
      authToken: "Bearer " + this.token
    }
  );

  //本地预览
  selectedFileOnChanged(event: any) {
    this.show = !this.show;

    let files = event.target.files;
    console.log(event);
    for (let i = 0; i < files.length; i++) {
      let imgFile = files[i];
      let file = new ImageFile();
      //TODO 判断文件类型
      //console.log(imgFile.type.match('image.*') + "");
      // if(imgFile.type.match('image.*')){
      //   continue;
      //}
      file.name = imgFile.name;
      file.size = imgFile.size;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);
      fileReader.onload = ((theFile) => {
        return (e) => {
          // console.log(e.target.result);
          let imgPath = e.target.result;
          file.filePath = imgPath;
          //console.log("base64路径");
          //console.log(imgPath);
        };
      })(imgFile);
      this.values.push(file);
    }
    //console.log(this.uploader.queue)
  }

  clear() {
    this.uploader.clearQueue();
    this.show = !this.show;
  }

  upload() {
    console.log("上传");
    this.uploader.queue[0].onError = (response: string, status: number, headers: ParsedResponseHeaders) => {
      if (status == 200) {
        this.toastr.success("上传成功", "系统提示", 2000)
      } else {
        this.toastr.error("token已过期，请重新登录", "系统提示", 2000);
        this.userService.logout();
        this.router.navigateByUrl("login")
      }
    };
    this.uploader.queue[0].upload();


    console.log("上传完毕")
  }

  ngOnInit(): void {

  }


}

class ImageFile {
  name: string;
  size: string;
  filePath: string;
}
