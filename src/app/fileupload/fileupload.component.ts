import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";

const URL = 'http://localhost:8080/blog/imgUpload';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {


  values: ImageFile[] = [];
  file: Array<Object>;

  constructor() {
    this.file = [];
  }

  public uploader: FileUploader = new FileUploader(
    {
      url: URL,
      method: 'POST'
    }
  );

  //本地预览
  selectedFileOnChanged(event: any) {
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



  ngOnInit(): void {
  }

}

class ImageFile {
  name: string;
  size: string;
  filePath: string;
}