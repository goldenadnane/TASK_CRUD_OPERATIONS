import { Badge } from '@mui/material';
import { TaskResponse } from '../types/Task';

const statusColors = {
    TODO: 'default',
    IN_PROGRESS: 'primary',
    DONE: 'success'
} as const;

export const StatusBadge = ({ status }: { status: TaskResponse['status'] }) => {
    return (
        <Badge 
            color={statusColors[status]}
            badgeContent={status.toLowerCase().replace('_', ' ')}
            sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', padding: '0 4px' } }}
        />
    );
};