import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../contexts/TaskContext';
import { useEffect, useState } from 'react';
import { TaskRequest } from '../types/Task';

export const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();

  const [loading, setLoading] = useState(!!id);
  const [initialData, setInitialData] = useState<TaskRequest | undefined>();

  useEffect(() => {
    if (id) {
      const taskId = parseInt(id);
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setInitialData({
          title: task.title,
          description: task.description || '',
          dueDate: task.dueDate,
          priority: task.priority,
          status: task.status,
        });
        setLoading(false);
      } else {
        // Optional: fallback fetch from API if not found in context
        setLoading(false);
      }
    }
  }, [id, tasks]);

  const handleSubmit = async (data: TaskRequest) => {
    try {
      if (id) {
        await updateTask(parseInt(id), data);
      } else {
        await addTask(data);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <TaskForm
          onSubmit={handleSubmit}
          initialData={initialData}
          onCancel={() => navigate('/')}
        />
      </Box>
    </Container>
  );
};
