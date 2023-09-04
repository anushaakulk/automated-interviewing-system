import { OpenAI } from "./openai2.js";
import dotenv from 'dotenv';
import {Question} from './todo.model.cjs';
dotenv.config();
// Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
const openAI = new OpenAI("API-KEY");
const topic = 'Metaverse';
const model = 'text-davinci-003';
// Function to generate the prompt for the OpenAI API 
// In the future, it will be moved to a helper class in the next code review
const generatePrompt = (topic) => {
    return `Write 3 short questions about "${topic}"`
};
// Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
let questionsArray =[];
let variations1=[];
let variations2=[];
let variations3=[];
let answers1=[];
let answers2=[];
let answers3=[];
await openAI.generateText(generatePrompt(topic), model, 50)
.then(text => {
    // Logging the generated text to the console
    // In the future, this will be replaced to upload the returned blog text to a WordPress site using the WordPress REST API
    const response = text;
    questionsArray = response.split('\n');
    console.log("question 1 : ");
    console.log(questionsArray[2]);
    console.log("question 2 : ");
    console.log(questionsArray[3]);
    console.log("question 3 : ");
    console.log(questionsArray[4]);
    // let abc = new Question({
    //     "question1": `${questionsArray[2]}`,
    //     "question2": `${questionsArray[3]}`,
    //     "question3": `${questionsArray[4]}`
    // });
    // abc.save()
    // .then(() => console.log(`Saved question to database`))
    // .catch((err) => console.error(err));
    console.log(text);
})
.catch(error => {
    console.error(error);
});
const generatePrompt2 = (text) => {
    return `Write 3 variations of the question "${text}"`
};
await openAI.generateText(generatePrompt2(questionsArray[2]), model, 50)
.then(text => {
    const response = text;
    variations1 = response.split('\n');
    console.log("variation 11 : ");
    console.log(variations1[2]);
    console.log("variation 12 : ");
    console.log(variations1[3]);
    console.log("variation 13 : ");
    console.log(variations1[4]);
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt2(questionsArray[3]), model, 50)
.then(text => {
    const response = text;
    variations2 = response.split('\n');
    console.log("variation 21 : ");
    console.log(variations2[2]);
    console.log("variation 22 : ");
    console.log(variations2[3]);
    console.log("variation 23 : ");
    console.log(variations2[4]);
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt2(questionsArray[4]), model, 50)
.then(text => {
    const response = text;
    variations3 = response.split('\n');
    console.log("variation 31 : ");
    console.log(variations3[2]);
    console.log("variation 32 : ");
    console.log(variations3[3]);
    console.log("variation 33 : ");
    console.log(variations3[4]);
    console.log(text);
})
.catch(error => {
    console.error(error);
});


const generatePrompt3 = (text) => {
    return `${text}`
};
await openAI.generateText(generatePrompt3(variations1[2]), model, 20)
.then(text => {
    const response = text;
    answers1[0]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations1[3]), model, 20)
.then(text => {
    const response = text;
    answers1[1]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations1[4]), model, 20)
.then(text => {
    const response = text;
    answers1[2]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});

await openAI.generateText(generatePrompt3(variations2[2]), model, 20)
.then(text => {
    const response = text;
    answers2[0]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations2[3]), model, 20)
.then(text => {
    const response = text;
    answers2[1]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations2[4]), model, 20)
.then(text => {
    const response = text;
    answers2[2]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations3[2]), model, 20)
.then(text => {
    const response = text;
    answers3[0]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations3[3]), model, 20)
.then(text => {
    const response = text;
    answers3[1]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});
await openAI.generateText(generatePrompt3(variations3[4]), model, 20)
.then(text => {
    const response = text;
    answers3[2]=response;
    console.log(text);
})
.catch(error => {
    console.error(error);
});

let abc = new Question({
        "question1": [{
            "q": `${questionsArray[2]}`,
            "x":[{
                "q": `${variations1[2]}`,
                "a": `${answers1[0]}`
            }],
            "y":[{
                "q": `${variations1[3]}`,
                "a": `${answers1[1]}`
            }],
            "z":[{
                "q": `${variations1[4]}`,
                "a": `${answers1[2]}`
            }]
        }],
        "question2": [{
            "q": `${questionsArray[3]}`,
            "x":[{
                "q":`${variations2[2]}`,
                "a":`${answers2[0]}`
            }],
            "y":[{
                "q":`${variations2[3]}`,
                "a":`${answers2[1]}`
            }],
            "z":[{
                "q":`${variations2[4]}`,
                "a":`${answers2[2]}`
            }]
        }],
        "question3": [{
            "q": `${questionsArray[4]}`,
            "x":[{
                "q":`${variations3[2]}`,
                "a":`${answers3[0]}`
            }],
            "y":[{
                "q":`${variations3[3]}`,
                "a":`${answers3[1]}`
            }],
            "z":[{
                "q":`${variations3[4]}`,
                "a":`${answers3[2]}`
            }]
        }]
        // "question4": [{
        //     "q": `${questionsArray[5]}`,
        //     "x":[{
        //         "q":"qx4",
        //         "a":"ax4"
        //     }],
        //     "y":[{
        //         "q":"qy4",
        //         "a":"ay4"
        //     }],
        //     "z":[{
        //         "q":"qz4",
        //         "a":"az4"
        //     }]
        // }],
        // "question5": [{
        //     "x":[{
        //         "q":"qx5",
        //         "a":"ax5"
        //     }],
        //     "y":[{
        //         "q":"qy5",
        //         "a":"ay5"
        //     }],
        //     "z":[{
        //         "q":"qz5",
        //         "a":"az5"
        //     }]
        // }]
    });
export default abc;
