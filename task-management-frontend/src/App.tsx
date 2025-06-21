import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.01)',
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <TaskProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tasks/new" element={<TaskPage />} />
                        <Route path="/tasks/:id" element={<TaskPage />} />
                    </Routes>
                </TaskProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;