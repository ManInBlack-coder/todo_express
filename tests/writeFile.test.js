const fs = require('fs');

describe('fs.writeFile unit test', () => {
  let res;

  beforeEach(() => {
    res = {
      redirect: jest.fn(), 
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should write data to the file and redirect on success', (done) => {
    jest.spyOn(fs, 'writeFile').mockImplementation((path, data, encoding, callback) => {
      callback(null); 
    });

    const data = JSON.stringify({ task: 'Test Task' });

    fs.writeFile('./tasks.json', data, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/');
      }

      expect(fs.writeFile).toHaveBeenCalledWith('./tasks.json', data, 'utf8', expect.any(Function));
      expect(res.redirect).toHaveBeenCalledWith('/');

      done();
    });
  });

  it('should handle errors when fs.writeFile fails', (done) => {
    jest.spyOn(fs, 'writeFile').mockImplementation((path, data, encoding, callback) => {
      callback(new Error('File write failed'));
    });

    const data = JSON.stringify({ task: 'Test Task' });

    jest.spyOn(console, 'error').mockImplementation(() => {});

    fs.writeFile('./tasks.json', data, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/');
      }

      expect(fs.writeFile).toHaveBeenCalledWith('./tasks.json', data, 'utf8', expect.any(Function));
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
      expect(res.redirect).not.toHaveBeenCalled();

      done();
    });
  });
});
