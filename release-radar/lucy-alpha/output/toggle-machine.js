import { createMachine } from 'xstate';

export const toggleMachine = createMachine({
  states: {
    on: {
      on: {
        toggle: 'off'
      }
    },
    off: {
      on: {
        toggle: 'on'
      }
    }
  }
});