import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase  from 'firebase';
import FlipMove from 'react-flip-move';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

function App() {
  //Setting state to read what's user is typing:
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); //variable: array of messages[], function: setMessages(),  [] : intial value before rendering e.g, [{username:'Daniel', message:'Hi, How are you?'}]
  const [username, setUsername] = useState('');

  const sendMessage = (event) => {
    //logic to send messages
    event.preventDefault();  // To stop the page from getting refreshed upon hitting the enter button

    db.collection('messages').add({ // add to db
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Storing server's location time, as user can be from diff.timezones, we can't use user's time.
    })

    //setMessages([...messages, {username: username, message: input}]) // append the object with username and input message to the list of messages.

    setInput(''); // clearing the textbox
  } 

  //useEffect = run code on condition in REACT, useState = variable in REACT.
  useEffect(()=> {
    // run once when the app component loads!

    //onSnapshot() -> realtime listener of the collection! On addition of a new row/object, it'll be shown on the page without refresh 
    db.collection('messages')
    .orderBy('timestamp', 'desc') // show objects in timestamp order
    .onSnapshot(snapshot =>{ //sanpshot -> All the data of the table
      //
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}) )) // docs -> Array of objects, doc -> one objectfrom the list
    })
  }, [] )

  useEffect(()=>{
    setUsername(prompt("Please enter your name"));
  }, [] );  // [] --> Means no condition, thus the code executes exacly once.

  return (
    <div className="App">
      <img alt="Logo" src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"></img>
      <h1>FB Messanger Clone</h1>
      <h2>Welcome {username}!</h2>

      <form className="app__form">  {/* Using Form to act on hitting "Enter" button, note type='submit' in button */}
        
        <FormControl className="app__formControl">
          
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={ event => setInput(event.target.value) } /> 
          {/** Check material-ui for styling, disabled= if no input*/}
          <IconButton className='app__iconButton' disabled={!input} variant="outlined" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>

      </form>
      
      {/* Use keys (Note the key={id} in <Message> tag) in Flipmove while injecting new data, to avoifrendering the whole list! and just use the effect on the new data card */ }
      <FlipMove>
        { /* javascript code: */ 
          messages.map(( {id, message} ) => (  // map: looping through the messages and "returning" them.
            console.log("user1: "+message.username+" "+username) ||
            console.log("text1: "+message.message) ||
          <Message key={id} username={username} message={message} /> // Passing current username & the the message object(username, text-message)
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
