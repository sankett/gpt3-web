import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [codeInput, setCodeInput] = useState('');

  const [apiOutput, setApiOutput] = useState('');
  const [imageOutput, setImageOutput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageGenerating, setImageIsGenerating] = useState(false);
  const [isCodeGenerating, setCodeIsGenerating] = useState(false);

  const [codeValue, setCodeValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [imageValue, setImageValue] = useState('');

  const handleChange = (event) => {

    setCodeValue(event.target.value);
    setCodeInput(event.target.value)
    setCodeOutput('');
    
    
  };

  const handleContentChange = (event) => {

    setContentValue(event.target.value);
    setUserInput(event.target.value)
    setApiOutput('');
  };

  const handleImageChange = (event) => {

    setImageValue(event.target.value);
    setImageInput(event.target.value)
    setImageOutput('');
  };

  const clearImage = () => {
    setImageInput('')
    setImageOutput('')
    setImageValue("");
  }

  const callGenerateCode = async () => {
    setCodeIsGenerating(true)
    const response = await fetch('/api/codegen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codeInput }),
    })
    const data = await response.json();
    const dt = data.data.text.split("\n");
    console.log("===data==", dt)
    setCodeIsGenerating(false);
    setCodeOutput(`${data.data.text}`);
  }
  const callGenerateImage = async () => {
    setImageIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/imagegen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageInput }),
    })
    const data = await response.json();
    const { imageUrl } = data;
    setImageOutput(imageUrl)
    console.log("OpenAI replied...", imageUrl)
    setImageIsGenerating(false);
  }
  const clearContent = () => {
    setContentValue('');
    setUserInput('')
    setApiOutput('')
  }

  const clearCode = () => {
    setCodeValue('');
    setCodeInput('')
    setCodeOutput('')
  }

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")


    const response = await fetch('/api/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
    setIsGenerating(false);
    setApiOutput(`${output.text}`);


  }

  const onCodeChangedText = (event) => {

    setCodeOutput('');
    setCodeInput(event.target.value);
  };

  const onImageChangedText = (event) => {
    setImageOutput('')
    setImageInput(event.target.value);
  };
  const onUserChangedText = (event) => {

    setApiOutput('');
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Sanket's Openai Demo</h1>
          </div>
          <div className="header-subtitle">
            <h2>Oops..It is getting upgraded. Please come back after 24 hours.</h2>
          </div>
        </div>

        <div className="prompt-container promptTopMargin20">
          <div className="labeltitle">
            
            <select value={codeValue} onChange={handleChange} className="drop-box">
              <option value=''>Select Code Example</option>
              <option value='# JavaScript language # create array of users and assign it to variable users
              #create function getUserById with parameter id and return user
              #create function to sort users by age'>Code Sample 1(Create array)</option>
              <option value='# JavaScript language # create arrow function to sort users by name'>Code Sample 2(Create Sort Function)</option>

              <option value="<!-- Create a web page with the title 'Kat Katman attorney at paw' -->
<!DOCTYPE html>">Code Sample 3(HTML)</option>

              <option value="# JavaScript language # React.JS code to generate registration form">Code Sample 4 (React Component Code)</option>
              <option value="# TypeScript language # observable from an array of Indian States">Code Sample 5 (TypeScript Code)</option>
            </select>

          </div>
          <textarea
            className="prompt-box"
            placeholder="Enter each command with # prefix to generate code..."
            value={codeInput}
            onChange={onCodeChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isCodeGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateCode}
            >
              <div className="generate">
                {isCodeGenerating ? <span className="loader"></span> : <p>Generate Code</p>}
              </div>
            </a>

            <a
              className={isCodeGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={clearCode}
            >
              <div className="generate">
                {isCodeGenerating ? <span className="loader"></span> : <p>Reset</p>}
              </div>
            </a>
          </div>

          {codeOutput && (
            <div className="output">
              
              <div className="output-contentCode">

                <p>{codeOutput}</p>
              </div>
            </div>
          )}
        </div>

        <div className="prompt-container promptTopMargin80">
          <div className="labeltitle">
            
            <select value={imageValue} onChange={handleImageChange} className="drop-box">
              <option value=''>Select Image Example</option>
              <option value='Illustration of jupiter clouds by dan mumford, blue planets, yellow tinted colors, uhd'>Illustration of jupiter clouds by dan mumford, blue planets, yellow tinted colors, uhd</option>
              <option value='Car sinking in water'>Car sinking in water</option>
              <option value='Burger with Double Cheese'>Burger with Double Cheese</option>
              <option value='A map of Poland with voting districts'>A map of Poland with voting districts</option>              
              <option value='An inaccurate scientific diagram of a t-rex skeleton'>An inaccurate scientific diagram of a t-rex skeleton</option>
              
            </select>
          </div>
          <textarea
            className="prompt-box"
            placeholder="Enter text to generate image.."
            value={imageInput}
            onChange={onImageChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isImageGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateImage}
            >
              <div className="generate">
                {isImageGenerating ? <span className="loader"></span> : <p>Generate Image</p>}
              </div>
            </a>
            <a className={isImageGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={clearImage}
            >
              <div className="generate">
                {isImageGenerating ? <span className="loader"></span> : <p>Reset</p>}
              </div></a>
          </div>

          {
            imageOutput && (
              <div className="output">
                <img src={imageOutput} />
              </div>
            )
          }
        </div>

        <div className="prompt-container promptTopMargin80">
          <div className="labeltitle">
            
            <select value={contentValue} onChange={handleContentChange} className="drop-box">
              <option value=''>Select Content Example</option>
              <option value='Step by Step learn Blockchain'>Step by Step learn Blockchain</option>
              <option value='What is super app ?'>What is super app ?</option>
              <option value='Compare React.JS, Angular and Vue.JS ?'>Compare React.JS, Angular and Vue.JS ?</option>
              <option value='Recipe to prepare Burger'>Recipe to prepare Burger</option>
            </select>
          </div>
          <textarea
            className="prompt-box"
            placeholder="Enter text to generate content..."
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate Content</p>}
              </div>
            </a>

            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={clearContent}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Reset</p>}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              
              <div className="output-content">

                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
}
