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
          apiKey: '',
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
});
