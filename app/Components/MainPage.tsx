"use client";

import React from 'react';
import HeroSection from './hero/page';
import WebDevCard from './webdevcard/page';
import MobileAppSection from './mobileappsection/page';
import DigitalMarketingSection from './digitalmarketingsection/page';
import RevolutionCard from './revolutioncard/page';
import JourneySection from './journeysection/page';

const Divider = () => (
  <div
    style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(58,158,95,.2), transparent)',
      width: '100%',
    }}
  />
);

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
      <ScrollProgressBar />
      <HeroSection />
      <Divider />
      <WebDevCard />
      <Divider />
      <MobileAppSection />
      <Divider />
      <DigitalMarketingSection />
      <Divider />
      <RevolutionCard />
      <Divider />
      <JourneySection />
    </>
  );
}
