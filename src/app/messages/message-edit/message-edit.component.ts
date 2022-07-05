import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', { static: true }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: true }) msgTextRef: ElementRef;

  currentSender: Contact;
  // @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.contactService.getContact('101').subscribe((contactData) => {
      this.currentSender = contactData.contact;
    });
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(
      '1234',
      subject,
      msgText,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
