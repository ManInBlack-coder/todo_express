const fs = require('fs');
const { readFile, writeFile } = require('../index'); 

jest.mock('../index');  
jest.mock('fs');      

describe('DELETE /delete-task/:taskId', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { taskId: '1' } }; 
    res = {
      redirect: jest.fn(),
      status: jest.fn(() => res), 
      send: jest.fn()  
    };

    readFile.mockResolvedValue([
      { id: 1, name: 'Task 1' },
      { id: 2, name: 'Task 2' }
    ]);

    writeFile.mockResolvedValue();

    fs.writeFile.mockImplementation((path, data, encoding, callback) => callback(null));
  });

  afterEach(() => {
    jest.clearAllMocks();  
  });

  it('should delete the task and redirect to /', async () => {
    const deletedTaskId = parseInt(req.params.taskId);  
    const tasks = await readFile('./tasks.json');
    const updatedTasks = tasks.filter(task => task.id !== deletedTaskId);
    const updatedTasksJson = JSON.stringify(updatedTasks, null, 2);
    await writeFile('./tasks.json', updatedTasksJson);
    await res.redirect('/');  

    expect(readFile).toHaveBeenCalledWith('./tasks.json');  
    expect(fs.writeFile).toHaveBeenCalledWith('./tasks.json', updatedTasksJson, 'utf-8', expect.any(Function));  
    expect(res.redirect).toHaveBeenCalledWith('/');  
  });
});
