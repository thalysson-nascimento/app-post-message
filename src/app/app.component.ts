import { Component, OnInit } from '@angular/core';
import { PostMessageFirebaseService } from './shared/services/post-message/post-message-firebase.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialModule = [MatToolbarModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'app-post-message';

  constructor(private postMessageFirebaseService: PostMessageFirebaseService) {}

  ngOnInit(): void {
    this.loadPostMessage();
  }

  loadPostMessage() {
    this.postMessageFirebaseService.getPostMessage().subscribe({
      next: (response) => {
        console.log('===>', response);
      },
    });
  }
}
