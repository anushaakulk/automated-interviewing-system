const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TodoSchema = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});
let QuestionSchema = new Schema({
    question1:[{
        q:{
            type: String
        },
        x:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }],
        y:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }],
        z:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }]
    }],
    question2:[{
        q:{
            type: String
        },
        x:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }],
        y:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }],
        z:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }]
    }],
    question3:[{
        q:{
            type: String
        },
        x:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }],
        y:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }],
        z:[{
            q: {
                type: String
            },
            a: {
                type: String
            }
        }]
    }]
    // question4:[{
    //     q:{
    //         type: String
    //     },
    //     x:[{
    //         q: {
    //             type: String
    //         },
    //         a: {
    //             type: String
    //         }
    //     }],
    //     y:[{
    //         q: {
    //             type: String
    //         },
    //         a: {
    //             type: String
    //         }
    //     }],
    //     z:[{
    //         q: {
    //             type: String
    //         },
    //         a: {
    //             type: String
    //         }
    //     }]
    // }],
    // question5:[{
    //     q:{
    //         type: String
    //     },
    //     x:[{
    //         q: {
    //             type: String
    //         },
    //         a: {
    //             type: String
    //         }
    //     }],
    //     y:[{
    //         q: {
    //             type: String
    //         },
    //         a: {
    //             type: String
    //         }
    //     }],
    //     z:[{
    //         q: {
    //             type: String
    //         },
    //         a: {
    //             type: String
    //         }
    //     }]
    // }]
});
  
// Student Modal Schema
let AnswerSchema = new Schema({
    answer1:{
        type: String
    },
    answer2:{
        type: String
    },
    answer3:{
        type: String
    }
});
const Todo = mongoose.model('todo', TodoSchema);
const Question = mongoose.model('question', QuestionSchema);
const Answer = mongoose.model('answer', AnswerSchema);
module.exports = {
    Todo, Question, Answer
}