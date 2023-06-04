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

  const urls = [
    'https://www.google.com',
    'https://martinmueller.dev',
    'https://martinmueller.dev/contact',
    'https://www.amazon.com',
  ];

  const currentMessages: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: `
        You are a system to extract the most important information.
        You can only answer using the json format. Care to not include any trailing commas.
        You can not write any text outside of the brackets of the json. If you have anything to add include your thoughts to the comment field inside the json object.
      `,
    },
    {
      role: 'user',
      content: `
        List IT companies from Lisbon.
        An example would look like this: ${JSON.stringify({
          url: ['https://mywebsite.pt'],
        })}.
        The url key is an array of strings, not objects.
      `,
    },
    // {
    //   role: 'user',
    //   content: `
    //     These are the URLs you are about to assess: ${JSON.stringify(urls)}
    //     Order the following URLs by the amount of information they might convey, e.g. URLs of contact pages, privacy policies or about pages are more important, you can limit the most_promising_urls list up.
    //     Please punish external urls, like social media with lower importance.
    //     An example would look like this: ${JSON.stringify({
    //       most_promising_urls: ['https://mywebsite.com/imprint'],
    //       comment: 'The /imprint page sounds promising',
    //     })}.
    //     The most_promising_urls key is an array of strings, not objects.
    //   `,
    // },
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
