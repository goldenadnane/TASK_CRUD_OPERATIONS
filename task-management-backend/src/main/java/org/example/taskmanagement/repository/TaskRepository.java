package org.example.taskmanagement.repository;

import org.example.taskmanagement.entity.Task;
import org.example.taskmanagement.enums.Priority;
import org.example.taskmanagement.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatusOrderByDueDateAsc(Status status);
    List<Task> findByPriorityOrderByDueDateAsc(Priority priority);
}