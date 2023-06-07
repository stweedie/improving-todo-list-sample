import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, withLatestFrom, map, combineLatest } from 'rxjs';
import { Priority } from '~/constants';
import { TodoItem } from '~/models';
import { TodoListService } from '~/services';

// TODO: remember how to do the "takeLast(2) and combine you did before"
type SortDefinition = {
  column: string;
  direction: "asc" | "desc"
}

function padDate(date: number): string {
  return date.toString().padStart(2, '0');
}

function getDateString(item: TodoItem): string {
  return `${padDate(item.dueDate!.getMonth() + 1)}/${padDate(item.dueDate!.getDate())}/${item.dueDate!.getFullYear()}`;
}

function filterItems(item: TodoItem, text: string): boolean {
  console.log("getDateString", getDateString(item), text);
  return item.description.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    || item.priority.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    || getDateString(item).includes(text.toLocaleLowerCase());
}

@Component({
  selector: 'tdl-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items$: Observable<TodoItem[]> | undefined;
  filterText$: Subject<string> = new BehaviorSubject("");
  //TODO: implement sorting logic
  currentSort$: Subject<string | null> = new BehaviorSubject<string | null>(null);
  data$: Observable<TodoItem[]> | undefined;
  currentText: string = "";

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.items$ = this.todoListService.getTodoItems();

    this.data$ = combineLatest(this.items$, this.filterText$)
      .pipe(
        map(([items, text]) => items.filter(item => filterItems(item, text)))
      );

    // this.todoListService.addTodoItem({
    //   description: "First item",
    //   priority: Priority.Critical,
    //   dueDate: new Date("10/7/2023"),
    //   completed: false,
    // });

    // this.todoListService.addTodoItem({
    //   description: "Second item",
    //   priority: Priority.Important,
    //   dueDate: new Date("10/7/2023"),
    //   completed: false,
    // });

    // this.todoListService.addTodoItem({
    //   description: "Irrelevant item",
    //   priority: Priority.NotNeeded,
    //   dueDate: new Date("10/7/2023"),
    //   completed: false,
    // });
  }

  filterItems(text: string) {
    this.filterText$.next(text);
  }

  toggleItem(item: TodoItem) {
    this.todoListService.toggleItem(item);
  }

  removeItem(item: TodoItem) {
    this.todoListService.removeItem(item);
  }

  addNewItem(todoItem: TodoItem) {
    console.log("adding new item", todoItem);
    this.todoListService.addTodoItem(todoItem)
  }

  sort(column: "description" | "priority" | "dueDate") {
  }
}
