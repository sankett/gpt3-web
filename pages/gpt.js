import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import bot from '../assets/bot.svg'
import user from '../assets/user.svg'
import send from '../assets/send.svg'
import generate from '../assets/generate.png'
import openai from '../assets/openai.png'
import huggingface from '../assets/huggingface.png'
import { ConfigProvider, theme, Select  } from 'antd';

const options = [
  {
    label: 'Job Desc | Resume',
    value: '8',
    model: "text-davinci-003",
    preprompt: ``,
    prompt: `Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    label: 'Image',
    value: '13',
    model: "text-davinci-003",
    preprompt: ``,
    prompt: `Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    label: 'Comparison',
    value: '14',
    model: "text-davinci-003",
    preprompt: `List down the  important arguments for and against `,
    prompt: `Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    label: 'Email',
    value: '10',
    model: "text-davinci-003",
    preprompt: ``,
    prompt: `Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    label: 'Blog',
    value: '12',
    model: "text-davinci-003",
    preprompt: ``,
    prompt: `Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },  
  {
    label: 'Small Code Snippet',
    value: '11',
    model: "text-davinci-003",
    preprompt: ``,
    prompt: `Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    value: '6',
    label: 'Essay Outline',
    model: "text-davinci-003",   
    preprompt: `Create an outline for an essay about `,
    prompt: `Nikola Tesla and his contributions to technology:`,
    temperature: 0.3,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    value: '5',
    label: 'Interview questions',
    model: "text-davinci-003",
    preprompt: `Create a list of`,
    prompt: `8 questions for my interview with a science fiction author:`,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  /*{
    label: 'Grammar Correction',
    value: '1',
    model: "text-davinci-003",
    preprompt: `Correct this to standard English:    `,
    prompt: `She no went to the market.`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    label: 'Summarize- 2nd Grade',
    value: '2',
    model: "text-davinci-003",
    preprompt: `Summarize this for a second-grade student:    `,
    prompt: `Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, 
    but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the 
    naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] 
    When viewed from Earth, Jupiter can be bright 
    enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.`,
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    label: 'English to other languages',
    value: '3',
    model: "text-davinci-003",
    preprompt: `Translate this into 1. French, 2. Spanish and 3. Hindi:    `,
    prompt: `What rooms do you have available?`,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stream: false,
  },
  {
    value: '4',
    label: 'TL;DR summarization',
    model: "text-davinci-003",
    preprompt: `Summarize this for a TL;DR:    `,
    prompt: ` atomic nuclei.`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 1,
    stream: false,
  }, */
  
  {
    value: '7',
    label: 'Coding - JavaScript',
    model: "code-davinci-002",   
    preprompt: ` `,
    prompt: `<!-- Create a web page with the title 'Kat Katman attorney at paw' -->
    <!DOCTYPE html>`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
  },
  {
    value: '9',
    label: 'Coding - Python',
    model: "code-davinci-002",   
    preprompt: ` `,
    prompt: `"""
    Ask the user for their name and say "Hello"
    """`,
    temperature: 0,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
  },
  
];

const examples =[
  {
    value: '1',
    label: 'She no went to the market.',
    optionId: '1',
  },
  {
    value: '2',
    label: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.',
    optionId: '2',
  },
  {
    value: '31',
    label: 'What rooms do you have available?',
    optionId: '3',
  },
  {
    value: '32',
    label: 'Which is your favorite holiday destination?',
    optionId: '3',
  },
  {
    value: '4',
    label: 'A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.',
    optionId: '4',
  },
  {
    value: '5',
    label: '8 questions for my interview with a science fiction author:',
    optionId: '5',
  },
  {
    value: '6',
    label: 'Nikola Tesla and his contributions to technology:',
    optionId: '6',
  },
  {
    value: '62',
    label: 'Mother Teressa and her contributions in social service, include where she was born:',
    optionId: '6',
  },
  {
    value: '71',
    label: `/*
    Create a list of animals
    Create a list of cities
    Use the lists to generate stories about what I saw at the zoo in each city
    */`,
    optionId: '7',
  },
  {
    value: '72',
    label: `/*Create component in React.JS for login Form*/`,
    optionId: '7',
  },
  {
    value: '73',
    label: `// Rewrite this as a React component
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    document.body.appendChild(input);
    var button = document.createElement('button');
    button.innerHTML = 'Say Hello';
    document.body.appendChild(button);
    button.onclick = function() {
      var name = input.value;
      var hello = document.createElement('div');
      hello.innerHTML = 'Hello ' + name;
      document.body.appendChild(hello);
    };
    
    // React version:`,
    optionId: '7',
  },
  {
    value: '81',
    label: 'Write a resume for a 12 years experienced Technical Arcchitect with expertise in Microservices, Java, Spring,PostgreSQL and AWS Cloud',
    optionId: '8',
  },
  {
    value: '82',
    label: 'Write a Job Description for a 6 years experienced Full Stack engineer with expertise in React.JS, Python,PostgreSQL and AWS Cloud',
    optionId: '8',
  },
  {
    value: '91',
    label: `def getUserBalance(id):
    """
    Look up the user in the database ‘UserData' and return their current account balance.
    """`,
    optionId: '9',
  },
  {
    value: '92',
    label: `"""
    1. Create a list of first names
    2. Create a list of last names
    3. Combine them randomly into a list of 100 full names
    """`,
    optionId: '9',
  },
  {
    value: '100',
    label: `Write a persuasive email to increase attendance at our upcoming event`,
    optionId: '10',
  },
  {
    value: '101',
    label: `Write an email to client about production deployment rollback due to  performance issue  in  API that is taking more than 5 secs`,
    optionId: '10',
  },
  {
    value: '102',
    label: `Generate 3 business email responses in UK English that are friendly, but still appropriate for the workplace. The email topic is project success.`,
    optionId: '10',
  },
  {
    value: '103',
    label: `Write a promotional email to announce a sale or special offer.`,
    optionId: '10',
  },
  {
    value: '110',
    label: `How do you vertically and horizontally center a div?`,
    optionId: '11',
  },
  {
    value: '111',
    label: `Generate a [C#] code to create a basic game using the Unity engine.`,
    optionId: '11',
  },
  {
    value: '112',
    label: `Write a [Python] script to automate tasks using Selenium library.`,
    optionId: '11',
  },
  {
    value: '113',
    label: `Create a [JavaScript] program to implement a basic blockchain.`,
    optionId: '11',
  },
  {
    value: '120',
    label: `I am planning to develop a super app like JioMart. Please suggest me the best technology stack to develop this app and suggest guideline.`,
    optionId: '12',
  },
  {
    value: '121',
    label: `What is Digital Twin. Explain with example and how to implement it?`,
    optionId: '12',
  },
  {
    value: '130',
    label: `Blue vibrant high quality eagle logo Clipart,HQ,8K.`,
    optionId: '13',
  },
  {
    value: '131',
    label: `Cat dancing in the rain while kibble falls from the sky,HQ,8K.`,
    optionId: '13',
  },
  {
    value: '132',
    label: `Kedarnath temple with big Shiva shadow HQ, 8K.`,
    optionId: '13',
  },
  {
    value: '133',
    label: `A creature from deepest part of  ocean HQ, 8K.`,
    optionId: '13',
  },
  {
    value: '134',
    label: `Mountain view surrounded by rice terrace, vibrant,HQ, 8K.`,
    optionId: '13',
  },
  {
    value: '140',
    label: `Using wind turbines to generate electricity`,
    optionId: '14',
  },
  {
    value: '141',
    label: `Using React.JS for eCommerce applications.`,
    optionId: '14',
  },
]
  
export default function GPT() {

  const [basicData, setBasicData] = useState({ userInput: "Resume of 6 years experience AWS DevOps", output: "", isloading: "0" });
  const [value3, setValue3] = useState('8');
  const [value4, setValue4] = useState('1');
  const [selectedOption, setSelectedOption] = useState({});
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [selectedExample, setSelectedExample] = useState([] );

  const maxRetries = 20;
  const [retry, setRetry] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');

  let loadInterval;

  const onUserChangedText = (event) => {
    setBasicData(currentData => ({ ...currentData, userInput: event.target.value, output: '', isloading: '0' }));
    setSelectedOption(currentData => ({ ...currentData, prompt: event.target.value}));
    
  }

  const isValidModertaion = async () => {
    let response = await fetch('/api/moderation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: basicData.userInput }),
    })
    const resp = await response.json();
    return !resp.flagged;
  }

  const getImage = async () => {
    if (isGenerating && retry === 0) return;

    setIsGenerating(true);

    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });

      setRetry(0);
    }

    const response = await fetch('/api/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input: basicData.userInput }),
    });

    const data = await response.json();

    if (response.status === 503) {
      // Set the estimated_time property in state
      setRetry(data.estimated_time);
      return;
    }

    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      setIsGenerating(false);
      return;
    }

    setFinalPrompt(input);    
    setInput('');
    setImg(data.image);
    setIsGenerating(false);


  }
  const getData = async () => {
    setIsGenerating(true);
    await getImage();
    const apiCall = selectedOption.value === '12' ? '/api/detail' : selectedOption.value === '13' ? '/api/imagegen' : '/api/main';
    let response = await fetch(apiCall, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({ userInput: basicData.userInput }),
      body: JSON.stringify({ userInput: selectedOption.value === '12' || selectedOption.value === '13' ? basicData.userInput : selectedOption }),
    })
    const resp = await response.json();
    return resp.output;
  }

  

  const showTypedText = (text) =>{

    let index = 0
    let textAtIndex =  '';
       
    let interval = setInterval(() => {
        if (index < text.length) {
            textAtIndex += text.charAt(index)
            setBasicData(currentData => ({ ...currentData, output: textAtIndex, isloading: "2" }));
            index++
        } else {
          
            clearInterval(interval)
        }
    }, 5)
  }

  const showText = (arr) => {

    let index = 0
    let textAtIndex = '';
    
    
    let interval = setInterval(() => {
      if (index < arr.length) {
        if(index === 0) {
          textAtIndex += arr[index] 
        }
        else{
          
          if(selectedOption.value === '6' || selectedOption.value === '7' || selectedOption.value === '9' || selectedOption.value === '8' ){
            textAtIndex += arr[index] + '\n\n'
          }
          else{
            textAtIndex += arr[index] + '\n'
          }         
          
        }
        
        setBasicData(currentData => ({ ...currentData, output: textAtIndex, isloading: "2" }));
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
  }

  const loader = () => {
    let textContent = "Hold on, we're waiting for the server to respond. This shouldn't take too long";
    setBasicData(currentData => ({ ...currentData, output:  textContent, isloading: "1" }));
    loadInterval = setInterval(() => {
        
        textContent += '.';        
        if (textContent === "Hold on, we're waiting for the server to respond. This shouldn't take too long......") {
            textContent = "Hold on, we're waiting for the server to respond. This shouldn't take too long";
        }
        setBasicData(currentData => ({ ...currentData, output:  textContent, isloading: "1" }));
       
    }, 300);
  }

  const fadeInStyle = {
    opacity: 1,
    transition: 'opacity 5000ms linear'
  };

  const basic = async () => {
    
    
    /*setBasicData(currentData => ({ ...currentData, output: selectedOption.prompt + 'Wait...', isloading: "1" }));*/
    loader()
    let isValid = await isValidModertaion();
    if (isValid) {
     
      const output = await getData();      
      clearInterval(loadInterval);
      if(selectedOption.value === '10' || selectedOption.value === '8' || selectedOption.value === '6') {
        setBasicData(currentData => ({ ...currentData, output: output.text.replace("\n\n",""), isloading: "2" }));
      }
      else if(selectedOption.value === '13') {
        setBasicData(currentData => ({ ...currentData, output: output, isloading: "2" }));
      }      
      else if(selectedOption.value === '12' || selectedOption.value === '14') {
        
        showTypedText(output.text.replace("\n\n",""))
      }  
      else{
        const arr = output.text.replace("\n\n","").split("\n\n");
        showText(arr)
      }
      //showText(arr)
    }
    else {
      clearInterval(loadInterval);
      setBasicData(currentData => ({ ...currentData, output: selectedOption.prompt + '\n\nSome error happend try again', isloading: "2" }));
    }
  }

  const toggleEdit = () => {
    setImg('')
    setBasicData(currentData => ({ ...currentData, output: '', isloading: '0' }));
  }
 
  const handleChange = (value) => {
    setImg('')
    setValue3(value);   
  };

  const handleExample = (value) => {
    setImg('')
    setValue4(value);
  };

  const moreText = () => {
    setBasicData(currentData => ({ ...currentData, userInput: basicData.userInput + ' ' + basicData.output, isloading: "0" }));
    setSelectedOption(currentData => ({ ...currentData, prompt: basicData.userInput + ' ' + basicData.output}));
    basic()
  }

  
  useEffect(() => {   
    
    const exp = examples.filter(o => o.optionId === value3.toString());
    const selectedObject = options.find(o => o.value === value3.toString());   
    setSelectedExample(exp);
    setValue4(exp[0].value);
    selectedObject.prompt = basicData.userInput;    
    setSelectedOption(selectedObject);
    
  }, [value3]);

  useEffect(() => { 
    const example = examples.find(o => o.value === value4);
    setBasicData(currentData => ({ ...currentData, userInput: example.label, output: '', isloading: '0' }));  
      
    
    setSelectedOption(currentData => ({ ...currentData, prompt: example.label}));
    
  }, [value4]);

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(`Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`);
        setRetryCount(maxRetries);
        return;
      }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await getImage();
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry]);

  return (
   

   
      
      <span id="chat_container">
        <span className='formclass1'>
        <ConfigProvider
        theme={{
        algorithm: darkAlgorithm,
        }}>
       
        <span className='textLabel'>Category:</span><Select value={value3}  style={{ width: 150 }} onChange={handleChange} options={options} />&nbsp;
        <span className='textLabel'>Examples:</span><Select value={value4}  style={{ width: 300 }} onChange={handleExample} options={selectedExample} />
        </ConfigProvider>
        </span>
        <span className='formclass2'>{selectedOption.preprompt}</span>
        <span className={basicData.isloading === "0" ? 'formclass' : 'formclassHide'}>
       
          <span className="profile"><Image src={user} /></span>
          
          <textarea className="inputtext" rows="4" cols="1" placeholder="Ask me (min. length 15)..." value={basicData.userInput}
            onChange={onUserChangedText} />
            
          <span className='mouseCursor'><Image src={send} onClick={basic} /></span>

        </span>
        <span className='wrapper ai'>
        <span className='chat'>
        
        {
            basicData.isloading === "0" ? "" : <span className="profile"><Image src={user}  /></span>
          }

          {
            basicData.isloading === "0" ? "" : <div>
              
            <span className='messagebot2 mouseCursor' onClick={toggleEdit}>{basicData.userInput}</span>
            
            </div>
          }


          </span>

          <span className='chat topMargin'>

            {
              basicData.isloading === "0" ? "" : <span className="profile"><Image src={bot} /></span>
            }
            {
              basicData.isloading === "1"  && selectedOption.value !== '13'? <span className='messagebot3'> {basicData.output}</span>  : ""
            }
            {
              basicData.isloading === "2"  && selectedOption.value !== '13' ? <span className='messagebot3 fade-in-text'> {basicData.output}</span>  : ""
            }
            
            {
              selectedOption.value === '13' ? 
              <div>
                
                  
                <span className='messagebot4'> 
                 { 
                    basicData.isloading === "1"? 
                    <span> OpenAI API<br/><Image src={openai}  /></span> :                     
                    basicData.isloading === "2" ? 
                    <span>Image from openAI API<br/><img src={basicData.output} alt={"image"} />  PI</span>                 
                    : ""

                  }
                </span> 
                <span className='messagebot4'> 
                 { 
                     isGenerating ? 
                     <span> Huggingface API<br/> <Image src={huggingface}  /></span> :                      
                      img != '' ? <span>Image from Huggingface API<br/><img src={img} alt={"image"} /></span>: ""
                     
                     

                  }
                </span>
               
                
              </div>
              : ""
            }
           
            
          </span>
        </span>
      </span>

    
  );
}