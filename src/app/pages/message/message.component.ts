import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ListMessageComponent } from '../../shared/components/list-message/list-message.component';
import { postMessageAction } from '../../store/actions/post-message.action';
import { postMessageSelector } from '../../store/selectors/post-message.selector';

const MaterialModule = [MatProgressSpinnerModule];

const SharedComponents = [ListMessageComponent];
const CoreModule = [CommonModule];

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [...SharedComponents, ...CoreModule, ...MaterialModule],
  standalone: true,
})
export class MessageComponent implements OnInit {
  store = inject(Store);
  postMessage$ = this.store.select(postMessageSelector);
  error$!: Observable<string | null>;

  constructor() {
    this.error$ = this.store.select((state) => state.postMessage?.error);
  }

  ngOnInit() {
    this.store.dispatch(postMessageAction.getPostMessage());
  }
}
