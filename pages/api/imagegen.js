import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const generateImage = async (req, res) => {
    const response = await openai.createImage({
        prompt: `${req.body.imageInput}`,
        n: 1,
        size: "512x512",
      });
      const imageUrl = response.data.data[0].url;
      
      res.status(200).json({ imageUrl });
};
export default generateImage