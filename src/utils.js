export const formatDate = (date) => `Due: ${date.toLocaleDateString('en-PH', { timeZone: 'Asia/Manila' })}`;

export const validateTask = ({ title, dueDate } = {}) => Boolean(title && dueDate);

export const mergeTaskUpdate = (original, ...updates) =>
  updates.reduce((merged, update) => ({ ...merged, ...update }), { ...original });