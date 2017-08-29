import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription'
import {ServerSocketService} from "./server-socket.service";

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

  constructor(private socket: ServerSocketService) {
    const stream = this.socket.connect();

    this.socketSubscription = stream.subscribe(message => {
      console.log('received message from server: ', message)
    }
  );

    // send message to server, if the socket is not connected it will be sent
    // as soon as the connection becomes available thanks to QueueingSubject
    // commented this line for now
    this.socket.send({type: 'helloServer'})
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe()
  }


}
