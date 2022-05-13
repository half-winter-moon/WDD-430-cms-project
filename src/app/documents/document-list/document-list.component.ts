import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('100', 'Jon Doe', 'Message', '#', null),
    new Document('101', 'Jane Doe', 'Message', '#', null),
    new Document('102', 'Jonny Doe', 'Message', '#', null),
    new Document('103', 'Jonathan Doe', 'Message', '#', null),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
