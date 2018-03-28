import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username:string='';
  message:string='';
  _chatsubscription;
  messages:object[]=[];
  constructor(public db:AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
    this.username=this.navParams.get('username');
   this._chatsubscription= this.db.list('/chat').valueChanges().subscribe( data => {
      console.log(data);
      // data.map( elem=>{
      //   this.messages.push(elem);
      // })
      this.messages=data;
    })
  }

  sendMessage(){
    this.db.list('/chat').push({
      username: this.username,
      message: this.message,
    }).then( ()=>{

    })
    this.message='';
  }

  ionViewWillLeave(){
    this._chatsubscription.unsubscribe();
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} a quitté la discussion`
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} a rejoint la discussion`
    })
  
  }

}
