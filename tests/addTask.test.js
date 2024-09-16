const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../index'); 
const tasksFilePath = path.join(__dirname, './tasks.json');

const readTasksFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeTasksFile = (tasks) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

describe('POST / (Add Task)', () => {
  beforeEach(async () => {
    const initialTasks = [
      { id: 0, task: 'Initial Task 1' },
      { id: 1, task: 'Initial Task 2' }
    ];
    await writeTasksFile(initialTasks);
  });

  afterEach(async () => {
    await writeTasksFile([]);
  });

  test('should add a new task to tasks.json', async () => {
    await request(app)
      .post('/')
      .send({ task: 'New Task from Test' }) 
      .expect(302); 

    const tasks = await readTasksFile();
    expect(tasks.length).toBe(3); 
    expect(tasks[tasks.length - 1]).toEqual({ id: 2, task: 'New Task from Test' }); 
  });
});
