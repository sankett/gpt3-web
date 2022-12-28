import Head from 'next/head';
import Image from 'next/image';
import bot from '../assets/bot.svg'
import user from '../assets/user.svg'
import header from '../assets/header.png'
import { useState, useEffect,useRef  } from 'react';


function ChartStripe(props) {
  
  return (
    <div className={props.isAi ? 'wrapper ai' : 'wrapper'} key={props.uniqueId}>
       <div className="chat">
          <div className="profile">
            <Image src={props.isAi ? bot : user} alt={props.isAi ? 'bot' : 'user'}  />
          </div>
          <div className={props.isAi ? 'messagebot' : 'messageuser'} id={props.uniqueId}> {props.value}</div>
      </div>
    </div>
  )
}
export default function Home() {
  const [textContent, setTextContent] = useState('');
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState("");

  const [isAi, setIsAi] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  const [stateTextAtIndex, setstateTextAtIndex] = useState('');

  const bottomRef = useRef(null);

  const [listChatStripe, setListChatStripe] = useState([]);

  let loadInterval;
  let temp;
  

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

  const typeText1 = (text,uniqueId) =>{

    let index = 0
    let textAtIndex =  '';
       
    let interval = setInterval(() => {
        if (index < text.length) {
            textAtIndex += text.charAt(index)
            updateData(textAtIndex,uniqueId)
            setstateTextAtIndex(textAtIndex)
            index++
        } else {
          //updateData("==================================",uniqueId)
            clearInterval(interval)
        }
    }, 15)
  }

  const addData = (isAi, textValue, uniqueId) => {
    temp = {
      key: uniqueId,
      isAi: isAi,
      textValue: textValue,
      uniqueId:uniqueId
    }
    setListChatStripe(oldArray => [...oldArray, temp]);
  }

  const updateData =(textValue, uniqueId) => {
    setListChatStripe(current =>
      current.map(obj => {
        if (obj.uniqueId === uniqueId) {
          return {...obj, textValue: textValue};
        }

        return obj;
      }),
    );
  }

 const loader = (uniqueId) => {
      let textContent = "Hold on, we're waiting for the server to respond. This shouldn't take too long";
      addData(true,textContent,uniqueId);
      loadInterval = setInterval(() => {
          // Update the text content of the loading indicator
          textContent += '.';

          // If the loading indicator has reached three dots, reset it
          if (textContent === "Hold on, we're waiting for the server to respond. This shouldn't take too long....") {
              textContent = "Hold on, we're waiting for the server to respond. This shouldn't take too long";
          }
          updateData(textContent,uniqueId)

      }, 300);
  }

  const callGenerateCode = async () => {
    let uniqueId1 = generateUniqueId()
    addData(false,"Generate code:" + userInput,uniqueId1);

    setTimeout(async () => {
      let uniqueId2 = generateUniqueId()
      

      loader(uniqueId2)
      
       response = await fetch('/api/codegen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      })
  
      clearInterval(loadInterval);
      const data = await response.json();     
      updateData(data.data.text,uniqueId2)
      //typeText1(data.data.text,uniqueId2)

    }, 50) 

    /*const response = await fetch('/api/codegen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codeInput }),
    })
    const data = await response.json();
    const dt = data.data.text.split("\n");
   
    setCodeOutput(`${data.data.text}`);*/
  }

  const callGenerateBlog = async () => {
    
    let uniqueId1 = generateUniqueId()
    addData(false,userInput,uniqueId1);
   
    setTimeout(async () => {
      let uniqueId2 = generateUniqueId()
      

      loader(uniqueId2)
      let response = await fetch('/api/moderation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      })
      const resp = await response.json(); 
      console.log("==resp",resp) ;
      if(resp.flagged){
        clearInterval(loadInterval);
        typeText1("Invalid prompt. Violates Content Policy",uniqueId2)
      }else{
        response = await fetch('/api/main', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput }),
        });
    
        clearInterval(loadInterval);
        const data = await response.json();
        const { output, first } = data;
        //typeText1(first.text.replace("\n\n",""),uniqueId2)
        
        typeText1(output.text.replace("\n\n",""),uniqueId2)
      }
      
      

    }, 50) 
    
   

  }

  const onUserChangedText = (event) => {    
    
    setUserInput(event.target.value);
  }

  useEffect(() => {
    
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'      
    });
  }, [listChatStripe]);

  const reset = async () => {
    setTextValue('')
    setIsAi(false)
    setUserInput('');
setListChatStripe([])
   
  }
  return (
    <div id="app">
      <div className='divHeader'>
      Sanket's GPTChat showcase <span className='subspan'><sub>Powered by Next.JS</sub></span>
        </div>
    <div id="chat_container">
      <div className='scrollContainer'>
      {
        listChatStripe.map(data => {
        
          return <ChartStripe key={data.uniqueId} value={data.textValue} isAi={data.isAi} uniqueId={data.uniqueId} />
        })
      }
       <div ref={bottomRef} />
     </div>
    
    </div>

    <div className='formclass1'>
      <span className='formclass1span1'>Examples:</span>
      <span className='formclass1span2'> Top 5 headline for Food blog</span> 
       
      </div>
    <div className='formclass'>
    
      <input type={text} name="prompt" rows="1" cols="1" placeholder="Ask me (minimum length 15)..."
      value={userInput} onChange={onUserChangedText} className="inputtext"
      />
        <button type="button" onClick={callGenerateBlog} 
        className={userInput.length > 15 ? 'btnReset' : 'btnReset btndisabled'}
        >
          Go 
        </button>

        <button className='btnReset' onClick={reset}> Reset</button>
        </div>
  </div>
  );
}
