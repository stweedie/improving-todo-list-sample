import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '~/models';

@Injectable()
export abstract class TodoListService {
  abstract getTodoItems(): Observable<TodoItem[]>;
  abstract toggleItem(item: TodoItem): void;
  abstract removeItem(item: TodoItem): void;
  abstract addTodoItem(item: TodoItem): void;
}
