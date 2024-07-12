import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/message', {
        message: message,
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GPTJosh</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit">Send</button>
        </form>
        {response && (
          <div className="response">
            <h2>Response:</h2>
            <pre className="response-content">{JSON.stringify(response, null, 1)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;