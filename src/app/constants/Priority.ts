import type { PriorityDescription } from "~/models"

export type PriorityLevel = "Critical" | "Important" | "Normal" | "NotNeeded";

export const Priority: Record<PriorityLevel, PriorityDescription> = {
  Critical: {
    severity: 1,
    name: "Critical",
  },
  Important: {
    severity: 2,
    name: "Important",
  },
  Normal: {
    severity: 3,
    name: "Normal",
  },
  NotNeeded: {
    severity: 4,
    name: "Not Needed",
  },
}
