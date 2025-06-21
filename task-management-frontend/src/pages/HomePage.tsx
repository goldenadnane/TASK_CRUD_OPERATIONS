import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { TaskList } from '../components/TaskList';
import { useState } from 'react';

export const HomePage = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <Container maxWidth="md">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    Task Manager
                </Typography>
                {!isEditing && (
                    <Button 
                        component={Link}
                        to="/tasks/new"
                        variant="contained" 
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        New Task
                    </Button>
                )}
            </Box>
            <TaskList onEditStateChange={setIsEditing} />
        </Container>
    );
};