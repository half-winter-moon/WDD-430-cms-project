import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }

  constructor() {}

  ngOnInit(): void {}
}
