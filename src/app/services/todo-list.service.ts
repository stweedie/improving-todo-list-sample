import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { type TodoItem } from '~/models';

type TodoItemInStorage = Omit<TodoItem, "dueDate"> & {
  dueDate: string;
};

@Injectable()
export class TodoListService {
  private namespace: string = "TODO_LIST";

  private items: TodoItem[] = [];
  constructor(private storage: Storage) {
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    if (!this.items || !this.items.length) {
      const storageValue = this.storage.getItem(this.namespace);
      this.items = (storageValue ? JSON.parse(storageValue) : [])
        .map((f: TodoItemInStorage) => ({
          ...f,
          dueDate: new Date(f.dueDate)
        }));

    }
  }

  private syncStorage() {
    this.storage.setItem(this.namespace, JSON.stringify(this.items));
  }

  getTodoItems(): Observable<TodoItem[]> {
    return of(this.items);
  }

  addTodoItem(item: TodoItem): Observable<TodoItem[]> {
    this.items.push(item);
    this.syncStorage();
    return this.getTodoItems();
  }
}
