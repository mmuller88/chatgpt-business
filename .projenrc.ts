import { typescript } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'chatgpt-business',
  projenrcTs: true,

  authorEmail: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',

  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
    },
  },

  deps: ['openai', 'dotenv'],

  gitignore: ['.env'],
});
project.synth();
