import {Routes, BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Institucional from './pages/Institucional/Institucional';
import Carreras from './pages/Carreras/Carreras';
import Bedelia from './pages/Bedelia/Bedelia';
import RegisterStudent from './pages/Bedelia/RegisterStudent';
import EditStudent from './pages/Bedelia/EditStudent';
import Footer from './layouts/Footer';
import Header from './layouts/Header';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/bedelia" element={<Bedelia />}>
            <Route path='students'>
              <Route path='register' element={<RegisterStudent />} />
              <Route path='edit' element={<EditStudent />} />
            </Route>
            <Route path='subjects'>
            </Route>
            <Route path='careers'>
            </Route>
            <Route path='enrollments'>
            </Route>
          </ Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
