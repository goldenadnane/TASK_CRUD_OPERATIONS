import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { TaskRequest, TaskResponse } from "../types/Task";
import {
  fetchTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../api/taskApi";

interface TaskContextType {
  tasks: TaskResponse[];
  addTask: (task: TaskRequest) => Promise<void>;
  updateTask: (id: number, task: TaskRequest) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const refreshTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const addTask = async (task: TaskRequest) => {
    try {
      const newTask = await apiCreateTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTask = async (id: number, task: TaskRequest) => {
    try {
      const updatedTask = await apiUpdateTask(id, task);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const removeTask = async (id: number) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, removeTask, refreshTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
