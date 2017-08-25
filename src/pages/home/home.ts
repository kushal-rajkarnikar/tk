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


	items: any[];

  toSignInorOut: string = 'in';

  currentMoment: any;

  date = moment().format('YYYYMMDD');

  day = moment().format('dddd');
  //get current time in h:mm A format
  time = moment().format('h:mm:ss A');

  intime: any;
  outtime: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private timeService: TimeServiceProvider) {

  // this.timeList = this.getTimeLog();
  this.getTimeLog();

  }// end of constructor

  getTimeLog(){
    this.timeService.getTimeLog().subscribe(data => this.timeList = data);
  }

  presentToast(){

    this.currentMoment = moment();

    let Toast = this.toastCtrl.create({
      message: 'You signed ' + this.toSignInorOut + ' at ' + this.currentMoment.format('h:mm:ss A'),
      duration: 3000,
      position: 'top'
    });

    Toast.present();

    if (this.toSignInorOut == 'in'){
      this.toSignInorOut='out';
      this.intime = this.currentMoment;
      this.timeList[this.timeList.length] =
      {
        'date': this.currentMoment.format('YYYYMMDD'),
        'day': this.currentMoment.format('dddd'),
        'intime': this.currentMoment.format('h:mm:ss A')
      };

      // this.timeList[this.timeList.length].day = this.day;
      // this.timeList[this.timeList.length].intime = this.time;

      console.log(this.timeList);
      console.log(this.timeList[0].date);
    }
    else if (this.toSignInorOut == 'out'){

       //call function here to check if user has signed out before half of his working hours

        //alert('current in time ' + this.intime + '.\nout time is ' + this.currentMoment + '.\ndifference is '+ this.currentMoment.diff(this.intime, 'seconds'));
        this.toSignInorOut='in';
        this.outtime = this.intime = this.currentMoment;
        this.timeList[this.timeList.length - 1].outtime = this.currentMoment.format('h:mm:ss A');

    }

}

  itemSelected(item){
  		this.navCtrl.push(DetailPage, {
			item: item
  		});
  }


}
