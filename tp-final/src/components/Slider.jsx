import { useEffect, useState } from 'react';
import './Slider.css'
import { NavLink } from 'react-router-dom';

function Slider(props){
    const { news } = props;
    const [actualNews, setActualNews] = useState(0);
    // const newsLength = news?.length;
    
    const nextNews = () =>{
        setActualNews(actualNews ===  news?.length - 1 ? 0 : actualNews + 1);
        clearTimeout (idTimeOut);
        console.log('actualNewa: '+actualNews);
    };
    const previousNews = () =>{
        setActualNews(actualNews ===  news?.length - 1 ? 0 : actualNews - 1)
        clearTimeout (idTimeOut);
        console.log('actualNewa: '+actualNews);
    };
    
    const delay = 10000;
     

    const idTimeOut = setTimeout(
          () =>
            setActualNews((prevIndex) =>
                prevIndex ===   news?.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );

    // setTimeout(nextNews,10000);
    return(
        <div className='slider'>
            <button className='prev' onClick={previousNews}>-</button>
                {news?.map((item, index) => {
                    return (
                        <nav key={'nav'+index} className={actualNews === index ? 'navSlide active' : 'navSlide'}>
                            {actualNews === index && (
                                <NavLink target='_blank' to={item.url}>
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