import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
    </>
  );
};

export default Home;