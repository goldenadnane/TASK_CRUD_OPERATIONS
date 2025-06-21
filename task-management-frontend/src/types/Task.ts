export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  dueDate: Date | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

export interface TaskRequest {
  title: string;
  description?: string;
  dueDate: Date | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
}
