import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { DataTable } from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { useNavigate } from 'react-router-dom';
import { mockGroupTasks } from '../../data/mockGroupTasks';
import { mockSiteTasks } from '../../data/mockSiteTasks';
import { useApp } from '../../contexts/AppContext';
import { CreateTaskDialog } from './dialogs/CreateTaskDialog';
import type { Task } from '../../types/task';
import { Eye } from 'lucide-react';

const columns: Column[] = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 300 },
  { id: 'daysUntilDue', label: 'Days Until Due', minWidth: 120 },
  { id: 'completionType', label: 'Completion Type', minWidth: 150 },
  { 
    id: 'status', 
    label: 'Status', 
    minWidth: 100,
    format: (value: string) => (
      <Chip
        label={value}
        color={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'default'}
        size="small"
      />
    ),
  },
  { 
    id: 'actions', 
    label: 'Actions', 
    minWidth: 100,
    align: 'right',
    format: (value: string) => (
      <Button
        variant="outlined"
        size="small"
        startIcon={<Eye size={16} />}
        onClick={() => value}
        sx={{
          textTransform: 'none',
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
          },
        }}
      >
        View
      </Button>
    ),
  },
];

export const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const { activeBusinessGroup, activeSite } = useApp();
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [createType, setCreateType] = React.useState<'group' | 'site'>('group');

  const groupTasks = React.useMemo(() => {
    if (!activeBusinessGroup) return [];
    return mockGroupTasks
      .filter(task => task.groupId === activeBusinessGroup.id)
      .map(task => ({
        ...task,
        actions: () => navigate(`/tasks/${task.id}`),
      }));
  }, [activeBusinessGroup, navigate]);

  const siteTasks = React.useMemo(() => {
    if (!activeSite) return [];
    return mockSiteTasks
      .filter(task => task.siteId === activeSite.id)
      .map(task => ({
        ...task,
        actions: () => navigate(`/tasks/${task.id}`),
      }));
  }, [activeSite, navigate]);

  const handleCreateGroup = () => {
    setCreateType('group');
    setCreateDialogOpen(true);
  };

  const handleCreateSite = () => {
    setCreateType('site');
    setCreateDialogOpen(true);
  };

  const handleCreateSubmit = (task: Partial<Task>) => {
    console.log('Creating new task:', task);
    setCreateDialogOpen(false);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleExport = () => {
    console.log('Export tasks');
  };

  return (
    <Box>
      {activeBusinessGroup && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Group-Wide Tasks - {activeBusinessGroup.name}
          </Typography>
          <DataTable
            title="Group Tasks"
            columns={columns}
            data={groupTasks}
            onSearch={handleSearch}
            onCreate={handleCreateGroup}
            onExport={handleExport}
          />
        </Box>
      )}

      {activeSite && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Site-Specific Tasks - {activeSite.name}
          </Typography>
          <DataTable
            title="Site Tasks"
            columns={columns}
            data={siteTasks}
            onSearch={handleSearch}
            onCreate={handleCreateSite}
            onExport={handleExport}
          />
        </Box>
      )}

      <CreateTaskDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateSubmit}
        type={createType}
      />
    </Box>
  );
};