import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WebSocketService} from 'angular2-websocket-service';
import {ServerSocketService} from './server-socket.service';
import {StompService} from 'ng2-stomp-service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebSocketService, ServerSocketService, StompService],
  bootstrap: [AppComponent]
})
export class AppModule { }
