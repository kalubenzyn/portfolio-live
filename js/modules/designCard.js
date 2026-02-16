// designCard.js
export function createDesignPanel(p) {
  // p is a project object from data
  const panel = document.createElement('div');
  panel.className = 'design-panel';

  // Only render if there is designNotes or designTags or assets
  const hasDesign =
    p.designNotes ||
    (Array.isArray(p.designTags) && p.designTags.length) ||
    (Array.isArray(p.designAssets) && p.designAssets.length);
  if (!hasDesign) return panel;

  panel.innerHTML = `
    <button class="design-toggle" aria-expanded="false" aria-controls="design-${p.id}">
      Design
    </button>
    <div id="design-${p.id}" class="design-content" hidden>
      ${p.designNotes ? `<div class="design-notes"><strong>Notes:</strong> ${p.designNotes}</div>` : ''}
      ${p.typography ? `<div class="design-typography"><strong>Typography:</strong> ${p.typography}</div>` : ''}
      ${p.designTags && p.designTags.length ? `<div class="design-tags" aria-label="Design tags">${p.designTags.map(t => `<span class="tag">${t}</span>`).join(' ')}</div>` : ''}
      ${p.designAssets && p.designAssets.length ? `<div class="design-assets"><strong>Assets:</strong> ${p.designAssets.map(a => `<a href="#" target="_blank" class="asset-link">${a}</a>`).join(' ')}</div>` : ''}
    </div>
  `;

  // simple toggle logic
  const btn = panel.querySelector('.design-toggle');
  const content = panel.querySelector('.design-content');
  if (btn && content) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      content.hidden = expanded;
    });
  }

  return panel;
}