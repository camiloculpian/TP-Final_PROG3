import { Routes, BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Institucional from './pages/Institucional/Institucional';
import Carreras from './pages/Carreras/Carreras';
import Bedelia from './pages/Bedelia/Bedelia';
import RegisterStudent from './pages/Bedelia/RegisterStudent';
import RegisterCourse from './pages/Bedelia/RegisterCourse';
import EditStudent from './pages/Bedelia/EditStudent';
import ListStudents from './pages/Bedelia/ListStudents';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import DeleteStudent from './pages/Bedelia/DeleteStudent';
import RegisterCareer from './pages/Bedelia/RegisterCareer';
import ListCareers from './pages/Bedelia/ListCareers';
import ListCourse from './pages/Bedelia/ListCourse';
import RegisterCourseInscription from './pages/Bedelia/RegisterCourseInscription';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/bedelia" element={<Bedelia />}>
            <Route path='students'>
              <Route path='register' element={<RegisterStudent />} />
              <Route path='edit' element={<EditStudent />} />
              <Route path='delete' element={<DeleteStudent />} />
              <Route path='list' element={<ListStudents />} />
            </Route>
            <Route path='courses'>
              <Route path='register' element={<RegisterCourse />} />
              <Route path='list' element={<ListCourse />} />
            </Route>
            <Route path='careers'>
              <Route path='register' element={<RegisterCareer />} />
              <Route path='list' element={<ListCareers />} />
            </Route>
            <Route path='enrollments'>
            <Route path='course/enroll' element={<RegisterCourseInscription />} />
            </Route>
          </ Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
