import { generateIdea, openai } from '../controllers/openaiController'; // Replace with your actual controller file path
import { Configuration } from 'openai';

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
    // Set the API key to null
    openai.configuration.apiKey = null;

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
    // Set the API key to a sample value
    openai.configuration.apiKey = 'sample-api-key';
  
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    const existingIdeas = [
      { text: 'Idea 1' },
      { text: 'Idea 2' },
      { text: 'Idea 3' },
    ];
  
    // Mock the openai.createChatCompletion method
    openai.createChatCompletion.mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: 'A startup idea...',
            },
          },
        ],
      },
    });
  
    await generateIdea(existingIdeas, req, res);

    expect(res.json).toHaveBeenCalledWith('A startup idea...');
  });
  
  
});
