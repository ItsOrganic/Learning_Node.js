const express = require('express')
require('./db/mongoose')
const User = require('../src/models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000


// to use the data sent from postman raw json
app.use(express.json())
app.post('/users', (req,res) => {
    const user = new User(req.body)
    console.log(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req,res)=>{
    User.find({})
    .then((users) => {
        res.send(users)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
})

app.get('/users/:id', (req,res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    })
    .catch((error) => {
        res.status(500).send()
    })
})


app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save()
    .then(() => {
        res.send(task)
    })
    .catch((error) => {
        console.log("error has hit")
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})