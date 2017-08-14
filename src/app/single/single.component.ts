import {Component, OnInit} from '@angular/core';
import {HomeService} from "../home/service/home.service";
import {ToastsManager} from "ng2-toastr";
import {Blog} from "../blogs/model/blog-model";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public blogList: Blog[];

  constructor(private homeService: HomeService,
              private  toastr: ToastsManager) {
  }

  ngOnInit() {

    this.homeService.getAllBlogs()
      .subscribe(
        data => {
          console.log("blogList====>" + JSON.stringify(data))
          if (data.status == 0) {
            this.blogList = data.data
          }
          else {
            this.toastr.error("获取Blog信息出错", "系统提示!", 2500)
          }
        },
        error2 => {
          this.toastr.error("获取Blog信息出错" + error2.message, "系统提示!", 2500)
        }
      )

  }


}
