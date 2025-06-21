package org.example.taskmanagement.service;

import org.example.taskmanagement.dtos.TaskDTO;
import org.example.taskmanagement.dtos.TaskResponseDTO;
import org.example.taskmanagement.entity.Task;
import org.example.taskmanagement.enums.Priority;
import org.example.taskmanagement.enums.Status;
import org.example.taskmanagement.mapper.TaskMapper;
import org.example.taskmanagement.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskService(TaskRepository taskRepository,TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(taskMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public TaskResponseDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return taskMapper.toResponseDTO(task);
    }

    public TaskResponseDTO createTask(TaskDTO taskDTO) {
        Task task = taskMapper.toEntity(taskDTO);
        Task savedTask = taskRepository.save(task);
        return taskMapper.toResponseDTO(savedTask);
    }

    public TaskResponseDTO updateTask(Long id, TaskDTO taskDTO) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        Task updatedTask = taskMapper.updateEntityFromDTO(taskDTO, existingTask);
        Task savedTask = taskRepository.save(updatedTask);
        return taskMapper.toResponseDTO(savedTask);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        taskRepository.delete(task);
    }

    public List<TaskResponseDTO> getTasksByStatus(Status status) {
        return taskRepository.findByStatusOrderByDueDateAsc(status).stream()
                .map(taskMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<TaskResponseDTO> getTasksByPriority(Priority priority) {
        return taskRepository.findByPriorityOrderByDueDateAsc(priority).stream()
                .map(taskMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}