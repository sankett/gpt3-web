import { Configuration, OpenAIApi } from 'openai';
import  RenderData  from "./render";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let collected_events = []
let completion_text = ''
const generateEvent = async (req, res) => {
  const start_time = Date.now();

  // send a Completion request to count to 100
  const response = await openai.createCompletion(
      {model:'code-davinci-002',//code-davinci-002',
      prompt:`${req.body.userInput}`,
      max_tokens:3000,
      temperature:0,
      stream:true, 
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
   } // this time, we set stream=True
  );
  
  
  let collected_events = [];
  let completion_text = {text:'test123'};
 let eachData ="";
  
  let dt ="";
  let prevData =""
 for (let data of response.data) {
  
  if(data === "\n" && prevData === "\n"){
    prevData =data
    data = data.replace("\n","|")    
    eachData = "";
  }
  else if(data === "\n" && prevData != "\n"){
    prevData =data
    data = data.replace("\n","")    
    eachData += data;
    
    collected_events.push(eachData)
    
  }
  else{
    prevData =data
    eachData += data;
  }
  
  
  
  dt += data;
  }
  const finalArray =[]
  collected_events.pop();
  collected_events.forEach(element => {
    finalArray.push(JSON.parse(element.trim().replace("data:","")).choices[0].text)
    
  });
  
 const finaldata= finalArray.join("")
 //const finaldata= RenderData(response)

      res.status(200).json({ output:  {text:finaldata} });
};
export default generateEvent