import { Configuration, OpenAIApi } from 'openai';
import  RenderData  from "./render";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const generateSSE = async (req, res) => {
  
    const emitSSE= (res,  data) =>{        
        res.write("data: " + data + '\n\n');
        //res.write(data);
        res.flush()
      }

   
  console.log("req.body",req)
 const response = await openai.createCompletion(
      {model:'code-davinci-002',//code-davinci-002',
      prompt:`${req.body.userInput}`,
      max_tokens:256,
      temperature:0,
      stream:true, 
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
   } 
  );

   res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        console.log("***************")
        let loadInterval ;
        emitSSE(res, "starting");
        
        let collected_events = [];
        let completion_text = {text:'test123'};
       let eachData ="";
        
        let dt ="";
        let prevData =""
       for (let data of response.data) {
        
        if(data === "\n" && prevData === "\n"){
          prevData =data
          data = data.replace("\n","")    
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
        
        
        
        
        }
        const finalArray =[]
        collected_events.pop();
        collected_events.forEach(element => {
          finalArray.push(JSON.parse(element.trim().replace("data:","")).choices[0].text)
          emitSSE(res, JSON.parse(element.trim().replace("data:","")).choices[0].text);
        });
  console.log("=======================")
  console.log(finalArray.join(""))
  

  
};

const generateSSE2 = async (req, res) => {

    const emitSSE= (res, id, data) =>{
        res.write('id: ' + id + '\n');
        res.write("data: " + data + '\n\n');
        res.flush()
      }
      
      
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        const id = (new Date()).toLocaleTimeString();
        // Sends a SSE every 3 seconds on a single connection.
        setInterval(function() {
          emitSSE(res, id, (new Date()).toLocaleTimeString());
        }, 1000);
      
        emitSSE(res, id, (new Date()).toLocaleTimeString());
      

}
export default generateSSE