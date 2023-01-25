import { Configuration, OpenAIApi } from 'openai';
import NextCors from 'nextjs-cors';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const generateModeration = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
    
    const response = await openai.createModeration({
        input: `${req.body.userInput}`,
      });
     const flagged = response.data.results[0].flagged;
      
    res.status(200).json({ flagged: flagged });
};
export default generateModeration