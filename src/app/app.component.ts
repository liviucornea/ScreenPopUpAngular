import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription'
import {ServerSocketService} from './server-socket.service';
import {StompService} from 'ng2-stomp-service';

import * as SockJS from 'sockjs-client';
const Stomp = require('stompjs/lib/stomp').Stomp;


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

  private socketSubscription: Subscription;
  private subscription: any;
 private  stompClient: any;
  constructor(private socket: ServerSocketService, private stomp: StompService) {
     // configuration

    const socketNew = new SockJS('http://localhost:8080/websocket/gs-guide-websocket');
    this.stompClient = Stomp.over(socketNew);
    const self = this;
    this.stompClient.connect({}, function (frame) {
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
  }

  sendMessage() {
    // send data
 //  this.stomp.send('/app/hello', {}, JSON.stringify({'name': 'Liviu Cornea'}));
   this.stompClient.send('/app/hello', {}, JSON.stringify({'name': 'Liviu Cornea'}));
  }


  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
    // unsubscribe
    this.subscription.unsubscribe();


    // disconnect
    this.stomp.disconnect().then(() => {
      console.log('Connection closed')
    })
  }

// response
  public response = (data) => {
    console.log('Uite ca merge: ' + data)
  }

}
