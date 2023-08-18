import {Routes, BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Institucional from './pages/Institucional/Institucional';
import Carreras from './pages/Carreras/Carreras';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/contacto/contactform" element={<Contacto />} />
          <Route path="/institucional" element={<Institucional />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
