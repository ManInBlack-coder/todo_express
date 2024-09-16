const request = require('supertest');
const express = require('express');
const app = express();
const fs = require('fs').promises; 

app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
  try {
    const tasks = await fs.readFile('./tasks.json', 'utf8'); 
    res.render('index.ejs', { tasks: JSON.parse(tasks), error: null });
  } catch (error) {
    res.render('index.ejs', { tasks: [], error: 'Error reading file' });
  }
});

describe('GET /', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should render tasks when file is read successfully', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify([{ task: 'Test Task 1' }, { task: 'Test Task 2' }]));

    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Test Task 1');
    expect(res.text).toContain('Test Task 2');
  });

  it('should render error when readFile fails', async () => {
    jest.spyOn(fs, 'readFile').mockRejectedValue(new Error('File read error'));

    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);

    expect(res.text).toContain('Error reading file');
  });
});
