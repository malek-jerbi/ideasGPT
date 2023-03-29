import pkg from 'openai'
import { OPENAI_API_KEY } from '../config.js'

const { Configuration, OpenAIApi } = pkg

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function generateIdea(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(),
      temperature: 0.6,
      max_tokens: 350,
      suffix: '7',
    })
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

function generatePrompt() {
  return `suggest only one more startup idea for people who have background of programming and computer science.
  1- An AI-driven platform for online tutoring and education, with personalized learning programs tailored to each student's needs. 
  2- A software development service that creates custom applications for businesses in need of automation or improved efficiency. 
  3- A cloud-based data storage and sharing platform designed specifically for medical professionals and researchers to securely store patient records and share research findings more easily among colleagues globally. 
  4- A blockchain-powered marketplace that connects freelancers with employers looking for short-term projects requiring advanced programming skillsets, such as developing smart contracts or creating decentralized applications (DApps). 
  5- An artificial intelligence (AI)-driven search engine which uses natural language processing (NLP) algorithms to match job seekers.
  6-`
}

export { generateIdea }
