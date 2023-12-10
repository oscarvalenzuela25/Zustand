import { DragEvent, useState } from 'react';
import { useTaskStore } from '../stores/tasks/tasks.store';
import { TaskStatus } from '../interfaces/task.interface';
import Swal from 'sweetalert2';

const useTaskHook = () => {
  const [onDragOver, setOnDragOver] = useState(false);
  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addTask = useTaskStore(state => state.addTask);

  const handleAddTask = async (status: TaskStatus) => {
    const { isConfirmed, value: inputValue } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      inputValidator: (value: string) => {
        if (!value) {
          return 'Debes escribir algo!';
        }
      },
    });
    if (!isConfirmed) return;
    addTask(inputValue, status);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return {
    onDragOver,
    isDragging,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

export default useTaskHook;
