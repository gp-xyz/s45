import React, { useState, useEffect } from 'react';
import Picker from './Picker';
import { Link } from 'react-router-dom';
import config from './config';

function NewTribe() {
  const [contestants, setContestants] = useState([]);
  const [tribeName, setTribeName] = useState('');
  const [energy, setEnergy] = useState('');
  const [picked, setPicked] = useState([]);

  useEffect(() => {
    // Fetch the contestants data directly
    const fetchContestants = async () => {
      try {
        const response = await fetch(`${config.serverName3}/.netlify/functions/getContestants`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setContestants(data);
          console.log('contesants:')
          console.log(data);
        }
      } catch (error) {
        console.error("There was a problem fetching contestants:", error);
      }
    };

    fetchContestants(); // Call the fetchContestants function
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const outData = { 'tribename': tribeName, energy: energy, picked: picked };
    fetch(`${config.serverName}/submit`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outData)
    });
    console.log(outData);
  }

  function NTCallback(event) {
    console.log(event);
    setPicked(event);
  }

  function getNames() {
    const names = picked.map(p => p.name);
    const uniqueNames = Array.from(new Set(names));
    if (uniqueNames.length !== 3) {
      return <div className="text-red-600">Please select 3 unique contestants</div>;
    }
    return uniqueNames.join(', ');
  }

  return (
    <div className='bubblebox'>
      <h1 className='sofaheader'>Create New Tribe</h1>

      <div className="lilbubble flex flex-col sm:flex-row sm:items-center">
        <div className="mb-2 sm:mr-4">
          <label htmlFor="tribe-name">Tribe Name:</label>
          <input
            id="tribe-name"
            type="text"
            value={tribeName}
            placeholder="name your tribe"
            className="w-full sm:w-auto sofatext"
            onChange={(event) => setTribeName(event.target.value)}
          />
        </div>
        <div className="mb-2 sm:ml-4">
          <label htmlFor="energy">Energy:</label>
          <input
            id="energy"
            type="text"
            value={energy}
            placeholder="your energy (optional)"
            className="w-full sm:w-auto sofatext"
            onChange={(event) => setEnergy(event.target.value)}
          />
        </div>
      </div>

      <Picker OnPick={NTCallback} contestants={contestants} />
      <div className='lilbubble'>
        <div className='grid grid-rows-3 bg-orange-500 p-1 m-1 bg-opacity-20'>

          <span>Your Tribe Name: {tribeName}</span>
          <span>Your Energy: {energy}</span>
          <span>Picked Contestants: {getNames()} </span>

        </div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md">
          <Link to='/tribes/'>Submit SHEET</Link>
        </button>

      </div>
    </div>
  );
}

export default NewTribe;
