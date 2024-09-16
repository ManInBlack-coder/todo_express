const express = require('express')
const app = express()
const fs = require('fs');


// Kasuta EJS faile, et valmistada malli vaadete jaoks
const path = require('path')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

const readFile = (filename) =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(filename, 'utf-8', (err, data) =>{
            if (err){
                reject(err);
                return;
            }
            //const tasks = data.split("\n");
            const tasks = JSON.parse(data)
            resolve(tasks);
        } )
    } )
} 

const writeFile = (filename,data) => {
    return new Promise((resolve, reject) => {
        //get data from file 
        fs.writeFile(filename, data ,'utf-8', err =>{
            if (err) {
                console.error(err);
                return;
            }  
            resolve(true)
        });
    })
} 


app.get('/', async (req,res) =>{
    const tasks = await readFile('./tasks.json')
    console.log(tasks)
    res.render('index.ejs', {tasks: tasks,
    error:null},  )
})


// For parsing app 
app.use(express.urlencoded({extended: true}));


app.post('/', (req,res) => {
    //control data from form
    let error = null
    if(req.body.task.trim().length == 0){
        error='please insert correct task data'
        readFile('./tasks.json')
        .then(tasks =>{
            res.render('index', {
                tasks: tasks,
                error: error
            } )
        } )
    } 
    
    
    
    else {

    readFile('./tasks.json')
        .then(tasks => {
            
            let index
            if(tasks.length === 0){
                index = 0
            }  else{
                index = tasks[tasks.length - 1].id + 1
            }  
            const newTask = {
                "id":index,
                "task":req.body.task
            }
            console.log(newTask)
            
            tasks.push(newTask)
            console.log(tasks)
            data = JSON.stringify(tasks, null, 2)
            
            // Mulle endale
            // Kirjutasin 5. ülesande 8.lehe koodijupi
            writeFile('tasks.json', data)
            //-------------------------
            console.log(data)
            
            
            fs.writeFile('./tasks.json', data, 'utf8', (err,data) => {
                if(err){
                    console.error(err)
                    return;
                } else{
                    console.log('saved')
                }   
                res.redirect('/')
            }) 
        }) 
    }  
})


app.get('/delete-task/:taskId', (req,res) => {
    let deletedTaskId = parseInt(req.params.taskId)
    readFile('./tasks.json')
    .then(tasks =>{
        tasks.forEach((task, index) =>{
            if(task.id === deletedTaskId){
                tasks.splice(index, 1)
            } 
        } )
        data = JSON.stringify(tasks, null, 2)
        // Mulle endale
        // Kirjutasin 5. ülesande 8.lehe koodijupi
        writeFile('tasks.json', data)
        //-------------------------
        fs.writeFile('./tasks.json', data, 'utf-8', err => {
            if (err){
                console.error(err);
                return;
            }  
            //redirect to / to see result
            res.redirect('/')
        } )
    } )
} )

app.post('/clear-tasks', (req,res) =>{
    fs.writeFile('./tasks.json',JSON.stringify([],null,2),'utf-8',(err) => {
        if (err){
            console.log(err);
            return;
        } 
        res.redirect('/')
    });
});

// -------------------------


// 3. testi jaoks tegin selle.
// const startServer = () => {

//     app.listen(3000, () => {
//         console.log('Example app is started at http://localhost:3000')
    
//     })
// }

// module.exports = {app,startServer};


// -------------------------

app.listen(3001,() => {
    console.log('Example app is started at http://localhost:3000')
})




// J'tka kuuendal lehel

