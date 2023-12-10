import { StateCreator, create } from 'zustand';
import { Task, TaskStatus } from '../../interfaces/task.interface';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removingDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<
  TaskState,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter(task => task.status === status);
  },
  addTask: (title: string, status: TaskStatus) => {
    const id = uuid();
    set((prevState: TaskState) => {
      prevState.tasks[id] = { id, title, status };
    });
  },

  setDraggingTaskId: (taskId: string) =>
    set((prevState: TaskState) => {
      prevState.draggingTaskId = taskId;
    }),
  removingDraggingTaskId: () =>
    set((prevState: TaskState) => {
      prevState.draggingTaskId = undefined;
    }),
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    const newTask = { ...task, status };
    set((prevState: TaskState) => {
      prevState.tasks[taskId] = newTask;
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const { removingDraggingTaskId, changeTaskStatus, draggingTaskId } = get();
    if (!draggingTaskId) return;
    changeTaskStatus(draggingTaskId, status);
    removingDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: 'task-store' }))
);
