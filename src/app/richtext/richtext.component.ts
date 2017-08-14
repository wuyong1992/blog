import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  styleUrls: ['./richtext.component.css']
})
export class RichtextComponent implements OnInit {

  @Output()
  froala: EventEmitter<string> = new EventEmitter();

  froalaText: string;

  constructor() {
    this.froalaText = "";

  }

  //配置项
  public options: Object;

  ngOnInit(): void {
    this.froalaEditorinit();
  }

  froalaEditorinit(){
    var that = this;

    this.options = {
      height: 200,        //初始化高度
      language: "zh_cn", //配置语言
      placeholderText: "请输入内容", // 文本框提示内容
      charCounterCount: true, // 是否开启统计字数
      //charCounterMax: 200, // 最大输入字数,目前只支持英文字母
      // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
      // toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'align', 'insertLink', 'insertImage', 'insertHR', 'subscript', 'superscript'],
      codeMirror: true, // 高亮显示html代码
      codeMirrorOptions: { // 配置html代码参数
        tabSize: 4
      },
      // 上传图片，视频等稳健配置
      imageAllowedTypes: ['jpg', 'jpeg', 'png', 'gif', 'svg+xml'],
      imageUploadURL: "http://localhost:8080/blog/editorImgUpload",
      imageUploadParams: {},//接口其他传参,默认为空对象{},
      imageMaxSize:1024*1024*10,
      imagePaste:true,
      imageDefaultDisplay:'block',
      // imageMultipleStyles: true,
      // imageAltButtons: ['imageBack']
      imageDefaultAlign: 'center',  //图片显示对齐方式
      imageDefaultWidth: 0,         //默认宽度，0表示不设置宽度
      //文件上传
      fileAllowedTypes: ['*'],
      fileMaxSize: 1073741824,  //1G 字节为单位
      fileUploadMethod: 'POST',
      fileUploadURL: 'http://localhost:8080/blog/editorImgUpload',

      //事件
      events: {
        'froalaEditor.keyup': function (e, editor,keyupEvent) {
          that.froala.emit(keyupEvent.target.innerHTML);
          //console.log(that.froalaText);
          //console.log(keyupEvent.target.innerHTML);
        },
        "froalaEditor.blur":function (e,editor,keyupEvent) {
          that.froala.emit(keyupEvent.target.innerHTML);
          //console.log(keyupEvent.target.innerHTML)
        }
      }

    };
  }

}
