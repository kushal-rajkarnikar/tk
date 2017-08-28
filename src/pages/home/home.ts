import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { TimeServiceProvider } from '../../providers/time-service/time-service';
import moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timeList: any[];

  toSignInorOut: string = 'in';

  currentMoment: any;

  secondsRemaining: any;

  minutesRemaining: any;

  hoursRemaining: any;

  secondDifference: any;

  weeklyQuota: number = 32400;

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

      console.log(this.timeList);
      console.log(this.timeList[0].date);

    }
    else if (this.toSignInorOut == 'out'){

       //call function here to check if user has signed out before half of his working hours'

        this.outtime = this.currentMoment;

        this.toSignInorOut='in';
        // this.outtime = this.intime = this.currentMoment;
        this.timeList[this.timeList.length - 1].outtime = this.currentMoment.format('h:mm:ss A');

        this.secondDifference = this.outtime.diff(this.intime, 'seconds');

        this.secondsRemaining = this.weeklyQuota - this.secondDifference;

        this.weeklyQuota = this.secondsRemaining;

        this.minutesRemaining = Math.floor(this.secondsRemaining/60);

        this.hoursRemaining = Math.floor(this.minutesRemaining/60);

        this.minutesRemaining = Math.floor(this.secondsRemaining/60) % 60;

        this.secondsRemaining = this.secondsRemaining % 60;



    }

}



}
