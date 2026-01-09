import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import './About.css';

const About: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder">
              <div className="placeholder-avatar">
                {personal.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
          
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-bio">{personal.bio}</p>
            
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{personal.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{personal.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;