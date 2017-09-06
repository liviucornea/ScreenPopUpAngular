import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription'
import * as SockJS from 'sockjs-client';
const Stomp = require('stompjs/lib/stomp').Stomp;

// import * as Stomp from 'stompjs/lib/stomp';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.components.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Widget call control app';
  agentId = '1234';
  stationNbr = '787';
  accountNbr = '432345';
  cardNbr = '5554344';
  wsResponse = '';
  websocket: any;
  private socketSubscription: Subscription;
  private subscription: any;
 private  stompClient: any;
  constructor() {
    const self = this;
     // configuration
    const socketNew = new SockJS('http://localhost:8080/websocket/gs-guide-websocket');
    self.stompClient = Stomp.over(socketNew);
    self.stompClient.connect({}, function (frame) {
      console.log('StompClient Connected : ' + frame);
      self.stompClient.subscribe('/topic/greetings', self.response);
    }, function (err) {
      console.log('err', err);
    });
/*
    stomp.configure({
      host: 'http://localhost:8080/gs-guide-websocket',
      debug: true,
      queue: {'init': false}
    });

    // start connection
    stomp.startConnect().then(() => {
      stomp.done('init');
      console.log('Stomp cnnected');

      // subscribe
   //   this.subscription = stomp.subscribe('/topic/greetings', this.response);
    });
*/
this.getWebSochect();
  }

  sendMessage( message: string) {
    // send data
 //  this.stomp.send('/app/hello', {}, JSON.stringify({'name': 'Liviu Cornea'}));
   this.stompClient.send('/app/hello', {}, JSON.stringify({'name': message}));
    this.websocket.send('{"name":"' + message + '"}');
  }


  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
    // unsubscribe
    this.subscription.unsubscribe();
    this.stompClient.disconnect();


  }

// response
  public response = (data) => {
    this.wsResponse =  JSON.parse(data.body).content;
      // console.log('Uite ca merge: ' + data)
  }

  public responsWS = (data) => {
    this.wsResponse = JSON.parse(data).name;
}

  getWebSochect() {
    const self = this;
  //  ws://localhost:8080/websocket/cinemaSocket/0
    const wsUri = 'ws://localhost:8080/websocket/cinemaSocket/5';
    this.websocket = new WebSocket(wsUri);
    self.websocket.onopen = function (event) {
      self.websocket.send('Here\'s some text that the server is urgently awaiting!');
    };
     self.websocket.onmessage = function(evt) {// self.response(evt.data)
      console.log('Data Received by pure websocket');
      self.responsWS(evt.data);
       };

  }

}
