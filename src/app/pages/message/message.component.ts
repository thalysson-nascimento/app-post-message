import { Component, OnInit } from '@angular/core';
import { ListMessageComponent } from '../../shared/components/list-message/list-message.component';

const SharedComponents = [ListMessageComponent];

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [...SharedComponents],
  standalone: true,
})
export class MessageComponent implements OnInit {
  constructor() {
    console.log('message');
  }

  ngOnInit() {}
}
