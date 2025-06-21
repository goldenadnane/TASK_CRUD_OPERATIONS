import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { TaskResponse } from "../types/Task";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";

interface TaskCardProps {
  task: TaskResponse;
  onEdit: () => void;
  onDelete: () => void;
}

type StatusColorKey = "TODO" | "IN_PROGRESS" | "DONE";
type PriorityColorKey = "LOW" | "MEDIUM" | "HIGH";

const statusColors: Record<StatusColorKey, string> = {
  TODO: "text.secondary",
  IN_PROGRESS: "info.main",
  DONE: "success.main",
};

const priorityColorMap: Record<
  PriorityColorKey,
  {
    bg: string;
    text: string;
  }
> = {
  LOW: {
    bg: "success.light",
    text: "success.contrastText",
  },
  MEDIUM: {
    bg: "warning.light",
    text: "warning.contrastText",
  },
  HIGH: {
    bg: "error.light",
    text: "error.contrastText",
  },
};

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const theme = useTheme();
  const priority = task.priority as PriorityColorKey;
  const status = task.status as StatusColorKey;
  const priorityColors = priorityColorMap[priority];

  return (
    <Card
      sx={{
        minWidth: 275,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography variant="h6" component="div" fontWeight={600}>
            {task.title}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <CircleIcon
              fontSize="small"
              color="inherit"
              sx={{
                color: statusColors[status],
                fontSize: "0.8rem",
              }}
            />
            <Typography variant="caption" color={statusColors[status]}>
              {task.status.replace("_", " ")}
            </Typography>
          </Box>
        </Box>

        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description}
          </Typography>
        )}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography variant="caption" color="text.secondary">
            Due:{" "}
            <Typography component="span" fontWeight={500}>
              {task.dueDate
                ? format(new Date(task.dueDate), "MMM dd, yyyy")
                : "No due date"}
            </Typography>
          </Typography>

          <Chip
            label={priority.toLowerCase()}
            size="small"
            sx={{
              backgroundColor: priorityColors.bg,
              color: priorityColors.text,
              fontWeight: 500,
            }}
          />
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "flex-end",
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing(1, 2),
        }}
      >
        <Button
          size="small"
          startIcon={<EditIcon fontSize="small" />}
          onClick={onEdit}
          sx={{ textTransform: "none" }}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon fontSize="small" />}
          onClick={onDelete}
          sx={{ textTransform: "none" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
