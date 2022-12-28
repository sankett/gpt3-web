import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const generateModeration = async (req, res) => {
    
    const response = await openai.createModeration({
        input: `${req.body.userInput}`,
      });
     const flagged = response.data.results[0].flagged;
      
    res.status(200).json({ flagged: flagged });
};
export default generateModeration