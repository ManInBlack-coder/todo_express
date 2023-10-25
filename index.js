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
            const tasks = data.split("\n");
            resolve(tasks);
        } )
    } )
} 



app.get('/', async (req,res) =>{
    const tasks = await readFile('../tasks')
    console.log(tasks)
    res.render('index.ejs', {tasks} )
})


// For parsing app 
app.use(express.urlencoded({extended: true}));


app.post('/', async (req,res) => {
    const tasks = await readFile('../tasks');
    tasks.push(req.body.task);
    const data = tasks.join('\n');
    fs.writeFile('../tasks', data, err =>{
        if (err) return;
        res.redirect('/')
    } )
})

app.listen(3001, () => {
    console.log('Example app is started at http://localhost:3001')

})



// 4 Lõpus jäid poolelei