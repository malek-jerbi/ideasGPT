import pkg from 'openai';
import { OPENAI_API_KEY } from '../config.js';

const { Configuration, OpenAIApi } = pkg;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateIdea(existingIdeas, req, res) {
  if (!openai.configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: generatePrompt(existingIdeas),
      temperature: 0.6,
      max_tokens: 1000,
    });

    res.json(completion.data.choices[0].message.content);
    
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw new Error(error.response.data.message);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error(
        'OpenAI API error: An error occurred during your request.',
      );
    }
  }
}

function generatePrompt(existingIdeas) {
  const chatCompletion = [
    {
      role: 'system',
      content: `You are a helpful assistant that suggests startup ideas for people with a background in programming and computer science. You never answer as if you were in a conversation. for example, "Sure, here is another startup idea..." is not accepted.  you only answer with a raw idea. The following are existing ideas:`,
    },
  ];

  const lastTenIdeas =
    existingIdeas.length > 10
      ? existingIdeas.slice(existingIdeas.length - 10)
      : existingIdeas;

  lastTenIdeas.forEach((idea) => {
    chatCompletion.push({
      role: 'user',
      content: idea.text,
    });
  });

  chatCompletion.push({
    role: 'user',
    content: 'Suggest only one more startup idea.',
  });

  return chatCompletion;
}

export { generateIdea, openai };
