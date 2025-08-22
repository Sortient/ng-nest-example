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
export class ItemListComponent implements OnInit {
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  items = signal<Item[]>([]);
  itemForm: FormGroup;
  itemTypes = Object.values(ItemType);
  displayedColumns: string[] = ['name', 'version', 'type', 'location', 'createdAt'];
  
  selectedFile: File | null = null;

  constructor() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      version: ['', Validators.required],
      type: [null, Validators.required],
      file: [null, Validators.required] 
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.itemForm.patchValue({ file: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.itemForm.invalid || !this.selectedFile) {
      return;
    }
    
    const formData = new FormData();
    formData.append('name', this.itemForm.get('name')!.value ?? '');
    formData.append('version', this.itemForm.get('version')!.value ?? '');
    formData.append('type', this.itemForm.get('type')!.value ?? '');
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.dataService.createItem(formData).subscribe({
      next: (newItem) => {
        this.items.update(currentItems => [...currentItems, newItem]);
        this.itemForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Close', { duration: 5000 });
      }
    });
  }
}