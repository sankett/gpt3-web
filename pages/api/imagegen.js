import { Configuration, OpenAIApi } from 'openai';
import NextCors from 'nextjs-cors';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const generateImage = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
    const response = await openai.createImage({
        prompt: `${req.body.userInput}`,
        n: 1,
        size: "512x512",
      });
      const imageUrl = response.data.data[0].url;
      
      res.status(200).json({ output: imageUrl });
};
export default generateImage