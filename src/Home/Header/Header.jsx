import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import 'aos/dist/aos.css';
import AOS from 'aos';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      AOS.init();
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, []);
  
    return (
     <>
     <h1 className='text-2xl' data-aos="fade-down" data-aos-delay="50" data-aos-duration="1000">Pathway Online Development</h1>
     <p className='font-bold' data-aos="fade-down" data-aos-delay="50" data-aos-duration="1000">Find your favorate music</p>
     <p data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000"
     >{currentTime.toLocaleTimeString()} , {currentTime.toLocaleDateString()}</p>
     <p className='bg-red-500'>
     <Marquee >
  I can be a React component, multiple React components, or just some text.
</Marquee>
     </p>
     
     </>
    );
};

export default Header;