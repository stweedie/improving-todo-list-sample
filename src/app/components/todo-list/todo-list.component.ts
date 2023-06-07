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
  return item.description.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    || item.priority.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    || getDateString(item).includes(text.toLocaleLowerCase());
}

function sortItems(left: TodoItem, right: TodoItem, sortDef: SortDefinition | null): number {
  if (!sortDef) return -1;
  const modifier = sortDef.direction === "asc" ? 1 : -1;

  if (sortDef.column === "description") return modifier * left.description.localeCompare(right.description);
  if (sortDef.column === "priority") return modifier * (left.priority.severity - right.priority.severity);
  return modifier * ((left.dueDate?.valueOf() ?? 0) - (right.dueDate?.valueOf() ?? 0));
}

@Component({
  selector: 'tdl-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items$: Observable<TodoItem[]> | undefined;
  filterText$: Subject<string> = new BehaviorSubject("");
  currentSort$: Subject<SortDefinition | null> = new BehaviorSubject<SortDefinition | null>(null);
  data$: Observable<TodoItem[]> | undefined;
  currentText: string = "";

  // hack: don't use a subject + property
  // use a single subject
  sortColumn: "description" | "priority" | "dueDate" | null = null;
  sortDirection: "asc" | "desc" | null = null;


  constructor(private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.items$ = this.todoListService.getTodoItems();

    this.data$ = combineLatest([this.items$, this.filterText$, this.currentSort$])
      .pipe(
        map(([items, text, sort]) => items
          .filter(item => filterItems(item, text))
          .sort((l, r) => sortItems(l, r, sort))
        )
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
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }

    this.currentSort$.next({
      column: this.sortColumn,
      direction: this.sortDirection || "asc"
    });
  }
}
