import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  getGreeting(): Observable<string> {
    return this.http.get<{ message: string }>(`${API_URL}/hello`).pipe(
      map(response => response.message),
      catchError(error => {
        console.error('Error fetching greeting:', error);
        return 'Error fetching greeting';
      })
    );
  }
}