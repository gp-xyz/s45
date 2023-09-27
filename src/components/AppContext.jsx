import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [tribes, setTribes] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [deadList, setDeadList] = useState([]);

  useEffect(() => {
    // Get Tribes
    fetch(`/.netlify/functions/getTribes`)
      .then(response => response.json())
      .then(data => setTribes(data))
      .catch(error => console.error("Error fetching tribes: ", error));
    
    // Get Contestants
    fetch(`/.netlify/functions/getContestants`)
      .then(response => response.json())
      .then(data => {
        setContestants(data);
        
        // Calculate Dead List
        const deadContestants = data.filter(contestant => contestant.votedOff === 1).map(contestant => contestant.name);
        setDeadList(deadContestants);
      })
      .catch(error => console.error("Error fetching contestants: ", error));
  }, []);

  const value = {
    tribes,
    contestants,
    deadList
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
