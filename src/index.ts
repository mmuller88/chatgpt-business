import dotenv from 'dotenv';

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

dotenv.config();

// OpenAIApi required config
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

// OpenAIApi initialization
const openai = new OpenAIApi(configuration);

export class Hello {
  public sayHello() {
    return 'hello, world!';
  }
}

const prompt = async () => {
  const modelId = 'gpt-3.5-turbo';
  const currentMessages: ChatCompletionRequestMessage[] = [
    { role: 'user', content: 'Hello, how are you?' },
  ];

  const result = await openai.createChatCompletion({
    model: modelId,
    messages: currentMessages,
  });

  const responseText = result.data.choices.shift()?.message?.content;

  return responseText;
};

const main = async () => {
  // const hello = new Hello();
  // console.log(hello.sayHello());

  const reply = await prompt();
  console.log(reply);
};

void main();
