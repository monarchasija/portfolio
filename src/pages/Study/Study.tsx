import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaClock, 
  FaFire, 
  FaBullseye, 
  FaBook, 
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaTimes,
  FaTag
} from 'react-icons/fa';
import { studyTasks, studyProgress } from '../../data/studyData';
import type { StudyTask } from '../../types/study';
import './Study.css';

const Study: React.FC = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('studyTasks');
    return savedTasks ? JSON.parse(savedTasks) : studyTasks;
  });
  const [selectedLabel, setSelectedLabel] = useState<string>('all');
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('studyProgress');
    return savedProgress ? JSON.parse(savedProgress) : studyProgress;
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    labels: [] as string[],
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedTime: ''
  });
  const [newLabel, setNewLabel] = useState('');

  // Get all unique labels from tasks
  const allLabels: string[] = Array.from(new Set(tasks.flatMap((task: StudyTask) => task.labels)));
  const labels: string[] = ['all', ...allLabels];

  const filteredTasks = tasks.filter((task: StudyTask) => {
    return selectedLabel === 'all' || task.labels.includes(selectedLabel);
  });

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks: StudyTask[]) => {
      const newTasks = prevTasks.map((task: StudyTask) => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('studyTasks', JSON.stringify(newTasks));
      return newTasks;
    });
    updateProgress();
  };

  const toggleSubtaskCompletion = (taskId: string, subtaskId: string) => {
    setTasks((prevTasks: StudyTask[]) => {
      const newTasks = prevTasks.map((task: StudyTask) => 
        task.id === taskId 
          ? {
              ...task,
              subtasks: task.subtasks?.map(subtask =>
                subtask.id === subtaskId 
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              )
            }
          : task
      );
      localStorage.setItem('studyTasks', JSON.stringify(newTasks));
      return newTasks;
    });
    updateProgress();
  };

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const updateProgress = () => {
    const completedTasks = tasks.filter((task: StudyTask) => task.completed).length;
    const inProgressTasks = tasks.filter((task: StudyTask) => 
      !task.completed && task.subtasks?.some(st => st.completed)
    ).length;

    const labelsProgress: { [key: string]: { completed: number; total: number } } = {};
    allLabels.forEach((label: string) => {
      const labelTasks = tasks.filter((task: StudyTask) => task.labels.includes(label));
      labelsProgress[label] = {
        completed: labelTasks.filter((task: StudyTask) => task.completed).length,
        total: labelTasks.length
      };
    });

    const newProgress = {
      ...progress,
      completedTasks,
      inProgressTasks,
      labelsProgress
    };

    setProgress(newProgress);
    localStorage.setItem('studyProgress', JSON.stringify(newProgress));
  };

  const getTaskProgress = (task: StudyTask) => {
    if (!task.subtasks) return task.completed ? 100 : 0;
    const completedSubtasks = task.subtasks.filter(st => st.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const addLabelToNewTask = (label: string) => {
    if (label && !newTask.labels.includes(label)) {
      setNewTask(prev => ({
        ...prev,
        labels: [...prev.labels, label]
      }));
    }
    setNewLabel('');
  };

  const removeLabelFromNewTask = (labelToRemove: string) => {
    setNewTask(prev => ({
      ...prev,
      labels: prev.labels.filter(label => label !== labelToRemove)
    }));
  };

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const task: StudyTask = {
      id: `task-${Date.now()}`,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      labels: newTask.labels,
      difficulty: newTask.difficulty,
      estimatedTime: newTask.estimatedTime || '1 hour',
      completed: false,
      createdAt: new Date(),
      subtasks: []
    };

    setTasks((prevTasks: StudyTask[]) => {
      const newTasks = [...prevTasks, task];
      localStorage.setItem('studyTasks', JSON.stringify(newTasks));
      return newTasks;
    });

    // Reset form
    setNewTask({
      title: '',
      description: '',
      labels: [],
      difficulty: 'beginner',
      estimatedTime: ''
    });
    setShowAddTask(false);
    updateProgress();
  };

  const cancelAddTask = () => {
    setNewTask({
      title: '',
      description: '',
      labels: [],
      difficulty: 'beginner',
      estimatedTime: ''
    });
    setShowAddTask(false);
  };

  useEffect(() => {
    updateProgress();
  }, [tasks]);

  return (
    <div className="study-page">
      <div className="container">
        <div className="study-header">
          <Link to="/projects" className="back-link">
            <FaArrowLeft />
            Back to Projects
          </Link>
          <h1 className="page-title">Study Roadmap</h1>
          <p className="page-description">
            Track your learning progress with structured roadmaps and tasks
          </p>
        </div>

        {/* Progress Overview */}
        <div className="progress-overview">
          <div className="progress-card">
            <div className="progress-icon">
              <FaBullseye />
            </div>
            <div className="progress-info">
              <h3>Overall Progress</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(progress.completedTasks / progress.totalTasks) * 100}%` }}
                ></div>
              </div>
              <span>{progress.completedTasks} / {progress.totalTasks} tasks completed</span>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-icon">
              <FaFire />
            </div>
            <div className="progress-info">
              <h3>Current Streak</h3>
              <div className="streak-number">{progress.currentStreak}</div>
              <span>days in a row</span>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-icon">
              <FaClock />
            </div>
            <div className="progress-info">
              <h3>In Progress</h3>
              <div className="streak-number">{progress.inProgressTasks}</div>
              <span>tasks started</span>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-icon">
              <FaBook />
            </div>
            <div className="progress-info">
              <h3>Weekly Goal</h3>
              <div className="streak-number">{progress.weeklyGoal}</div>
              <span>tasks per week</span>
            </div>
          </div>
        </div>

        {/* Filter and Add Task */}
        <div className="controls-section">
          <div className="filter-group">
            <label>Filter by Label:</label>
            <select 
              value={selectedLabel} 
              onChange={(e) => setSelectedLabel(e.target.value)}
            >
              {labels.map((label: string) => (
                <option key={label} value={label}>
                  {label === 'all' ? 'All Labels' : label}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="add-task-button"
            onClick={() => setShowAddTask(true)}
          >
            <FaPlus />
            Add New Task
          </button>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="modal-overlay">
            <div className="add-task-modal">
              <div className="modal-header">
                <h3>Add New Task</h3>
                <button className="close-button" onClick={cancelAddTask}>
                  <FaTimes />
                </button>
              </div>
              
              <div className="modal-content">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Labels</label>
                  <div className="labels-input">
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Add a label"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addLabelToNewTask(newLabel);
                        }
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => addLabelToNewTask(newLabel)}
                      disabled={!newLabel.trim()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="existing-labels">
                    <span>Quick add:</span>
                    {allLabels.map((label: string) => (
                      <button
                        key={label}
                        type="button"
                        className="label-quick-add"
                        onClick={() => addLabelToNewTask(label)}
                        disabled={newTask.labels.includes(label)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="selected-labels">
                    {newTask.labels.map((label: string) => (
                      <span key={label} className="selected-label">
                        <FaTag />
                        {label}
                        <button onClick={() => removeLabelFromNewTask(label)}>
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Difficulty</label>
                    <select
                      value={newTask.difficulty}
                      onChange={(e) => setNewTask(prev => ({ 
                        ...prev, 
                        difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced'
                      }))}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Estimated Time</label>
                    <input
                      type="text"
                      value={newTask.estimatedTime}
                      onChange={(e) => setNewTask(prev => ({ ...prev, estimatedTime: e.target.value }))}
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-button" onClick={cancelAddTask}>
                  Cancel
                </button>
                <button 
                  className="add-button"
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim() || !newTask.description.trim()}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="tasks-section">
          <h2>Tasks ({filteredTasks.length})</h2>
          <div className="tasks-list">
            {filteredTasks.map((task: StudyTask) => (
              <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                  <div className="task-main">
                    <button
                      className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed && <FaCheckCircle />}
                    </button>
                    <div className="task-info">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <div className="task-meta">
                        <div className="task-labels">
                          {task.labels.map((label: string) => (
                            <span key={label} className="task-label">
                              <FaTag />
                              {label}
                            </span>
                          ))}
                        </div>
                        <span 
                          className="task-difficulty"
                          style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
                        >
                          {task.difficulty}
                        </span>
                        <span className="task-time">
                          <FaClock /> {task.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="task-actions">
                    <div 
                      className="task-progress-circle"
                      style={{
                        background: `conic-gradient(var(--color-primary) ${getTaskProgress(task) * 3.6}deg, var(--color-border) 0deg)`
                      }}
                    >
                      <span>{getTaskProgress(task)}%</span>
                    </div>
                    {task.subtasks && (
                      <button
                        className="expand-button"
                        onClick={() => toggleTaskExpansion(task.id)}
                      >
                        {expandedTasks.has(task.id) ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    )}
                  </div>
                </div>

                {expandedTasks.has(task.id) && (
                  <div className="task-details">
                    {task.prerequisites && task.prerequisites.length > 0 && (
                      <div className="prerequisites">
                        <h4>Prerequisites:</h4>
                        <div className="prerequisite-tags">
                          {task.prerequisites.map((prereq: string) => {
                            const prereqTask = tasks.find((t: StudyTask) => t.id === prereq);
                            return (
                              <span 
                                key={prereq} 
                                className={`prerequisite-tag ${prereqTask?.completed ? 'completed' : ''}`}
                              >
                                {prereqTask?.title || prereq}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {task.subtasks && (
                      <div className="subtasks">
                        <h4>Subtasks:</h4>
                        <div className="subtasks-list">
                          {task.subtasks.map(subtask => (
                            <div key={subtask.id} className="subtask">
                              <button
                                className={`subtask-checkbox ${subtask.completed ? 'checked' : ''}`}
                                onClick={() => toggleSubtaskCompletion(task.id, subtask.id)}
                              >
                                {subtask.completed && <FaCheckCircle />}
                              </button>
                              <span className={subtask.completed ? 'completed' : ''}>
                                {subtask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.resources && (
                      <div className="resources">
                        <h4>Resources:</h4>
                        <div className="resources-list">
                          {task.resources.map((resource, index: number) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resource-link"
                            >
                              <FaExternalLinkAlt />
                              <span>{resource.title}</span>
                              <span className="resource-type">{resource.type}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;