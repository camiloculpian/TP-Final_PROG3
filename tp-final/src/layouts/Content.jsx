//import logo from './logo.svg';
import './Content.css';

function Content({children}) {
  return (
    <section className='content'>
      {children}
    </section>
  );
}

export default Content;