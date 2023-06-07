import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from '~/constants';
import { TodoItem } from '~/models';
import { TodoListService } from '~/services';


@Component({
  selector: 'tdl-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  items$: Observable<TodoItem[]> | undefined;

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.items$ = this.todoListService.getTodoItems();

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

  addNewItem(todoItem: TodoItem) {
    console.log("adding new item", todoItem);
    this.todoListService.addTodoItem(todoItem)
  }
}
