import { useCallback, useEffect, useRef, useState } from 'react';
import './Slider.css'
import { NavLink } from 'react-router-dom';

function Slider(props){
    const { news } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeAutoplay, setActiveAutoplay] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const autoplayRef = useRef();

    const settings = {
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const goTo = useCallback(
        index => {
          if (!isAnimating) {
            setCurrentIndex(index);
            setIsAnimating(true);
    
            setTimeout(() => {
              setIsAnimating(false);
            }, settings.speed);
          }
        },
        [isAnimating, settings.speed]
    );

    const goNext  = useCallback(() => {
        console.log('const goNext = (): '+currentIndex >= news?.length - 1 ? 0 : currentIndex + 1);
        goTo(currentIndex >= news?.length - 1 ? 0 : currentIndex + 1);
      }, [currentIndex, goTo, news?.length]);

    const goPrev = () => {
        console.log('const goPrev = (): '+currentIndex <= 0 ? news?.length - 1 : currentIndex - 1);
        goTo(currentIndex <= 0 ? news?.length - 1 : currentIndex - 1);
    };
    
    const playTimer = () => {
        setActiveAutoplay(true);
    };

    const pauseTimer = () => {
        setActiveAutoplay(false);
    };

    useEffect(() => {
        if (settings.autoplay && activeAutoplay) {
          clearTimeout(autoplayRef.current);
          autoplayRef.current = setTimeout(() => {
            goNext();
          }, settings.autoplaySpeed);
        }
    },[currentIndex, activeAutoplay, isAnimating, goNext, settings.autoplay, settings.autoplaySpeed]);

    return(
        <div className='slider'>
            <button className='prev' onClick={() => goPrev()} onMouseEnter={pauseTimer} onMouseLeave={playTimer}>-</button>
                {news?.map((item, index) => {
                    return (
                        <nav key={'nav'+index} className={currentIndex === index ? 'navSlide active' : 'navSlide'}>
                            {currentIndex === index && (
                                <NavLink target='_blank' to={item.url}>
                                    <div className='newsDiv' style={{ backgroundImage: `url(${item.urlToImage})` }}>
                                        <div className='textBackground'>
                                            <h2>{item.title}</h2>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            )}
                        </nav>
                    );
                })}
            <button className='next' onClick={() => goNext()} onMouseEnter={pauseTimer} onMouseLeave={playTimer}>-</button>
        </div>
    );
}

export default Slider;