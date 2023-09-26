import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Tribes from './Tribes';
import Stats from './Stats';
import Contestants from './Contestants';
import NewTribe from './NewTribe';

function Router() {
 
  return (
    <BrowserRouter>
      <div>
        <Nav/>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tribes" element={<Tribes />} />
        <Route exact path="/contestants" element={<Contestants />} />
        <Route exact path="/new" element={<NewTribe />} />
        </Routes> 

      </div>
    </BrowserRouter>
  );
}

export default Router;
