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
    let sorted = 0
    for(;sorted == false;){
      let index = 0
      for(let i = index; ;){

      }
      // for(let i = 0; i < indexes.length; i++){
      //   sorted = true
      //   let x = i++
      //   if(indexes[i] > indexes[x]){
      //     sorted = false
      //     let n = indexes[i]
      //     indexes[i] = indexes[x]
      //     indexes[x] = n
      //   }
      // }
    }
    for(let i = 0; i < indexes.length ;i++){
      list.splice(i, 1)
    }
    localStorage.setItem('todos', JSON.stringify(list))
  }
}
