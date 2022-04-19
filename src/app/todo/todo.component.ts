import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  addTask(): void {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }
  
  updateTask(): void {
    this.tasks[this.updateIndex].description = this.todoForm.value.item
    this.tasks[this.updateIndex].done = false
    this.todoForm.reset();
    this.updateIndex = null
    this.isEditEnabled = false

  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onEdit(item: Task, i: number): void {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i
    this.isEditEnabled = true
    this.textInput.nativeElement.focus();
  }

  deleteTask(i: number): void {
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number): void {
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number): void {
    this.done.splice(i, 1);
  }
}
