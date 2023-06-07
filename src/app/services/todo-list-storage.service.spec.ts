import { TestBed } from '@angular/core/testing';

import { TodoListStorageService } from './todo-list-storage.service';

describe('TodoListStorageService', () => {
  let service: TodoListStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
