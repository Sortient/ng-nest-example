import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../data.service';

@Component({
  selector: 'app-greeting',
  imports: [MatCardModule],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent {
  private dataService = inject(DataService);

  greeting = toSignal(
    this.dataService.getGreeting(), {
      initialValue: 'Loading message from server...'
    }
  );
}