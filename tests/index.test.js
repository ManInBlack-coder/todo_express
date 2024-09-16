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

describe('POST /clear-tasks', () => {
  beforeEach(async () => {
    const initialTasks = [
      { id: 0, task: 'Task 1' },
      { id: 1, task: 'Task 2' }
    ];
    await writeTasksFile(initialTasks);
  });

  afterEach(async () => {
    await writeTasksFile([]);
  });

  test('should clear all tasks and write an empty array to tasks.json', async () => {
    const response = await request(app)
      .post('/clear-tasks')
      .expect(302); 

    const tasks = await readTasksFile();
    expect(tasks).toEqual([]); 
  });
});
