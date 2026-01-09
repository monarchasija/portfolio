import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Projects.css';

const Projects: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <div className="projects-page">
      <div className="container">
        <div className="projects-header">
          <Link to="/" className="back-link">
            <FaArrowLeft />
            Back to Home
          </Link>
          <h1 className="page-title">My Projects</h1>
          <p className="page-description">
            A collection of projects I've built using various technologies and frameworks.
            Each project represents a different challenge and learning experience.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="image-placeholder">
                  <span className="project-icon">{project.title[0]}</span>
                </div>
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.liveUrl && (
                    <>
                      {project.liveUrl.startsWith('/') ? (
                        <Link 
                          to={project.liveUrl} 
                          className="project-link primary"
                        >
                          <FaExternalLinkAlt />
                          {project.title.toLowerCase().includes('game') || 
                           project.title.toLowerCase().includes('sudoku') || 
                           project.title.toLowerCase().includes('crossword') || 
                           project.title.toLowerCase().includes('tic-tac-toe') ? 'Play Game' : 
                           project.title.toLowerCase().includes('study') ? 'Open App' : 'Live Demo'}
                        </Link>
                      ) : (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link primary"
                        >
                          <FaExternalLinkAlt />
                          Live Demo
                        </a>
                      )}
                    </>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link secondary"
                    >
                      <FaGithub />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;