package org.example.taskmanagement.dtos;

import lombok.Data;
import org.example.taskmanagement.enums.Priority;
import org.example.taskmanagement.enums.Status;

import java.time.LocalDate;

@Data
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Priority priority;
    private Status status;
}