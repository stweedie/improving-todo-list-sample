import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CreateTodoListItemComponent } from './components/create-todo-list-item/create-todo-list-item.component';
import { TodoListService, TodoListStorageService, TodoListHttpService } from './services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CreateTodoListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: TodoListService, useValue: new TodoListStorageService(localStorage) }
    // { provide: TodoListService, useClass: TodoListHttpService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
