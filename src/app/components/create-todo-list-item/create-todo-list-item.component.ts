import { Component, EventEmitter, Output } from '@angular/core';
import { Priority } from '~/constants';
import { PriorityDescription, TodoItem } from '~/models';
import PriorityOptions from './PriorityOptions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tdl-create-todo-list-item',
  templateUrl: './create-todo-list-item.component.html',
  styleUrls: ['./create-todo-list-item.component.scss']
})
export class CreateTodoListItemComponent {
  @Output() onItemCreated: EventEmitter<TodoItem> = new EventEmitter();

  formGroup: FormGroup;

  priorities: PriorityDescription[] = PriorityOptions;

  constructor(private fb: FormBuilder) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.formGroup = this.fb.group({
      description: "",
      priority: 1,
      dueDate: date
    });
  }

  clearItem() {
    this.formGroup.reset();
  }

  createItem() {
    const value = this.formGroup.value;
    const date = new Date(`${value.dueDate.year}-${value.dueDate.month}-${value.dueDate.day}`);

    this.onItemCreated.next({
      description: value.description,
      priority: this.priorities[value.priority + 1],
      dueDate: date,
      completed: false
     });

    this.clearItem();
  }
}
