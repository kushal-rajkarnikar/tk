import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

import { TimeServiceProvider } from '../../providers/time-service/time-service';
import moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timeList: any[];
  toda

	items: any[];
  toSignInorOut: string = 'in';

  date = moment().format('YYYYMMDD');

  day = moment().format('DDDD');
  //get current time in h:mm A format
  time = moment().format('h:mm:ss A');

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private timeService: TimeServiceProvider) {

  // this.timeList = this.getTimeLog();
  this.getTimeLog();

  }// end of constructor

  getTimeLog(){
    this.timeService.getTimeLog().subscribe(data => this.timeList = data);
  }

  presentToast(){

    let Toast = this.toastCtrl.create({
      message: 'You signed ' + this.toSignInorOut + ' at ' + this.time,
      duration: 3000,
      position: 'top'
    });
    Toast.present();
    // this.toSignInorOut=='in'?'out':'in';
    if (this.toSignInorOut == 'in'){
      this.toSignInorOut='out';

      console.log(this.timeList.lastIndexOf);
      console.log(this.timeList);
    }
    else if (this.toSignInorOut == 'out'){
        this.toSignInorOut='in';
    }
}

  itemSelected(item){
  		this.navCtrl.push(DetailPage, {
			item: item
  		});
  }


}
