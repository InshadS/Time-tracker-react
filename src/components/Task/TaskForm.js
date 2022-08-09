import moment from 'moment';
import React, { useState } from 'react';
import { addTask } from '../../api/task';
import './style.css';

function TaskForm({ user, submitTask, setSubmitTask }) {
  const [task, setTask] = useState('');
  const [startTime, setStartTime] = useState('');
  const userId = user.id;

  const handleSubmit = () => {
    if (/^\s*$/.test(task)) {
      return;
    }
    setStartTime(moment().format());
  };

  const endSubmit = async (e) => {
    const endTime = moment().format();

    const difference = moment(endTime).diff(moment(startTime));

    const duration = moment.duration(difference);
    const format = moment.utc((duration * 1000) / 1000).format('HH:mm:ss');

    console.log(duration);

    const taskDuration = format;

    setSubmitTask(!submitTask);

    await addTask(userId, task, startTime, endTime, taskDuration);
    setTask('');
    setStartTime();
  };

  return (
    <div className='task-form d-flex justify-content-between align-items-center'>
      <input
        type='text'
        placeholder='What are you working on?'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {/* <span>00:00:00</span> */}

      {startTime ? (
        <button className='btn-danger' onClick={() => endSubmit()}>
          Stop
        </button>
      ) : (
        <button onClick={() => handleSubmit()}>Start</button>
      )}
    </div>
  );
}

export default TaskForm;
