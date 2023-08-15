import {Routes, BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Contacto from './pages/Contacto/Contacto';
import Institucional from './pages/Institucional/Institucional';
import Home from './pages/Home/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/institucional" element={<Institucional />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
