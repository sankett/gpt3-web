import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [imageOutput, setImageOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageGenerating, setImageIsGenerating] = useState(false);

  const clearImage =  () => {
    setImageInput('')
    setImageOutput('')
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
const clearContent =  () => {
  setUserInput('')
  setApiOutput('')
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
            <h2>Write a sentence on topic for content generation </h2>
          </div>
        </div>
        
        <div className="prompt-container promptTopMargin20">
        <div className="labeltitle">
            Example: Twin persian cat playing in garden
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
            Example: Step by Step learn Blockchain
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
              <div className="output-header-container">
                <div className="output-header">
                  <h3>{userInput}</h3>
                </div>
              </div>
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
