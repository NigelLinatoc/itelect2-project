export const formatDate = (date) => `Due: ${date.toLocaleDateString('en-PH', { timeZone: 'Asia/Manila' })}`;

export const validateTask = ({ title, dueDate } = {}) => Boolean(title && dueDate);

export const mergeTaskUpdate = (original, ...updates) =>
  updates.reduce((merged, update) => ({ ...merged, ...update }), { ...original });

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskValidationError';
  }
}
export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError('Invalid task data');
  }
  return { id: Date.now(), completed: false, ...taskData };
};

export const tasks = [
  { id: 1, title: 'Task 1', dueDate: new Date('2024-07-22'), completed: false },
  { id: 2, title: 'Task 2', dueDate: new Date('2024-08-15'), completed: true },
  { id: 3, title: 'Task 3', dueDate: new Date('2024-09-10'), completed: false },
];