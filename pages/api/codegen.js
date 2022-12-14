import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const generateCode = async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${req.body.codeInput}`,
        temperature: 0.7,
        max_tokens: 735,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        });
      const data = response.data.choices[0];
      
      res.status(200).json({ data });
};
export default generateCode