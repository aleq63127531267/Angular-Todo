import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() { }

  getAll(): Todo[]{
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
  }

  setAll(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  save(item: Todo){
    let list = JSON.parse(localStorage.getItem('todos') ?? '[]')
    list.unshift(item)
    localStorage.setItem('todos', JSON.stringify(list))
  }

  edit(item: Todo, index: number){
    let list = JSON.parse(localStorage.getItem('todos') ?? '[]')
    list[index] = item
    localStorage.setItem('todos', JSON.stringify(list))
  }

  delete(index: number){
    let list = JSON.parse(localStorage.getItem('todos') ?? '[]')
    list.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(list))
  }

  multidelete(indexes: number[]){
    let list = JSON.parse(localStorage.getItem('todos') ?? '[]')
    for(let i of indexes){
      list.splice(i, 1)
    }
    localStorage.setItem('todos', JSON.stringify(list))
  }
}
