import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Contact.css';

const Contact: React.FC = () => {
  const { personal, socialLinks } = portfolioData;

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      FaGithub,
      FaLinkedin,
      FaTwitter,
      FaEnvelope,
    };
    return icons[iconName] || FaEnvelope;
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-content">
          <h2 className="section-title text-center">Get In Touch</h2>
          <p className="contact-description text-center">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
          
          <div className="contact-methods">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h3>Email</h3>
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </div>
            </div>
            
            <div className="social-links-grid">
              {socialLinks.map((link) => {
                const IconComponent = getIconComponent(link.icon);
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-card"
                  >
                    <IconComponent />
                    <span>{link.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;