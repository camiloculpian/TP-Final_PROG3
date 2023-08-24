import { useState } from 'react';
import './Slider.css'
import { NavLink } from 'react-router-dom';

function Slider(props){
    const { news } = props;
    const [actualNews, setActualNews] = useState(0);
    const actualNewsLength = news?.length;
    console.log('actualNewa: '+actualNews);
    console.log('length: '+actualNewsLength);
    
    const nextNews = () =>{
        setActualNews(actualNews ===  actualNewsLength - 1 ? 0 : actualNews + 1)
    };
    const previousNews = () =>{
        setActualNews(actualNews ===  actualNewsLength - 1 ? 0 : actualNews - 1)
    };
    return(
        <div className='slider'>
            <button className='prev' onClick={previousNews}>-</button>
                {news?.map((item, index) => {
                    return (
                        <nav key={'nav'+index} className={actualNews === index ? 'navSlide active' : 'navSlide'}>
                            {actualNews === index && (
                                <NavLink to={item.url}>
                                    <div className='newsDiv' style={{ backgroundImage: `url(${item.urlToImage})` }}>
                                        <div className='textBackground'>
                                            <h2>{item.title}</h2>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                {/* <img  key={index} src={item.urlToImage} alt={'image'+index}/> */}
                                </NavLink>
                            )}
                        </nav>
                    );
                })}
            <button className='next' onClick={nextNews}>-</button>
        </div>
    );
}

export default Slider;