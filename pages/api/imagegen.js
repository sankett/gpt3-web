import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const generateImage = async (req, res) => {
    const response = await openai.createImage({
        prompt: `${req.body.userInput}`,
        n: 1,
        size: "256x256",
      });
      const imageUrl = response.data.data[0].url;
      
      res.status(200).json({ output: imageUrl });
};
export default generateImage