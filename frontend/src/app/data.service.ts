import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry, timeout } from 'rxjs/operators';
import { Item } from './item.interface';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API_URL}/items`).pipe(
      catchError(error => {
        console.error('Error fetching items:', error);
        return of([]);
      })
    )
  }

  createItem(formData: FormData): Observable<Item> {
    return this.http.post<Item>(`${API_URL}/items`, formData);
  }
}
