import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      '5678',
      'Important message',
      'lorem ipsum lorem ipsum lorem ipsum',
      'Joe'
    ),
    new Message(
      '8910',
      'Less Important',
      'lorem ipsum lorem ipsum lorem ipsum',
      'Jon'
    ),
    new Message(
      '4321',
      'Really not Important',
      'lorem ipsum lorem ipsum lorem ipsum',
      'Jim'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
