import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { File } from '@ionic-native/file';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
// import { Storage } from '@ionic/storage';

/*
  Generated class for the TimeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TimeServiceProvider {

  private url: string = "json/timelog.json";

  constructor(private http: Http) {
    // console.log('Hello TimeServiceProvider Provider');
    // this.storage.set('name', 'Max');
  
  }

  


    getTimeLog(){
      return this.http.get(this.url)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }



    private catchError(error: Response | any){
      console.log(error);
      return Observable.throw(error.json().error || "Server error.");
    }

    private logResponse(res: Response){
      // console.log(res);
    }

    private extractData(res: Response){
      return res.json();
    }




}
