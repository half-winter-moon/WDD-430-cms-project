import { Component } from '@angular/core';

// decorator
@Component({
  selector: 'cms-root',
  // every component MUST have a template, or templateURL
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
}
