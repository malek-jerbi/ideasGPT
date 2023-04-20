import { generateIdea, generatePrompt } from '../controllers/openaiController'; // Replace with your actual controller file path
import pkg from 'openai'
import { OPENAI_API_KEY } from '../config.js'

const { Configuration, OpenAIApi } = pkg

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

jest.mock('openai', () => {
  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => {
      return {
        createChatCompletion: jest.fn().mockResolvedValue({
          data: {
            choices: [
              {
                message: {
                  content: 'A startup idea...',
                },
              },
            ],
          },
        }),
        configuration: {
          apiKey: 'sample-api-key',
        },
      };
    }),
  };
});

describe('generateIdea()', () => {
  afterEach(() => {
    Configuration.mockClear();
  });

  it('returns error response when OpenAI API key is not configured', async () => {

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await generateIdea([], req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  

  it('returns a valid idea when called with a set of existing ideas', async () => {
    
    const existingIdeas = [
      { text: 'A mobile app that uses machine learning algorithms to identify and recommend similar products to customers based on their purchase history.' },
      { text: 'A web-based platform that uses machine learning algorithms to analyze and optimize email marketing campaigns for businesses, helping them to increase open rates, click-through rates, and conversions.' },
      { text: 'An AI-powered project management tool that uses natural language processing and machine learning to automate tasks, assign deadlines, and track progress, helping teams to collaborate more efficiently and complete projects on time.' },
    ];
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: generatePrompt(existingIdeas),
      temperature: 0.6,
      max_tokens: 1000,
    })

    expect(completion.data.choices[0].message.content).toBe('A startup idea...')
  });
});