import {
  cat,
  dog,
  help,
  recommend,
  start,
  tasks,
  weather,
  cancel,
} from '../../commands/commands.js';

const commands = {
  start: {
    description: 'Greetings',
    handler: start,
  },
  help: {
    description: 'Bot features description',
    handler: help,
  },
  weather: {
    description: 'Current weather in the specified city',
    handler: weather,
  },
  cat: {
    description: 'Image of a random cat',
    handler: cat,
  },
  dog: {
    description: 'Image of a random dog',
    handler: dog,
  },
  tasks: {
    description: 'Managing my tasks',
    handler: tasks,
  },
  recommend: {
    description: 'Recommend places, events, attractions',
    handler: recommend,
  },
  cancel: {
    description: 'Cancel the current operation',
    handler: cancel,
  },
};

export default commands;
