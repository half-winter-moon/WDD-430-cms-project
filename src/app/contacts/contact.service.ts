import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContact(id: string): Contact {
    // return this.contacts.find((contact) => {
    //   return this.contacts.id === id;
    // });

    return this.contacts.find((contact) => contact.id === id);

    // if (this.contacts.id === id) {
    //   return contacts[];
    // } else {
    //   return null;
    // }
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }
}