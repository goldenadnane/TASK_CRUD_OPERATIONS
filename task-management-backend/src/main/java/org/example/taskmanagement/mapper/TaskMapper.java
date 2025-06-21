package org.example.taskmanagement.mapper;

import org.example.taskmanagement.dtos.TaskDTO;
import org.example.taskmanagement.dtos.TaskResponseDTO;
import org.example.taskmanagement.entity.Task;
import org.example.taskmanagement.enums.Priority;
import org.example.taskmanagement.enums.Status;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "id", ignore = true)
    Task toEntity(TaskDTO taskDTO);

    TaskResponseDTO toResponseDTO(Task task);

    default Task updateEntityFromDTO(TaskDTO taskDTO, Task task) {
        if (taskDTO.getTitle() != null) {
            task.setTitle(taskDTO.getTitle());
        }
        if (taskDTO.getDescription() != null) {
            task.setDescription(taskDTO.getDescription());
        }
        if (taskDTO.getDueDate() != null) {
            task.setDueDate(taskDTO.getDueDate());
        }
        if (taskDTO.getPriority() != null) {
            task.setPriority(Priority.valueOf(taskDTO.getPriority().name()));
        }
        if (taskDTO.getStatus() != null) {
            task.setStatus(Status.valueOf(taskDTO.getStatus().name()));
        }
        return task;
    }
}
