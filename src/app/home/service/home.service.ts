import {Injectable} from '@angular/core';
import {Blog} from "../../model/blog-model";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable()
export class HomeService {

  // private getAllBlogsUrl = environment.getAllBlogsUrl;

  constructor(private http: Http,) {
  }

  /*getAllBlogs() {
    return this.http.get(this.getAllBlogsUrl)
      .map(this.extractData)
      .catch(this.handleError)
  }*/


  //从可观察对象中提取数据
  private extractData(res: Response) {
    return res.json();
  }

  //http异常捕捉
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
