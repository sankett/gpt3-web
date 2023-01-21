import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;



const generateJD = async (req, res) => {

    const jobTitle = 'Technical Architect'
    const industry = 'tech'
    const numWords = 200
    const tone = 'Professional'
    const keyWords = '.Net React AWS Cloud SQL Server MongoDB'

    const prompt = `Write a job description for a  ${jobTitle} role 
        ${industry ? `in the ${industry} industry` : ""} that is around ${numWords || 200
        } words in a ${tone || "neutral"} tone. ${keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
        }. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits.`

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 250,
    });

    // Get the output
    const promptOutput = response.data.choices.pop();


    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: promptOutput });

}

export default generateJD