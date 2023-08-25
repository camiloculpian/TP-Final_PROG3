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
        autoplaySpeed: 7000
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

    const dots = () => {
        const totalItems = Array.apply(null, Array(news.length));
        const dotsButtons = totalItems.map((item, index) => {
          return (
            <button
              className={currentIndex === index  ? 'newsDotsActive' : 'newsDots'}
              key={index.toString()}
              onMouseEnter={pauseTimer}
              onMouseLeave={playTimer}
              onClick={() => goTo(index)}
            >
            </button>
          );
        });
        return <div className="dots">{dotsButtons}</div>;
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
            <button className='prevBtn' onClick={() => goPrev()} onMouseEnter={pauseTimer} onMouseLeave={playTimer} />
                {news?.map((item, index) => {
                    return (
                        <nav key={'nav'+index} className={currentIndex === index ? 'navSlide active' : 'navSlide'}>
                            {currentIndex === index && (
                                <>
                                    <div className='newsDiv' style={{ backgroundImage: `url(${item.urlToImage})` }}>
                                        <div className='textBackground'>
                                            <NavLink target='_blank' to={item.url}>
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </NavLink>
                                            {dots()}
                                        </div>
                                    </div>
                                </>
                            )}
                        </nav>
                    );
                })}
            <button className='nextBtn' onClick={() => goNext()} onMouseEnter={pauseTimer} onMouseLeave={playTimer} />
        </div>
    );
}

export default Slider;