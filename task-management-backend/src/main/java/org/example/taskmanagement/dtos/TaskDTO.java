package org.example.taskmanagement.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.example.taskmanagement.enums.Priority;
import org.example.taskmanagement.enums.Status;

import java.time.LocalDate;

@Data
public class TaskDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    private Priority priority;
    private Status status;

}