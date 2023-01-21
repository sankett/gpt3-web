
import GPT from './gpt';


export default function Home() {


  return (

    <div id="app">
     
      <div className='divHeader'>
        Sanket's OpenAI showcase <span className='subspan'><sub>Powered by Next.JS</sub></span>
      </div>
      <span className='col2'><GPT /></span>  
      
      <div>
        <span className='subspan'><sub>Disclaimer: This is a showcase of GPT-3. The content generated is not endorsed by me.</sub></span>
      </div>
      
     
      
    </div>
     
      
    

   
  );
}
