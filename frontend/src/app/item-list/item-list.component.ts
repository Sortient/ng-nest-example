import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Item, ItemType } from '../item.interface';
import { DatePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-list',
  imports: [ReactiveFormsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, DatePipe, MatSnackBarModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  items = signal<Item[]>([]);
  itemForm: FormGroup;
  itemTypes = Object.values(ItemType);
  displayedColumns: string[] = ['name', 'version', 'type', 'location', 'createdAt'];

  constructor() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      version: ['', Validators.required],
      type: [null, Validators.required],
      location: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.dataService.getItems().subscribe(data => {
      this.items.set(data);
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) {
      return;
    }
    
    this.dataService.createItem(this.itemForm.value).subscribe({
      next: (newItem) => {
        this.items.update(currentItems => [...currentItems, newItem]);
        this.itemForm.reset();
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Close', {
          duration: 5000,
        });
      }
    });
  }
}
