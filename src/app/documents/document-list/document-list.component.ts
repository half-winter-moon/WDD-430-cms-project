import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // do I need both of these lines of code?
    this.documents = this.documentService.getDocuments();
    // is this how this function is supposed to look?
    this.documentService.documentChangedEvent.subscribe((documentsArray) => {
      this.documents = documentsArray;
    });
  }
}
