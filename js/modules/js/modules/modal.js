// Simple modal scaffold (not wired to data yet)
export function openModal(contentHtml) {
  let modal = document.getElementById('cs_modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cs_modal';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.background = 'rgba(0,0,0,.6)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `
      <div style="background:#fff; color:#000; padding:20px; border-radius:8px; max-width:600px; width:90%;">
        <button id="cs_close" style="float:right;">Close</button>
        <div id="cs_content"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#cs_close').addEventListener('click', () => modal.remove());
  }
  modal.querySelector('#cs_content').innerHTML = contentHtml;
}