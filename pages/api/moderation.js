import { Configuration, OpenAIApi } from 'openai';
import NextCors from 'nextjs-cors';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['OPTIONS','GET','POST',],
  })
);

const generateModeration = async (req, res) => {
  
  await cors(req, res);
    
    const response = await openai.createModeration({
        input: `${req.body.userInput}`,
      });
     const flagged = response.data.results[0].flagged;
      
    res.status(200).json({ flagged: flagged });
};
export default generateModeration