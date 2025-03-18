import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostMessageFirebaseService } from './shared/services/post-message/post-message-firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
