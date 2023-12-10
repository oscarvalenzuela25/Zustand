import React, { FC } from 'react';
import { Task } from '../../interfaces/task.interface';
import { IoReorderTwoOutline } from 'react-icons/io5';
import { useTaskStore } from '../../stores/tasks/tasks.store';

interface Props {
  task: Task;
}

const SingleTask: FC<Props> = ({ task }) => {
  const setDraggingTaskId = useTaskStore(state => state.setDraggingTaskId);
  const removingDraggingTaskId = useTaskStore(
    state => state.removingDraggingTaskId
  );
  return (
    <div
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={removingDraggingTaskId}
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};

export default SingleTask;
