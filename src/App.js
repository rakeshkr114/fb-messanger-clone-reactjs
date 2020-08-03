import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';

import './App.css';
import Message from './Message';

function App() {
  //Setting state to read what's user is typing:
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{username:'Daniel', text:'Hi, How are you?'}]); //variable: array of messages[], function: setMessages(),  [] : intial value before rendering
  const [username, setUsername] = useState('');

  const sendMessage = (event) => {
    //logic to send messages
    event.preventDefault();  // To stop the page from getting refreshed upon hitting the enter button
    setMessages([...messages, {username:username, text: input}]) // append the object with username and input message to the list of messages.
    setInput('');
  } 

  //useEffect = run code on condition in REACT, useState = variable in REACT.
  useEffect(()=>{
    setUsername(prompt("Please enter your name"));
  }, [] );  // [] --> Means no condition, thus the code executes exacly once.

  return (
    <div className="App">
      <h1>FB Messanger Clone</h1>
      <h2>Welcome {username}</h2>

      <form>  {/* Using Form to act on hitting "Enter" button, note type='submit' in button */}

      <FormControl>
        <InputLabel>Enter a message:</InputLabel>
        <Input  value={input} onChange={ event => setInput(event.target.value) } /> 
        <Button disabled={!input} variant="outlined" color="primary" type="submit" onClick={sendMessage}>Send Message</Button> {/** Check material-ui for styling, disabled= if no input*/}
      </FormControl>

      </form>
      
      
      { /* javascript code: */ 
        messages.map(message => (  // map: looping through the messages and "returning" them.
          console.log("user: "+message.username+" "+username),
          console.log("text: "+message.text),
         <Message username={username} message={message}></Message> // Passing current username & the the message object(username, text-message)
         
        ))
      }
    </div>
  );
}

export default App;
