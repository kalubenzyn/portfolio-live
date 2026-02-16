(function () {
  // Dark mode toggle
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('[id^="theme-toggle"]');
  const stored = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', stored);

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  });

  // Populate simple portfolio grid on Home
  const homeGrid = document.getElementById('projects-grid');
  const portfolio = (window.portfolioData || [
    { title: 'Sample', excerpt: 'Sample', image: '' }
  ]);
  if (homeGrid && portfolio.length) {
    const previewProjects = portfolio.slice(0, 4);
    homeGrid.innerHTML = previewProjects.map(p => `
      <article class="card" role="article" aria-label="${p.title}">
        <img src="${p.image || ''}" alt="${p.title}" style="width:100%; height:140px; object-fit:cover; border-radius:8px; background:#ddd;">
        <h3>${p.title}</h3>
        <p class="excerpt">${p.excerpt}</p>
        <div class="tags" aria-label="tags">${(p.tags || []).map(t => `<span>${t}</span>`).join(' ')}</div>
      </article>
    `).join('');
  }
})();