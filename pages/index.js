import Head from 'next/head';
import Image from 'next/image';
import bot from '../assets/bot.svg'
import user from '../assets/user.svg'
import send from '../assets/send.svg'
import { useState, useEffect } from 'react';


function ChartStripe(props) {
  
  
  return (
    <div className={props.isAi ? 'wrapper ai' : 'wrapper'}>
       <div className="chat">
          <div className="profile">
            <Image src={props.isAi ? bot : user} alt={props.isAi ? 'bot' : 'user'} />
          </div>
          <div className="message" id={props.uniqueId}> {props.value}</div>
      </div>
    </div>
  )
}
export default function Home() {
  const [textContent, setTextContent] = useState('');
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState(`Explain GraphQL with some sample code`);

  const [isAi, setIsAi] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  const [listChatStripe, setListChatStripe] = useState([]);

  let loadInterval;
  let temp;
  const loader = () => {
      let textContent = 'Wait'

      loadInterval = setInterval(() => {
          // Update the text content of the loading indicator
          textContent += '.';

          // If the loading indicator has reached three dots, reset it
          if (textContent === 'Wait....') {
              textContent = 'Wait';
          }
          setTextValue(textContent)
      }, 300);
  }

  const typeText = (text) =>{

    let index = 0
    let textAtIndex =  '';
    let interval = setInterval(() => {
        if (index < text.length) {
            textAtIndex += text.charAt(index)
            setTextValue(textAtIndex)
            index++
        } else {
            clearInterval(interval)
        }
    }, 15)
  }
  
  function generateUniqueId() {
      const timestamp = Date.now();
      const randomNumber = Math.random();
      const hexadecimalString = randomNumber.toString(16);

      return `id-${timestamp}-${hexadecimalString}`;
  }

  

  const callGenerateCode = async () => {
    
    setTextValue('')
    setIsAi(false)
    

    const uniqueId = generateUniqueId()
    setUniqueId(uniqueId)
    setIsAi(true)


    loader();
    const response = await fetch('/api/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    
    clearInterval(loadInterval);
    const data = await response.json();
    const { output } = data;
    typeText(output.text)
  }

  const onUserChangedText = (event) => {    
    setIsAi(true)
    setUserInput(event.target.value);
    setTextValue(event.target.value)
  };

  const reset = () => {
    setTextValue('')
    setIsAi(false)
    setUserInput('');
  }
  return (
    <div id="app">
      <div className='divHeader'>Sanket's GPT3 AI showcase</div>
    <div id="chat_container">
     <ChartStripe value={textValue} isAi={isAi} uniqueId={uniqueId}/>
    </div>

    <div className='formclass'>
       
      <textarea name="prompt" rows="1" cols="1" placeholder="Ask me..."
      value={userInput} onChange={onUserChangedText}
      ></textarea>
        <button type="button" onClick={callGenerateCode} className='btnReset'>
          Go
        </button>
        <button className='btnReset' onClick={reset}> Reset</button>
        </div>
  </div>
  );
}
