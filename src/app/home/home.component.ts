import {Component, OnInit} from '@angular/core';
import {HomeService} from "./service/home.service";
import {Blog} from "../blogs/model/blog-model";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private homeService: HomeService,
              private  toastr: ToastsManager) {
  }

  ngOnInit() {

  }


}
