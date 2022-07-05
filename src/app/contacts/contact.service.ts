import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
  }

  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContact(id: string) {
    return this.http.get<{ message: string; contact: Contact }>(
      'http://localhost:3000/contacts/' + id
    );
  }

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(
        'http://localhost:3000/contacts'
      )
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.sortAndSend();
          // this.maxContactId = this.getMaxId();
          // this.contacts.sort((a, b) =>
          //   a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          // );
          // this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex((d) => d.id === contact.id);
    if (pos < 0) {
      return;
    }

    // this.contacts.splice(pos, 1);
    // this.contactChangedEvent.next(this.contacts.slice());

    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  // storeContacts() {
  //   let contacts = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http
  //     .put(
  //       'https://wdd430-a26e9-default-rtdb.firebaseio.com/contacts.json',
  //       contacts,
  //       { headers: headers }
  //     )
  //     .subscribe(() => {
  //       this.contactChangedEvent.next(this.contacts.slice());
  //     });
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    // this.maxContactId++;
    // newContact.id = this.maxContactId.toString();
    // this.contacts.push(newContact);

    // make sure id of the new contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;

    // this.contacts[pos] = newContact;
    // const contactListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactListClone);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }
}
