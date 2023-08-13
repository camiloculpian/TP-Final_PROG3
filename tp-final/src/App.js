import './App.css';
import React, {useState} from 'react';
import Header from './layouts/Header';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import Modal from './components/Modal';

function App() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
      <Modal title={'Titulo'} state={estadoModal} changeState={cambiarEstadoModal}>
        <p>Contenido del modal</p>
      </Modal>
    </div>
  );
}

export default App;
