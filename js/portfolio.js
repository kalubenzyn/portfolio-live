import { createProjectCard } from './modules/projectCard.js';

document.addEventListener('DOMContentLoaded', () => {
  // This script is only for the portfolio page
  const devGrid = document.getElementById('dev-grid');
  const designGrid = document.getElementById('design-grid');

  if (!devGrid && !designGrid) return; // Exit if not on portfolio page

  const allProjects = window.portfolioData || [];

  const devProjects = allProjects.filter(p => p.category === 'dev');
  const designProjects = allProjects.filter(p => p.category === 'design');

  if (devGrid && devProjects.length) {
    devProjects.forEach(project => {
      const card = createProjectCard(project);
      devGrid.appendChild(card);
    });
  } else if (devGrid) {
    devGrid.parentElement.style.display = 'none'; // Hide section if no dev projects
  }

  if (designGrid && designProjects.length) {
    designProjects.forEach(project => {
      const card = createProjectCard(project);
      designGrid.appendChild(card);
    });
  } else if (designGrid) {
    designGrid.parentElement.style.display = 'none'; // Hide section if no design projects
  }
});