import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Adicionar nova tarefa
  const addTask = () => {
    if (newTaskTitle && newTaskDesc) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDesc,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDesc('');
    }
  };

  // Editar tarefa
  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setNewTaskTitle(task.title);
    setNewTaskDesc(task.description);
    setEditTaskId(id);
  };

  // Salvar tarefa editada
  const saveTask = () => {
    setTasks(tasks.map((t) => (t.id === editTaskId ? { ...t, title: newTaskTitle, description: newTaskDesc } : t)));
    setNewTaskTitle('');
    setNewTaskDesc('');
    setEditTaskId(null);
  };

  // Excluir tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Marcar tarefa como concluída
  const completeTask = (id) => {
    const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, completed: true } : t));
    const completedTask = tasks.find((t) => t.id === id);
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      
      <div className="form">
        <input
          type="text"
          placeholder="Título"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
        />
        <button onClick={editTaskId ? saveTask : addTask}>
          {editTaskId ? 'Salvar Tarefa' : 'Adicionar Tarefa'}
        </button>
      </div>

      <h2>Tarefas Pendentes</h2>
      <ul>
        {tasks.map((task) =>
          !task.completed ? (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => completeTask(task.id)}>Concluir</button>
              <button onClick={() => editTask(task.id)}>Editar</button>
              <button onClick={() => deleteTask(task.id)}>Excluir</button>
            </li>
          ) : null
        )}
      </ul>

      <h2>Tarefas Concluídas</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
