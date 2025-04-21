import { Component } from '@angular/core';
import { PackageListComponent } from './components/package-list/package-list.component';

@Component({
  selector: 'app-root',
  imports: [PackageListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testTask';
}
