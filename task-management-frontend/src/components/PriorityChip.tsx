import { Chip } from '@mui/material';
import { TaskResponse } from '../types/Task';

const priorityColors = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'error'
} as const;

export const PriorityChip = ({ priority }: { priority: TaskResponse['priority'] }) => {
    return (
        <Chip 
            label={priority.toLowerCase()}
            color={priorityColors[priority]}
            size="small"
            variant="outlined"
        />
    );
};