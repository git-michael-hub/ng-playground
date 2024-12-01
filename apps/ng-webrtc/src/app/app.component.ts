import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { io, Socket } from "socket.io-client";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-webrtc';

  serverUrl = 'http://localhost:3000';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Running in the browser');

      const socket = io(this.serverUrl);

      socket.on('connect', () => {
        console.log('connected to socket.io');

        // notify the other users
        socket.emit("connect-app", new Date());
      });
    }

    if (isPlatformServer(this.platformId)) {
      console.log('Running on the server');
    }
  }
}
