import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {

  froala: string;

  constructor() {
    this.froala = "";
  }

  ngOnInit() {
  }

  froalaContent(event: string) {
    this.froala = event;
  }

}
