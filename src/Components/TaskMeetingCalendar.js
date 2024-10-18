import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import TaskPopUp from './TaskPopUp';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskMeetingCalendar = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const userId = localStorage.getItem('user_id');
    try {
      const response = await fetch(`http://127.0.0.1:3000/tasks?user_id=${userId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (Array.isArray(data)) {
        const formattedTasks = data.map(task => ({
          title: task.title,
          description: task.description,
          completed: task.completed,
          start: task.due_date,
          end: task.due_date,
          id: task.id,
        }));
        setTasks(formattedTasks);
      } else {
        console.error("Expected data to be an array but got:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      fetchTasks();
    } else {
      console.error('User ID is not available in local storage.');
    }
  }, []);

  const handleDateClick = async (arg) => {
    const title = prompt('Enter Task Title:');
    if (title) {
      const userId = localStorage.getItem('user_id');
      try {
        const response = await fetch('http://127.0.0.1:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            due_date: arg.dateStr,
            description: '',
            completed: false,
            user_id: userId,
          }),
        });
        if (!response.ok) throw new Error('Failed to create task');
        fetchTasks();
      } catch (error) {
        alert('Failed to create task: ' + error.message);
      }
    }
  };

  const handleEventDrop = async (info) => {
    const { event } = info;
    const updatedDueDate = event.start.toISOString().split('T')[0];
    const taskToUpdate = tasks.find(task => task.id === event.id);

    if (taskToUpdate) {
      try {
        const response = await fetch(`http://127.0.0.1:3000/tasks/${taskToUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            due_date: updatedDueDate,
          }),
        });

        if (!response.ok) throw new Error('Failed to update task');
        fetchTasks();
      } catch (error) {
        alert('Failed to update task: ' + error.message);
      }
    }
  };

  const handleEventClick = async (info) => {
    if (window.confirm('Do you want to delete this task?')) {
      const taskId = info.event.id;

      try {
        const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete task');
        fetchTasks();
      } catch (error) {
        alert('Failed to delete task: ' + error.message);
      }
    }
  };

  const renderEventContent = (eventInfo) => {
    const { title, description, completed } = eventInfo.event;
    return (
      <div className="fc-event-content">
        <b>{title}</b>
        <TaskPopUp
          title={title}
          description={description}
          completed={completed}
        />
      </div>
    );
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={tasks}
            dateClick={handleDateClick}
            editable={true}
            eventDrop={handleEventDrop}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TaskMeetingCalendar;
