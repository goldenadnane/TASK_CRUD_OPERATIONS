import axios from "axios";
import { TaskRequest,TaskResponse } from "../types/Task";

const API_URL = "http://localhost:8080/api/tasks";

export const fetchTasks = async (): Promise<TaskResponse[]> => {
  try {
    const response = await axios.get<TaskResponse[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const fetchTaskById = async (id: number): Promise<TaskResponse> => {
  try {
    const response = await axios.get<TaskResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw new Error(`Failed to fetch task with id ${id}`);
  }
};

export const createTask = async (task: TaskRequest): Promise<TaskResponse> => {
  try {
    const response = await axios.post<TaskResponse>(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    if (axios.isAxiosError(error) && error.response) {
      // Handle validation errors from backend
      if (error.response.status === 400) {
        throw new Error(
          "Validation error: " + JSON.stringify(error.response.data)
        );
      }
    }
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (
  id: number,
  task: TaskRequest
): Promise<TaskResponse> => {
  try {
    const response = await axios.put<TaskResponse>(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        throw new Error(
          "Validation error: " + JSON.stringify(error.response.data)
        );
      }
      if (error.response.status === 404) {
        throw new Error("Task not found");
      }
    }
    throw new Error(`Failed to update task with id ${id}`);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Task not found");
    }
    throw new Error(`Failed to delete task with id ${id}`);
  }
};

export const fetchTasksByStatus = async (
  status: string
): Promise<TaskResponse[]> => {
  try {
    const response = await axios.get<TaskResponse[]>(
      `${API_URL}/status/${status}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks by status ${status}:`, error);
    throw new Error(`Failed to fetch tasks by status ${status}`);
  }
};

export const fetchTasksByPriority = async (
  priority: string
): Promise<TaskResponse[]> => {
  try {
    const response = await axios.get<TaskResponse[]>(
      `${API_URL}/priority/${priority}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks by priority ${priority}:`, error);
    throw new Error(`Failed to fetch tasks by priority ${priority}`);
  }
};
