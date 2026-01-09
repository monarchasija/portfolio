import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Hero.css';

const Hero: React.FC = () => {
  const { personal, socialLinks } = portfolioData;

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      FaGithub,
      FaLinkedin,
      FaEnvelope,
    };
    return icons[iconName] || FaEnvelope;
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">{personal.name}</span>
            </h1>
            <h2 className="hero-subtitle">{personal.title}</h2>
            <p className="hero-tagline">{personal.tagline}</p>
            
            <div className="hero-actions">
              <button 
                className="cta-button primary"
                onClick={handleContactClick}
              >
                Get In Touch
                <FaArrowDown className="cta-icon" />
              </button>
              
              <Link 
                to="/projects"
                className="cta-button secondary"
              >
                View Projects
              </Link>
              
              <div className="social-links">
                {socialLinks.slice(0, 3).map((link) => {
                  const IconComponent = getIconComponent(link.icon);
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={link.platform}
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-avatar">
                    {personal.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
              <div className="floating-elements">
                <div className="floating-element element-1">React</div>
                <div className="floating-element element-2">TypeScript</div>
                <div className="floating-element element-3">CSS</div>
                <div className="floating-element element-4">JavaScript</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;