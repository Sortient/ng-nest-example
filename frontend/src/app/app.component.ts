import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { ItemListComponent } from './item-list/item-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GreetingComponent, ItemListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
