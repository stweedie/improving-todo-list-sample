import { type PriorityDescription } from "./PriorityDescription";

export interface TodoItem {
  completed: boolean;
  priority: PriorityDescription;
  dueDate: null | Date;
  description: string;
}
