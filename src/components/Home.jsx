
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   fetch('https://probst-disco.pythonanywhere.com/messages')
  //     .then(response => response.json())
  //     .then(data => setMessages(data));
  // }, []);

  return (
    <div className='bubblebox'>
      
      {/* <ul>
        {messages.map(message => (
          <li key={message.id}>
            <div className='bubblebox'>({message.date}): {message.message}  </div>
          </li>
        ))}
      </ul> */}
      
      <div className='sofaheader lilbubble'> Registration OPEN for September 2023! </div>


      <div className='sofaheader'> Welcome to Tribal Couch aka Sofa Survivor 2023. </div>



      <div className='lilbubble pl-6 ml-6'>
      <div className='pb-5'>Who will win Survivor 45? (first episode debuts <span className='text-slate-600'>September 27</span>)</div>
      <div className='font-semibold'>Instructions</div>
        <div className='pl-2 pb-2'>*Choose a name, a energy (for fun), and your 3 favorite contestants on the TV show. This is your Tribe.</div>
        <div className='pl-2 pb-2'>*Entry fee is $100. All entry fees will be awarded to the winning tribe. If multiple tribes pick the winner, the prize pool is divided proportionally. Payment must be made outside of this website somehow.</div>
        <div className='pl-2 pb-2'>*The deadline to submit entries is when episode #2 of the show is aired, the evening of <span className='text-slate-600'>October 3</span>.</div>
        <div className='pl-2 pb-2'>*If you need to modify your entry before the deadline, just make a new tribe. I will manually delete 'unwanted' tribes based on which entries are paid for.</div>
      </div>

      <div className='pl-3 w-full'><Link to='/new' className='bg-blue-500 p-4 w-full drop-shadow-lg hover:bg-blue-600' >ENTER A Tribe &rarr;&rarr;</Link>
      </div>
    </div>
  );
}

export default Home