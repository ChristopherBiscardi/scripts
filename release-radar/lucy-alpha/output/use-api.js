import { createMachine, assign, send, spawn } from 'xstate';
import { deleteTodo } from './api';

export const todoItem = createMachine({
  states: {
    idle: {
      on: {
        delete: 'deleting'
      }
    },
    deleting: {
      invoke: {
        src: deleteTodo,
        onDone: 'deleted'
      }
    },
    deleted: {
      type: 'final'
    }
  }
});

export const app = createMachine({
  states: {
    idle: {
      on: {
        new: {
          target: 'delete',
          actions: [
            assign({
              todo: spawn(todoItem, 'todoItem')
            })
          ]
        },
        delete: {
          target: 'end',
          actions: [
            send('delete', {
              to: (context) => context.todo
            })
          ]
        }
      }
    }
  }
});