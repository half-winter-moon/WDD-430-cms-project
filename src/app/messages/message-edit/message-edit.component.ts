import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  currentSender: string = 'Jennie';

  @ViewChild('subject', { static: true }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: true }) msgTextRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() {}

  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(
      '1234',
      subject,
      msgText,
      this.currentSender
    );
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
