import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; 
import chatbot from "../../assets/chatbot.png";

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  messagesEndRef.current?.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
  inline: 'nearest',
});

useEffect(() => {
   //if (messagesEndRef.current) {
     //messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//}
}, [messages]);



  const toggleChat = () => setIsOpen(!isOpen);

  const cleanInput = (text) => {
    return text
      .toLowerCase()
      .replace(/(.)\1{2,}/g, '$1') 
      .replace(/\s+/g, ' ') 
      .trim();
  };

  const sendMessage = () => {
    const text = cleanInput(inputRef.current.value);
    if (!text) return;

    const userMessage = { name: 'User', message: text };
    setMessages((prev) => [...prev, userMessage]);
    inputRef.current.value = '';


    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
    
      .then((res) => res.json())
      .then((data) => {
        const botMessage = { name: 'Sam', message: data.answer || "I'm not sure I understand. Could you rephrase?" };
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch(() => {
        const errorMessage = { name: 'Sam', message: 'Sorry, something went wrong. Try again later.' };
        setMessages((prev) => [...prev, errorMessage]);
      });
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  

  return (
    <div className="chatbox">
      <div className="chatbox__button__wrapper">
        {isOpen ? (
          <img src={chatbot} alt='chatbot' onClick={toggleChat} style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            cursor: 'pointer',
            width: '80px', 
            height: '70px' 
          }}/>
        ) : (
          <img src={chatbot} alt='chatbot' onClick={toggleChat} style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            cursor: 'pointer',
            width: '80px', 
            height: '70px' 
          }}/>
          )}
      </div>



      <div className={`chatbox__support ${isOpen ? 'chatbox--active' : ''}`}>
        <div className="chatbox__header">
          <h4 className="chatbox__heading--header">CareNow Chat Support</h4>
        </div>

        <div className="chatbox__messages">
          {messages.length === 0 && (
            <p style={{ color: '#666', textAlign: 'center' }}>How can I help you?</p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`messages__item ${
                msg.name === 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Type a message..."
            onKeyUp={handleKeyUp}
            ref={inputRef}
          />
          <button className="send__button chatbox__send--footer" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
