import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
async function getNum() {
  try {
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Write an blog post about chatgpt",
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
    });
    console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
    return response.data.choices[0].text;
  } catch (error) {
    throw error;
}
}
getNum();


