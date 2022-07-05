import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  sortAndSend() {
    this.messages.sort((a, b) =>
      a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0
    );
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => {
      message.id === id;
    });
  }

  // storeMessages() {
  //   let messages = JSON.stringify(this.messages);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http
  //     .put(
  //       'https://wdd430-a26e9-default-rtdb.firebaseio.com/messages.json',
  //       messages,
  //       { headers: headers }
  //     )
  //     .subscribe(() => {
  //       this.messageChangedEvent.next(this.messages.slice());
  //     });
  // }

  getMessages() {
    // return this.messages.slice();
    this.http
      .get<{ message: string; object: Message[] }>(
        'http://localhost:3000/messages'
      )
      .subscribe(
        (messageData) => {
          this.messages = messageData.object;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addMessage(message: Message) {
    // this.messages.push(message);
    // // this.messageChangedEvent.emit(this.messages.slice());
    // this.storeMessages();

    if (!message) {
      return;
    }

    // make sure id of the new message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ response: string; message: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to message
        this.messages.push(responseData.message);
        this.sortAndSend();
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/messages/' + originalMessage.id, newMessage, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.messages[pos] = newMessage;
        this.sortAndSend();
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/messages/' + message.id)
      .subscribe((response: Response) => {
        this.messages.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
