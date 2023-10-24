//import logo from './logo.svg';
import './Content.css';

function Content({children, className}) {
  return (
    <section className={'content '+className}>
      {children}
    </section>
  );
}

export default Content;