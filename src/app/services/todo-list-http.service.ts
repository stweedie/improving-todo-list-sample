import { Injectable } from '@angular/core';
import { TodoListService } from './todo-list-base.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TodoItem } from '~/models';

@Injectable()
export class TodoListHttpService implements TodoListService {
  constructor(private httpClient: HttpClient) { }

  getTodoItems(): Observable<TodoItem[]> {
    throw new Error('Method not implemented.');
  }
  toggleItem(item: TodoItem): void {
    throw new Error('Method not implemented.');
  }
  removeItem(item: TodoItem): void {
    throw new Error('Method not implemented.');
  }
  addTodoItem(item: TodoItem): Observable<TodoItem[]> {
    throw new Error('Method not implemented.');
  }
}
