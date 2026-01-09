import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showName, setShowName] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const sectionIds = portfolioData.navigation.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    if (!isHomePage) {
      setShowName(true);
      return;
    }

    const handleScroll = () => {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        const heroTitleRect = heroTitle.getBoundingClientRect();
        const headerHeight = 80; // Header height
        // Show header name when hero title is above the header
        setShowName(heroTitleRect.bottom < headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && isHomePage) {
      // Internal navigation on home page
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '#projects' && !isHomePage) {
      // Navigate to projects page
      window.location.href = '/projects';
      return;
    } else if (href.startsWith('#') && !isHomePage) {
      // Navigate to home page with hash
      window.location.href = '/' + href;
      return;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${showName ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className={`logo ${showName ? 'logo-visible' : 'logo-hidden'}`}>
            <h2>{portfolioData.personal.name}</h2>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {portfolioData.navigation.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="nav-item">
                <Link 
                  to="/projects" 
                  className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;