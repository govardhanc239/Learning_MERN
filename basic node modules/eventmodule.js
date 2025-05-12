import events from 'events';

const eventEmitter = new events.EventEmitter();

function greetUser() {
  console.log('User greeted!');
}

eventEmitter.on('userLogin', greetUser);

eventEmitter.emit('userLogin');
