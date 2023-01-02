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
          <div className={props.isAi ? 'messagebot' : 'messageuser'} id={props.uniqueId}> 
          

          {
            props.isImage && props.value.toString().indexOf("http") > -1 ? (<img src={props.value} alt={props.isAi ? 'bot' : 'user'}  />) : props.value
          }
          
          </div>
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
  const [category, setCategory] = useState(1);

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

  const addData = (isAi, textValue, uniqueId, isImage) => {
    temp = {
      key: uniqueId,
      isAi: isAi,
      textValue: textValue,
      uniqueId:uniqueId,
      isImage: isImage
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
      const isImageData = category === 4 ? true : false;
      addData(true,textContent,uniqueId,isImageData);
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
    addData(false,"Generate code:" + userInput,uniqueId1,false);

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
    addData(false,userInput,uniqueId1,false);
   
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
        let defaultApi =  category === 1 ? '/api/main' : category === 2 ? '/api/detail' : category === 3 ? '/api/codegen' : '/api/imagegen';

        response = await fetch(defaultApi, {
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
        if(category === 4){
          updateData(output,uniqueId2)
        }
        else{
          typeText1(output.text.replace("\n\n",""),uniqueId2)
          
        }
        
      }
      
      

    }, 50) 
    
   

  }

  const onUserChangedText = (event) => {    
    
    setUserInput(event.target.value);
  }

  const onRadioChanged = (event) => {    
    
    let textBoxValue ='';
    const inputdata = parseInt(event.target.value)
    if(inputdata === 3){
      textBoxValue= "# JavaScript language\n# create array of users and assign it to variable users\n# create function getUserById with parameter id and return user\n# create function to sort users by age"
    }
    else if(inputdata === 4) {
      textBoxValue = 'Blue vibrant high quality eagle logo Clipart'
    }
    else if(inputdata === 2) {
      textBoxValue = 'Step by Step learn Blockchain'
    }
    else{
      textBoxValue = 'Resume of 6 years experience AWS DevOps'
    }
    //const textBoxValue = inputdata === 3 ? `# JavaScript language\n# create array of users and assign it to variable users\n# create function getUserById with parameter id and return user\n# create function to sort users by age` : "";

    setCategory(inputdata)
    setTextValue('')
    setIsAi(false)
    setUserInput(textBoxValue);
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
      <div className='formclass1'>
     
       <span className='formclass1span1'>
       <input type="radio" value={1} name="category" onChange={onRadioChanged} checked= {category === 1}/> Summary
       </span><span className='formclass1span1'>
        <input type="radio" value={2} name="category" onChange={onRadioChanged} checked= {category === 2}/> Detail
        </span><span className='formclass1span1'>
        <input type="radio" value={3} name="category" onChange={onRadioChanged} checked= {category === 3}/> Code
        </span><span className='formclass1span1'>
        <input type="radio" value={4} name="category" onChange={onRadioChanged} checked= {category === 4}/> Image
       </span>
      </div>
    <div className='formclass'>
    
      <textarea
            className="inputtext" rows="4" cols="1" 
            placeholder="Ask me (min. length 15)..."
            value={userInput}
            onChange={onUserChangedText}
          />
        <button type="button" onClick={callGenerateBlog} 
        className={userInput.length > 15 ? 'btnReset' : 'btnReset btndisabled'}
        >
          Go 
        </button>

        <button className='btnReset' onClick={reset}> Reset</button>
        </div>
      
    <div id="chat_container">
      <div className='scrollContainer'>
      {
        listChatStripe.map(data => {
        
          return <ChartStripe key={data.uniqueId} value={data.textValue} isAi={data.isAi} uniqueId={data.uniqueId} isImage={data.isImage} />
        })
      }
       <div ref={bottomRef} />
     </div>
    
    </div>

    
  </div>
  );
}
