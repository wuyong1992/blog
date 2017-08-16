import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {Category} from "../model/category";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public categorys: Category[];
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastsManager,
              private categoryService:CategoryService) {
  }

  ngOnInit() {
    this.build();
    this.getCategorys();
  }

  build() {
    this.searchForm = this.fb.group({
        searchTitle: ['',Validators.maxLength(25)],
        searchCategory: ['-1']      //-1全部分类
      }
    );
  }

  getCategorys()
  {
    this.categoryService.getCategorys()
      .subscribe(
        data=> {
          if (data.status == 0) {
            this.categorys = data.data;
          }
          else {
            this.toastr.warning("获取分类异常","系统提示",2500)
          }
        },
        error2 => {
          this.toastr.warning("获取分类异常","系统提示",2500)
        }
      )
  }


  onSearch() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value)

    }

  }
}
