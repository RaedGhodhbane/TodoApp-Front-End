import { Component, OnInit } from '@angular/core';
import { TodoService } from './service/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './interface/todo';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isEdmitmode: boolean = false;
  todoForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  TodoData: Todo[] = [];
  pageSize = 5; // Number of items per page
  currentPage = 1; // Current page number
  totalItems = 0; // Total number of items
  totalPages = 0; // Total number of pages
  pagedTodoData: Todo[] = []; // Array to store todos for the current page
  pages: number[] = []; // Array to store page numbers

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      completed: ['']
    });

    this.getTodo();

    this.updatePageNumbers();
  }

  openSnackBar() {
    this._snackBar.open('Test', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }
    if (this.isEdmitmode) {
      this.updateTodo(this.todoForm.value);
    } else {
      const formValue: Todo = this.todoForm.value;
      const todoRequest: Todo = {
        name: formValue.name,
        description: formValue.description,
        completed: false
      };
      this.todoService.createTodo(todoRequest).subscribe(() => {
        this.getTodo();
      });
    }
  }

  getTodo() {
    this.todoService.getTodo().subscribe((data) => {
      this.TodoData = data;
      this.totalItems = this.TodoData.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updatePageNumbers();
      // Slice TodoData based on pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize - 1, this.totalItems - 1);
      this.TodoData = this.TodoData.slice(startIndex, endIndex + 1);
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.getTodo();
    });
  }

  handleEdit(todo: Todo) {
    this.isEdmitmode = true;
    delete todo.dateCreated;
    delete todo.lastUpdated;
    this.todoForm.setValue(todo);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.getTodo();
      this.todoForm.reset();
    });
  }

  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getTodo();
    }
  }
  

  // Method to update page numbers
  updatePageNumbers() {
    this.pages = []; // Clear the existing pages array
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i); // Push page numbers starting from 1 up to totalPages
    }
  }

  // Method to show the total number of pages
  getTotalPages(): number {
    return this.totalPages;
  }

}
