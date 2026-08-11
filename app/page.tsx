
"use client";

import React from 'react';
import Hero from './components/Hero';
import WebDevCard from './components/WebDevCard';
import MobileAppSection from './components/MobileAppSection';
import DigitalMarketingSection from './components/DigitalMarketingSection';
import RevolutionCard from './components/RevolutionCard';
import JourneySection from './components/JourneySection';
import BoldVisionSection from './components/BoldVisionSection';
import Footer from './components/Footer';
import Navbar from './components/navbar/Navbar';



const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #22c55e, #4ade80)',
        width: `${scrollProgress}%`,
        zIndex: 50,
        transition: 'width 0.1s ease-out',
      }}
    />
  );
};



export default function MainPage() {
  

 

  return (
    <>
    
      <Navbar />
     
      <ScrollProgressBar />
      <Hero />
      <BoldVisionSection />
      <WebDevCard />
      <section id="mobile-app-section">
        <MobileAppSection />
      </section>
      <section id="digital-marketing-section">
        <DigitalMarketingSection />
      </section>
      <RevolutionCard />
      <JourneySection />
      <Footer />
    </>
  );
}