import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { type TodoItem } from '~/models';
import { TodoListService } from './todo-list-base.service';

type TodoItemInStorage = Omit<TodoItem, "dueDate"> & {
  dueDate: string;
};

// this service uses local storage
// can connect an HTTP implementation
@Injectable()
export class TodoListStorageService implements TodoListService {
  private namespace: string = "TODO_LIST";

  private itemSubject: Subject<TodoItem[]> = new BehaviorSubject([] as TodoItem[]);

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

    this.itemSubject.next(this.items);
  }

  private syncStorage() {
    this.storage.setItem(this.namespace, JSON.stringify(this.items));
  }

  getTodoItems(): Observable<TodoItem[]> {
    return this.itemSubject.asObservable();
  }

  toggleItem(item: TodoItem) {
    const index = this.items.findIndex(ii => ii.description === item.description
      && ii.priority.severity === item.priority.severity
      && ii.dueDate === item.dueDate
    );

    this.items[index].completed = !this.items[index].completed;
    this.syncStorage();
    this.itemSubject.next(this.items);
  }

  removeItem(item: TodoItem) {
    const index = this.items.findIndex(ii => ii.description === item.description
      && ii.priority.severity === item.priority.severity
      && ii.dueDate === item.dueDate
    );

    this.items.splice(index, 1);
    this.syncStorage();
    this.itemSubject.next(this.items);
  }

  addTodoItem(item: TodoItem): Observable<TodoItem[]> {
    this.items.push(item);
    this.syncStorage();
    this.itemSubject.next(this.items);
    return this.getTodoItems();
  }
}
