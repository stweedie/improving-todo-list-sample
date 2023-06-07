import { type PriorityDescription } from "./PriorityDescription";

export interface TodoItem {
  completed: boolean;
  priority: PriorityDescription;
  dueDate: Date;
  description: string;
}
