import { TestBed } from '@angular/core/testing';

import { TodoListHttpService } from './todo-list-http.service';

describe('TodoListHttpService', () => {
  let service: TodoListHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
