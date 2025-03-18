import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/FotosGaleria.css';

const images = [
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.doblemente.com/wp-content/uploads/2023/09/blogs_de_turismo_portada.jpg',
    'https://www.doblemente.com/wp-content/uploads/2023/09/blogs_de_turismo-768x431.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg',
    'https://www.blogdelfotografo.com/wp-content/uploads/2018/11/matteo-catanese-424968-unsplash.jpg'
    
    


];

export default function FotosGaleria() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    };
  
    return (
      <div className="fotos-galeria-container">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="fotos-galeria-item">
              <img src={src} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }