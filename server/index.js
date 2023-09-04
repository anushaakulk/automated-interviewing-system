import express from "express";
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
const todoRoutes = express.Router();
const PORT = 4000;
// // import abc from './api.js';
import {Todo} from './todo.model.cjs';
// import {Question} from './todo.model.cjs';
// import {Answer} from './todo.model.cjs';

import { OpenAI } from "./openai2.js";
import dotenv from 'dotenv';
import {Question} from './todo.model.cjs';
dotenv.config();
// Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
const openAI = new OpenAI("API-KEY");
const model = 'text-davinci-003';
// Function to generate the prompt for the OpenAI API 
// In the future, it will be moved to a helper class in the next code review
const generatePrompt = (ans1,ans2) => {
    return `Compare 2 answers "${ans1}" and "${ans2}" and show the similarity on a scale of 0 to 10. Only print the number.`
};

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// abc.save()
// .then(() => console.log(`Saved question to database`))
// .catch((err) => console.error(err));

app.use(cors());
app.use(bodyParser.json());
let q1="";
Question.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
    q1 = post.question1[0].x[0].q;
  });
let ans1 = "";
let ans2 = "";
Question.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
    ans1 = post.question1[0].x[0].a;
    ans2 = post.question1[0].y[0].a;
    // console.log( post.question1[0].x[0].a );
  });

let mark = "";
// Todo.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec (function(err, post) {
//     mark = post.todo_description;
//     console.log( "Last record is "+ post.todo_description );
//   });

todoRoutes.route('/questions').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            // console.log("fsafda");
            res.json(q1);
        }
    });
});
todoRoutes.route('/marks').get(function(req, res) {
    Todo.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec (function(err, todo) {
        mark = todo.todo_description;
        res.json(mark);
    });
});
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/add').post(function(req, res) {
    // let todo = new Todo(req.body);
    openAI.generateText(generatePrompt(req.body.todo_description,ans1), model, 20)
    .then(text => {
        console.log(req.body.todo_description);
        console.log(ans1);
        const response = text;
        const newTodo = {
            "todo_description": response,
            "todo_responsible": "this.state.todo_responsible",
            "todo_priority": "this.state.todo_priority",
            "todo_completed": false
          };
          let todo = new Todo(newTodo);
          todo.save()
            .then(todo => {
                res.status(200).json({'todo': 'todo added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new todo failed');
            });
        console.log(text);
    })
    .catch(error => {
        console.error(error);
    });
});

todoRoutes.route('/delete/:id').delete(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.remove({"_id": req.params.id})
            .then(todo => {
                res.status(200).json({'todo': 'todo removed successfully'});
            })
            .catch(err => {
                res.status(400).send('deleting todo failed');
            });
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

