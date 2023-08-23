import './News.css';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

function News() {
    return(
        <div className='news'>
            <section className="seccionHeader">NOVEDADES</section>
            <div className="contentCarousel">
                <Carousel>
                    <Carousel.Item interval={1500}>
                        <img
                            className="d-block w-100"
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                            alt="Img One"
                        />
                        <Carousel.Caption>
                            <h3>Label for first slide</h3>
                            <p>Sample Text for Image One</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                            alt="Img Two"
                        />
                        <Carousel.Caption>
                            <h3>Label for second slide</h3>
                            <p>Sample Text for Image Two</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                            alt="Img Two"
                        />
                        <Carousel.Caption>
                            <h3>Label for third slide</h3>
                            <p>Sample Text for Image Tree</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>    
    );

};
export default News