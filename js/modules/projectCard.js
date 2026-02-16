// Placeholder modular component for a project card
export function createProjectCard(p) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('aria-label', p.title);

  let linkHTML = '';
  // Add a link button if the project has a link
  if (p.link && p.link !== '#') {
    linkHTML = `<a href="${p.link}" class="btn secondary card-btn" target="_blank" rel="noopener noreferrer">View Project</a>`;
  }

  card.innerHTML = `
    <img src="${p.image || ''}" alt="" style="width:100%; height:140px; object-fit:cover; border-radius:8px; background:#ddd;">
    <h3>${p.title}</h3>
    <p>${p.excerpt}</p>
    <div class="tags" aria-label="tags">${(p.tags || []).map(t => `<span>${t}</span>`).join(' ')}</div>
    ${linkHTML}
  `;
  return card;
}