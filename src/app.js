 // app.js - Main application entry points
import {formatDate} from './utils.js';
import {validateTask} from './utils.js';
import {mergeTaskUpdate} from './utils.js';

 console.log('Server starting...');

 const title = 'Accomplish GT3';
 const dueDate = new Date('2026-07-22');

 console.log(formatDate(dueDate));
 console.log("Task Validation: " + validateTask({ title, dueDate }));
 console.log(mergeTaskUpdate({ title: 'Accomplish GT3' }, { title: 'Submit GT3' }));