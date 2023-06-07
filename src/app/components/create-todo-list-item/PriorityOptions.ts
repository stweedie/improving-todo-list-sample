import { Priority } from "~/constants";
import { PriorityDescription } from "~/models";

const PriorityOptions: PriorityDescription[] = [
  Priority.Critical,
  Priority.Important,
  Priority.Normal,
  Priority.NotNeeded
];

export default PriorityOptions;
