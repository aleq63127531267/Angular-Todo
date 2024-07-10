import {Component, input} from '@angular/core';
import {Todo} from "../models/todo";
import {FormsModule} from '@angular/forms'
import {NgClass, NgFor} from "@angular/common";
import {NgIf} from "@angular/common";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-to-dos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './to-dos.component.html',
  styleUrl: './to-dos.component.css'
})
export class ToDosComponent {
  inputValue = '';
  todos: Todo[] = [];
  ongoingEditing: boolean = false;
  ongoingDeleting: boolean = false;
  deleting: number[] = [];
  isDeleteAll = false;


  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getAll()
  }

  onAdd() {
    if (this.inputValue) {
      const item = {description: this.inputValue, completed: false, isEditing: false, isDeleting: false} as Todo;
      this.inputValue = '';
      this.todoService.save(item)
      this.todos = this.todoService.getAll()
    }
  }

  onEdit(index: number) {
    if (this.ongoingEditing) {
      return
    }
    this.todos[index].isEditing = true
    this.ongoingEditing = true
  }

  onSave(index: number, value: string) {
    if (value) {
      this.todos[index].description = value
      this.todos[index].isEditing = false
      this.ongoingEditing = false
      this.todoService.edit(this.todos[index], index)
    }
  }

  onCancel(index: number) {
    this.todos[index] = {...this.todos[index]}
    this.todos[index].isEditing = false
    this.ongoingEditing = false
    this.todoService.edit(this.todos[index], index)
  }

  onCheck(index: number) {
    this.todoService.edit(this.todos[index], index)
  }

  onDelete(index: number) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.todos.splice(index, 1)
      this.todoService.delete(index)
      this.todos = this.todoService.getAll()
    }
  }

  onToggle() {
    for (let i in this.todos) {
      this.todos[i].isDeleting = false
    }
    this.isDeleteAll = false
  }

  onMultiDelete() {
    for (let index in this.todos) {
      if (this.todos[+index].isDeleting) {
        this.deleting.unshift(+index)
      }
    }
    let tasks = this.deleting.length
    if (tasks) {
      if (confirm("Are you sure you want to delete " + tasks + " tasks?")) {
        this.todoService.multidelete(this.deleting)
        this.todos = this.todoService.getAll()
        this.ongoingDeleting = false
      }
    }
    this.deleting = []
  }

  onSelect() {
    if (this.isDeleteAll) {
      for (let i in this.todos) {
        this.todos[i].isDeleting = true
      }
    }
    if (!this.isDeleteAll) {
      for (let i in this.todos) {
        this.todos[i].isDeleting = false
      }
    }
  }
}
