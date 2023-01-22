import Image from 'next/image';
import GPT from './gpt';
import signature1 from '../assets/signature1.jpg'

export default function Home() {


  return (

    <div id="app">
     
      <div className='divHeader'>
      <span><Image src={signature1} height={70} width={210} /></span><span className='signature'> OpenAI-GPT showcase 
      <span className='subspan'><sub>Powered by Next.JS</sub></span></span>
      </div>
      <span className='col2'><GPT /></span>  
      
      <div>
        <span className='subspan'><sub>Disclaimer: This is a showcase of GPT-3. The content generated is not endorsed by me.</sub></span>
      </div>
      
     
      
    </div>
     
      
    

   
  );
}
