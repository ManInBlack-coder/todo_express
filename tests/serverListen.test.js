const { app, startServer } = require('../index'); 

describe('Server listen', () => {
    let listenSpy;

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    beforeEach(() => {
        listenSpy = jest.spyOn(app, 'listen').mockImplementation((port, callback) => {
            callback(); 
        });
    });

    afterEach(() => {
        listenSpy.mockRestore(); 
    });

    afterAll(() => {
        console.log.mockRestore(); 
    });

    it('should start server on port 3000 and log the message', () => {
        startServer();

        expect(listenSpy).toHaveBeenCalledWith(3000, expect.any(Function));
        expect(console.log).toHaveBeenCalledWith('Example app is started at http://localhost:3000');
    });
});
