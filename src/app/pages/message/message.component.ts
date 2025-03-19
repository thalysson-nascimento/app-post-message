import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListMessageComponent } from '../../shared/components/list-message/list-message.component';
import { PostMessage } from '../../shared/models/post-message.interface';
import { postMessageAction } from '../../store/actions/post-message.action';
import { postMessageSelector } from '../../store/selectors/post-message.selector';

const SharedComponents = [ListMessageComponent];
const CoreModule = [CommonModule];

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [...SharedComponents, ...CoreModule],
  standalone: true,
})
export class MessageComponent implements OnInit {
  postMessage: PostMessage[] = [];
  store = inject(Store);
  postMessage$ = this.store.select(postMessageSelector);

  constructor() {
    console.log('message');
  }

  ngOnInit() {
    this.store.dispatch(postMessageAction.getPostMessage());
  }
}
