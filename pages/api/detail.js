import { Configuration, OpenAIApi } from 'openai';
import NextCors from 'nextjs-cors';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const basePromptPrefix =
`
Write me a detailed table of contents for a blog post with the title below.

Title:
`
const generateAction = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  `
  Take the table of contents and title of the blog post below and generate a blog post written in thwe style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

  Title: ${req.body.userInput}

  Table of Contents: ${basePromptOutput.text}

  Blog Post:
  `


  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0.5,
		// I also increase max_tokens.
    max_tokens: 3000,
    presence_penalty: 0,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};



export default generateAction