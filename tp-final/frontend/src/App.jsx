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
import ListCourseInscription from './pages/Bedelia/ListCourseInscription';
import ListCareerInscription from './pages/Bedelia/ListCareerInscription';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserProvider } from './components/UserContext';
import SearchCourse from './pages/Bedelia/SearchCourse';
import StatiscticsCareers from './pages/Bedelia/StatisticsCareers';
import StatiscticsCourses from './pages/Bedelia/StatisticsCourses';
import StatiscticsStudents from './pages/Bedelia/StatisticsStudents';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/bedelia" element={<Bedelia />}>
            <Route path='students'>
              <Route path='register' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<RegisterStudent />}
                </ProtectedRoute>
              } />
              <Route path='edit' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<EditStudent />}
                </ProtectedRoute>
              } />
              <Route path='delete' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<DeleteStudent />}
                </ProtectedRoute>
              } />
              <Route path='list' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<ListStudents />}
                </ProtectedRoute>
              } />
            </Route>
            <Route path='courses'>
              <Route path='register' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<RegisterCourse />}
                </ProtectedRoute>
              } />
              <Route path='list' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<ListCourse />}
                </ProtectedRoute>
              } />
              <Route path='search' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<SearchCourse />}
                </ProtectedRoute>
              } />
            </Route>
            <Route path='careers'>
              <Route path='register' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<RegisterCareer />}
                </ProtectedRoute>
              } />
              <Route path='list' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<ListCareers />}
                </ProtectedRoute>
              } />
            </Route>
            <Route path='enrollments'>
              <Route path='course/list' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<ListCourseInscription />}
                </ProtectedRoute>
              } />
              <Route path='career/list' element={
                <ProtectedRoute mustBeBedel={true}>
                  {<ListCareerInscription />}
                </ProtectedRoute>
              } />
            </Route>
            < Route path='statistics'>
              <Route path='careers' element={
                <ProtectedRoute mustBeDecano={true}>
                  {<StatiscticsCareers />}
                </ProtectedRoute>
              } />
              <Route path='courses' element={
                <ProtectedRoute mustBeDecano={true}>
                  {<StatiscticsCourses />}
                </ProtectedRoute>
              } />
              <Route path='students' element={
                <ProtectedRoute mustBeDecano={true}>
                  {<StatiscticsStudents />}
                </ProtectedRoute>
              } />
            </Route>
          </ Route>
        </Routes>
        <Footer/>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
