import { useState } from 'react';
import axios from 'axios';

const SendEmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/send-email', {
        email,
        subject,
        message
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error(error);
      setResponse('Failed to send email.');
    }
  };

  return (
    <div>
      <h2>Send an Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Subject:</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          ></textarea>
        </div>
        <button type="submit">Send Email</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default SendEmailForm;
