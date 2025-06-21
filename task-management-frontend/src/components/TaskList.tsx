import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import { useTasks } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import { TaskRequest, TaskResponse } from "../types/Task";
import { updateTask } from "../api/taskApi";

interface TaskListProps {
  onEditStateChange: (isEditing: boolean) => void;
}

export const TaskList = ({ onEditStateChange }: TaskListProps) => {
  const { tasks, removeTask, refreshTasks } = useTasks();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskResponse | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await refreshTasks();
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks");
        setLoading(false);
      }
    };
    loadTasks();
  }, [refreshTasks]);

  const handleEdit = (task: TaskResponse) => {
    setEditingTask(task);
    onEditStateChange(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    onEditStateChange(false);
  };

  const handleSubmitEdit = async (data: TaskRequest) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
        await refreshTasks();
        setEditingTask(null);
        onEditStateChange(false);
      }
    } catch (error) {
      console.error("Failed to update task", error);
      setError("Failed to update task");
    }
  };

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete === null) return;

    try {
      await removeTask(taskToDelete);
    } catch (err) {
      setError("Échec de la suppression de la tâche");
    } finally {
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box mt={2}>
        <Typography variant="body1" color="text.secondary">
          No tasks found. Add a new task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2} columns={16}>
        {tasks.map((task) => (
          <Grid size={8}>
            {editingTask?.id === task.id ? (
              <TaskForm
                onSubmit={handleSubmitEdit}
                initialData={editingTask}
                onCancel={handleCancelEdit}
              />
            ) : (
              <TaskCard
                task={task}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDeleteClick(task.id)} // Changé ici
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
