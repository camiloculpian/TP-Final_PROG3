import { useEffect, useState } from 'react';
import './News.css';
import Slider from './Slider';

function News() {
    const [datos, setDatos] = useState(null);
    useEffect(()=>{
        const tema = 'ciencia';
        const apiKey = 'a27692ea8dd84e2aa20404bfe91fdecb';
        const consulta = `https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&pageSize=15&language=es&apiKey=${apiKey}`;

        fetch(consulta)
        .then( resp => {
            resp.json().then(data => {
                setDatos(data.articles);
            } )
        })
        .catch(error => {
            console.log('error -->', error);
        });
    }, []);
    return(
        <div className='news'>
            <section className="seccionHeader">NOVEDADES</section>
            <div className="contentCarousel">
                <Slider news = {datos} />
            </div>
        </div>    
    );

};
export default News