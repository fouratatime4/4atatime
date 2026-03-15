/* ============================================================
   projects.js — Fetch project data and render cards
   
   Usage on any section page:
   <script src="/js/projects.js" data-section="uiux"></script>
   
   Valid sections: uiux | grafix | ink | music
   Data lives in: /data/{section}.json
   ============================================================ */

(function () {
  const script  = document.currentScript;
  const section = script ? script.getAttribute('data-section') : null;

  if (!section) {
    console.warn('[projects.js] Missing data-section attribute on <script> tag.');
    return;
  }

  const container = document.getElementById('projects-container');
  if (!container) {
    console.warn('[projects.js] #projects-container not found on page.');
    return;
  }

  /* Loading state */
  container.innerHTML = `<p class="projects-loading">Loading…</p>`;

  fetch(`/data/${section}.json`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const projects = Array.isArray(data) ? data : data.projects;

      if (!projects || projects.length === 0) {
        container.innerHTML = `<p class="projects-loading">Nothing here yet — check back soon.</p>`;
        return;
      }

      renderProjects(projects);
    })
    .catch(err => {
      console.error('[projects.js]', err);
      container.innerHTML = `<p class="projects-loading">Couldn't load projects. Try refreshing.</p>`;
    });

  /* ── Render ────────────────────────────────── */

  function renderProjects(projects) {
    container.innerHTML = '';

    /* Column headers (hidden on mobile via CSS) */
    const headers = document.createElement('div');
    headers.className = 'projects-col-headers';
    headers.setAttribute('aria-hidden', 'true');
    headers.innerHTML = `
      <span>When</span>
      <span>What about</span>
      <span>Update Log</span>
    `;
    container.appendChild(headers);

    projects.forEach(project => {
      const article = document.createElement('article');
      article.className = 'project-row';

      /* Image block */
      const imgSrc = project.image
        ? `/assets/images/projects/${esc(project.image)}`
        : null;

      const imageBlock = imgSrc
        ? `<a href="${esc(project.url || '#')}" class="project-image-link"
              ${!project.url ? 'tabindex="-1" aria-hidden="true"' : ''}
              ${project.url && project.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
             <img src="${imgSrc}"
                  alt="${esc(project.title)}"
                  class="project-image"
                  loading="lazy"
                  width="800" height="500">
           </a>`
        : `<div class="project-image project-image--empty" role="img" aria-label="No image yet"></div>`;

      /* Tags */
      const tagsBlock = (project.tags || [])
        .map(t => `<span class="tag">${esc(t)}</span>`)
        .join('');

      /* Title — linked if URL provided */
      const titleBlock = project.url
        ? `<a href="${esc(project.url)}" class="project-title-link"
              ${project.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
             <h3 class="project-title">${esc(project.title)}</h3>
           </a>`
        : `<h3 class="project-title" style="cursor:default">${esc(project.title)}</h3>`;

      /* Update log */
      const logBlock = (project.updateLog || [])
        .map(e => `
          <div class="log-entry">
            <span class="log-date">${esc(e.date)}</span>
            <span class="log-text">${esc(e.text)}</span>
          </div>`)
        .join('');

      article.innerHTML = `
        <div class="project-when">${esc(project.date)}</div>

        <div class="project-main">
          ${imageBlock}
          <div class="project-meta">
            <div class="project-tags" aria-label="Categories">${tagsBlock}</div>
            ${titleBlock}
            <p class="project-description">${esc(project.description)}</p>
          </div>
        </div>

        <div class="project-log" aria-label="Update log">${logBlock || '<span class="log-text">—</span>'}</div>
      `;

      container.appendChild(article);
    });
  }

  /* ── Helpers ───────────────────────────────── */

  /* Escapes user-provided strings for safe HTML injection */
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
