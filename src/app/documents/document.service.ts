import { Injectable } from '@angular/core';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  // getMaxId(): number {
  //   let maxId = 0;
  //   this.documents.forEach((document) => {
  //     const currentId = parseInt(document.id, 10);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   });
  //   return maxId;
  // }

  sortAndSend() {
    this.documents.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(
        'http://localhost:3000/documents'
      )
      .subscribe(
        (documentData) => {
          this.documents = documentData.documents;
          // this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // storeDocuments() {
  //   let documents = JSON.stringify(this.documents);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http
  //     .put(
  //       'https://wdd430-a26e9-default-rtdb.firebaseio.com/documents.json',
  //       documents,
  //       { headers: headers }
  //     )
  //     .subscribe(() => {
  //       this.documentListChangedEvent.next(this.documents.slice());
  //     });
  // }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id; WHERE IS THIS??

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }
}
