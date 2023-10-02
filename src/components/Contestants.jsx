import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContext'; // Import useAppContext

function Contestants() {
  const [stats, setStats] = useState([]);
  const { contestants, tribes } = useAppContext(); // Destructure contestants and tribes from context

  useEffect(() => {
    // Iterate over each contestant and find and count the tribes where they are in the survivors array
    const calculatedStats = contestants.map(contestant => {
      // filter tribes where the current contestant is a survivor
      const relatedTribes = tribes.filter(tribe => tribe.survivors.includes(contestant.name));
      
      return {
        ...contestant,
        count: relatedTribes.length, // Number of tribes that picked the contestant
        tribes: relatedTribes.map(tribe => tribe.name) // Names of the tribes that picked the contestant
      };
    });
    
    setStats(calculatedStats);
  }, [contestants, tribes]); // Recalculate when contestants or tribes change

  return (
    <div className='bubblebox'>
      <h2 className=''>Contestants:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {stats.map((person, index) => (
          <div key={index} className='lilbubble'>
            <div className="image-container">
              <img className="w-full h-auto" src={'/images/' + person.name + '.jpg'} alt={person.name} />
              {person.votedOff === 1 && <div className="overlay"></div>}
            </div>
            <div className='grid grid-cols-1'>
              <div className='font-bold'>{person.name}: {person.count} selection{person.count > 1 && <span>s</span>}</div>
              <div>
                {person.tribes && person.tribes.length > 0 ? (
                  person.tribes.map((item) => <div key={item} className='text-xs'>{item}</div>)
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contestants;
