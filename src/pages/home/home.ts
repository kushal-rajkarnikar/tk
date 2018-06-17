import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { TimeServiceProvider } from '../../providers/time-service/time-service';
import moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timeList: any[];

  timelist: any[];

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

  customToastMessage: string;

  customConfirmTitle: string = 'Leaving so soon?';

  customConfirmMessage: string = 'Your working hours is less than half a day. Are you sure you want to sign out?';

  intime: any;
  outtime: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private timeService: TimeServiceProvider, private alertctrl: AlertController, public actionSheetCtrl: ActionSheetController) {

   

  // this.timeList = this.getTimeLog();
  this.getTimeLog();

  }// end of constructor

  getTimeLog(){
    this.timeService.getTimeLog().subscribe(data => this.timeList = data);
    this.getDataOfThisWeek();
    
  }

  getDataOfThisWeek(){
    //this.currentMoment = moment();    
    
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Day Actions',
      buttons: [
        {
          text: 'Edit Time',
          role: 'destructive',
          icon:  'create',
          handler: () => {
            console.log('clicked on edit');
          }
        },
        {
          text: 'Mark as Half Day',
          role: 'destructive',
          icon: 'star-half',
          handler: () => {
            console.log('clicked on half day');
          }
        },
        {
          text: 'Mark as Leave',
          role: 'destructive',
          icon: 'star',
          handler: () => {
            console.log('clicked on mark as leave');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentConfirm(){
    let alert = this.alertctrl.create({
      title: this.customConfirmTitle,
      message: this.customConfirmMessage,
      buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler:() => {

        }
      },
      {
        text: this.customConfirmTitle=="It's Saturday Mate!"||"It's Sunday Mate!"?"Yes":"Sign Out",
        role: 'cancel',
        handler:() => {

        }
      }
      ]
    });
    alert.present();
  }

  presentToast(){

    this.currentMoment = moment();

    let Toast = this.toastCtrl.create({
      message: this.customToastMessage,
      duration: 3000,
      position: 'top'
    });

    // let CustomToast = this.toastCtrl.create({
    //   message: this.customToastMessage,
    //   duration: 3000,
    //   position: 'bottom'
    // })



    if (this.toSignInorOut == 'in'){
      console.log(this.timeList[this.timeList.length - 1].date);

      if (this.timeList[this.timeList.length - 1].date == this.currentMoment.format('YYYYMMDD')){
        this.customToastMessage = "Hey you already signed in today!";
        Toast.present();
        // console.log("");
      } 
      else if (this.currentMoment.format('dddd') == "Saturday"){
        this.customConfirmTitle = "It's Saturday Mate!";
          this.customConfirmMessage = "Hey today's Satuday! Working over time?";
          this.presentConfirm();
      }
      else if (this.currentMoment.format('dddd') == "Sunday"){
        this.customConfirmTitle = "It's Sunday Mate!";
        this.customConfirmMessage = "Hey today's Sunday! Working over time?";
        this.presentConfirm();
    }
      else {
        this.customToastMessage = 'You signed ' + this.toSignInorOut + ' at ' + this.currentMoment.format('h:mm:ss A');
        Toast.present();
        this.intime = this.currentMoment;
        this.timeList[this.timeList.length] =
      {
        'date': this.currentMoment.format('YYYYMMDD'),
        'day': this.currentMoment.format('dddd'),
        'intime': this.currentMoment.format('h:mm:ss A')
      };
      this.toSignInorOut='out';
      }

      
      

      // console.log(this.timeList);

      //console.log(this.timeList[0].date);

      

    }
    else if (this.toSignInorOut == 'out'){

       //call function here to check if user has signed out before half of his working hours'

        this.outtime = this.currentMoment;

        this.toSignInorOut='in';
        // this.outtime = this.intime = this.currentMoment;

        this.secondDifference = this.outtime.diff(this.intime, 'seconds');

        if (this.secondDifference < 16200){
           this.presentConfirm();
        }
        else {
          Toast.present();
          this.timeList[this.timeList.length - 1].outtime = this.currentMoment.format('h:mm:ss A');

          this.secondsRemaining = this.weeklyQuota - this.secondDifference;

          this.weeklyQuota = this.secondsRemaining;

          this.minutesRemaining = Math.floor(this.secondsRemaining/60);

          this.hoursRemaining = Math.floor(this.minutesRemaining/60);

          this.minutesRemaining = Math.floor(this.secondsRemaining/60) % 60;

          this.secondsRemaining = this.secondsRemaining % 60;
        }





    }

}



}
