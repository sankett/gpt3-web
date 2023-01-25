import { Configuration, OpenAIApi } from 'openai';
import NextCors from 'nextjs-cors';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const promptArray = [
  {
    id: 1,
    name: 'Grammar Correction',
    model: "text-davinci-003",
    prompt: `Correct this to standard English:

    She no went to the market.`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    id: 2,
    name: 'Summarize-second-grade student',
    model: "text-davinci-003",
    prompt: `Summarize this for a second-grade student:

    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, 
    but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the 
    naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] 
    When viewed from Earth, Jupiter can be bright 
    enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.`,
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    id: 3,
    name: 'English to other languages',
    model: "text-davinci-003",
    prompt: `Translate this into 1. French, 2. Spanish and 3. Japanese:

    What rooms do you have available?`,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    id: 4,
    name: 'TL;DR summarization',
    model: "text-davinci-003",
    prompt: `A neutron star is the collapsed core of a massive supergiant star, which had a total mass of 
    between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are 
    the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have 
    a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, 
    combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.

    Tl;dr`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 1,
    stream: false,
  },
  {
    id: 5,
    name: 'Interview questions',
    model: "text-davinci-003",
    prompt: `Create a list of 8 questions for my interview with a science fiction author:`,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    id: 6,
    name: 'Essay Outline',
    model: "text-davinci-003",   
    prompt: `Create an outline for an essay about Nikola Tesla and his contributions to technology:`,
    temperature: 0.3,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
]

const generateAction = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  
  const promptQuery = req.body.userInput;
  
  const response = await openai.createCompletion({
    model: promptQuery.model,
    prompt: promptQuery.preprompt + promptQuery.prompt,
    temperature: promptQuery.temperature, 
    max_tokens: promptQuery.max_tokens, 
    frequency_penalty: promptQuery.frequency_penalty, 
    presence_penalty: promptQuery.presence_penalty, 
    stream:promptQuery.stream, 
  });

    
    const promptOutput = response.data.choices.pop(); 
   
    res.status(200).json({ output: promptOutput });
    
}

export default generateAction