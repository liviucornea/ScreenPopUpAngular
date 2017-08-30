import {Injectable} from '@angular/core';

import {QueueingSubject} from 'queueing-subject';
import {Observable} from 'rxjs/Observable';
import {WebSocketService} from 'angular2-websocket-service';
import 'rxjs/add/operator/share';
import * as SockJS from 'sockjs-client';
import { StompService } from 'ng2-stomp-service';

// https://github.com/devsullo/ng2-STOMP-Over-WebSocket

@Injectable()
export class ServerSocketService {

  private inputStream: QueueingSubject<any>
  public outputStream: Observable<any>

  constructor(private socketFactory: WebSocketService, private stomp: StompService) {
  }

  public connect() {
   const socket = new SockJS('/gs-guide-websocket');
     if (this.outputStream) {
      return this.outputStream
    }
    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    return this.outputStream = this.socketFactory.connect(
      'ws://localhost:8080/websocket/gs-guide-websocket/websocket',
      this.inputStream = new QueueingSubject<any>()
    ).share()
  }

  public send(message: any): void {
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message)
  }

}
