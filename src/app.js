 // app.js - Main application entry points
import {formatDate} from './utils.js';
import {validateTask} from './utils.js';
import {mergeTaskUpdate} from './utils.js';
import {TaskValidationError} from './utils.js';
import {createTask} from './utils.js';
import { fetchSampleUsers } from './api.js';

 console.log('Server starting...');

 const title = 'Accomplish GT3';
 const dueDate = new Date('2026-07-22');

 console.log(formatDate(dueDate));
 console.log("Task Validation: " + validateTask({ title, dueDate }));
 console.log(mergeTaskUpdate({ title: 'Accomplish GT3' }, { title: 'Submit GT3' }));
 async function main() {
      try {
    const users = await fetchSampleUsers();
    console.log('Fetched sample users:', users);
  } catch (error) {
    console.error('Error in fetchSampleUsers call:', error);
  }
  try{
    const task = createTask({ title, dueDate });
    console.log('Created task:', task);
  } catch (error) {
    console.error('Error in createTask:', error);
  }
}
main();