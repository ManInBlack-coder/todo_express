const request = require('supertest');
const express = require('express');
const app = express();
const fs = require('fs').promises; 

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.post('/', (req, res) => {
  let error = null;

  if (req.body.task.trim().length === 0) {
    error = 'please insert correct task data';
    
    fs.readFile('./tasks.json', 'utf8')
      .then(tasks => {
        res.render('index', {
          tasks: JSON.parse(tasks),
          error: error
        });
      });
  }
});

describe('POST / - empty task validation', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should show error when task is empty', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify([{ task: 'Existing Task' }]));

    const res = await request(app)
      .post('/')
      .send({ task: '' }); 

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('please insert correct task data');
    expect(res.text).toContain('Existing Task');
  });
});
