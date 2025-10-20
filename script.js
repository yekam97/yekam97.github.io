// script.js - behavior extracted from portafolio.html

// Helper external links used in buttons
function openBehance(){ window.open('https://www.behance.net/', '_blank') }
function openDribbble(){ window.open('https://dribbble.com/', '_blank') }
function openLinkedIn(){ window.open('https://www.linkedin.com/', '_blank') }
function mailtoMe(){ window.location.href = 'mailto:you@example.com' }

document.addEventListener('DOMContentLoaded', () => {
  // Accordion (simple)
  const accItems = document.querySelectorAll('.acc-item button');
  accItems.forEach(item => {
    item.addEventListener('click', () => {
      const panel = item.nextElementSibling;
      if (!panel) return;
      const expanded = item.getAttribute('aria-expanded') === 'true';
      // close all
      accItems.forEach(b=>b.setAttribute('aria-expanded','false'));
      document.querySelectorAll('.acc-item .panel').forEach(p=>p.style.display='none');
      if (!expanded){ item.setAttribute('aria-expanded','true'); panel.style.display='block'; }
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
      else entry.target.classList.remove('visible');
    });
  }, {threshold: 0.12});
  const hiddenElements = document.querySelectorAll('.reveal');
  hiddenElements.forEach((el) => observer.observe(el));

  // Panels / Tabs from slider and top nav
  const panels = document.querySelectorAll('.panel');
  function showPanel(id){
    panels.forEach(p => p.classList.toggle('active', p.id === id));
  }

  // Top nav tab buttons (if present)
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      if (target) showPanel(target);
    });
  });

  // Explore buttons on slides
  const exploreBtns = document.querySelectorAll('.explore');
  exploreBtns.forEach(b => {
    b.addEventListener('click', (e) => {
      const target = e.currentTarget.dataset.target;
      if (target) showPanel(target);
      // scroll to content area
      const area = document.getElementById('content-area');
      if (area) area.scrollIntoView({behavior:'smooth'});
    });
  });

  // Slider controls
  const slidesEl = document.getElementById('slides');
  const slideItems = slidesEl ? Array.from(slidesEl.children) : [];
  let index = 0;
  function updateSlider(){
    if (!slidesEl) return;
    const gap = 14; // matches CSS gap
    const width = slideItems[0]?.getBoundingClientRect().width || 320;
    slidesEl.style.transform = `translateX(${-index * (width + gap)}px)`;
    // update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d,i)=> d.classList.toggle('active', i===index));
  }

  // create dots
  const dotsWrap = document.getElementById('dots');
  if (dotsWrap && slideItems.length){
    slideItems.forEach((_, i) => {
      const d = document.createElement('div'); d.className='dot';
      d.addEventListener('click', ()=>{ index=i; updateSlider(); });
      dotsWrap.appendChild(d);
    });
    updateSlider();
  }

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  prevBtn?.addEventListener('click', ()=>{ index = Math.max(0, index-1); updateSlider(); });
  nextBtn?.addEventListener('click', ()=>{ index = Math.min(slideItems.length-1, index+1); updateSlider(); });
  window.addEventListener('resize', updateSlider);

  // Lightbox for project images (view-btn handlers)
  document.querySelectorAll('.view-btn').forEach((b)=>{
    b.addEventListener('click', (e)=>{
      const thumb = e.target.closest('.proj').querySelector('.thumb');
      const src = thumb.getAttribute('data-img') || thumb.querySelector('img')?.src || '';
      const modal = document.getElementById('modal');
      const modalImg = document.getElementById('modal-img');
      if(!modal || !modalImg) return;
      modalImg.src = src;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden','false');
    });
  });

  const modal = document.getElementById('modal');
  if(modal){
    modal.addEventListener('click', ()=>{
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden','true');
      const modalImg = document.getElementById('modal-img'); if(modalImg) modalImg.src='';
    });
  }

  // Simple contact handler (opens mailto)
  // Enhanced contact handler: supports external endpoint (Formspree, EmailJS) via data-form-endpoint on the form
  window.sendMessage = async function(){
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl = document.getElementById('message');
    const statusEl = document.getElementById('form-status');
    const form = document.querySelector('form.contact');
    const endpoint = form?.getAttribute('data-form-endpoint')?.trim();

    const name = nameEl?.value.trim();
    const email = emailEl?.value.trim();
    const msg = msgEl?.value.trim();
    if(!name || !email || !msg){
      if(statusEl) statusEl.textContent = 'Completa todos los campos.';
      return;
    }

    // If no endpoint specified, fallback to mailto
    if(!endpoint){
      const subject = encodeURIComponent('Contacto desde portafolio - ' + name);
      const body = encodeURIComponent(msg + '\n\n--\n' + name + ' | ' + email);
      window.location = 'mailto:yeisongamba97@gmail.com?subject=' + subject + '&body=' + body;
      return;
    }

    // Otherwise POST JSON to the external endpoint
    try{
      if(statusEl) statusEl.textContent = 'Enviando...';
      // send as FormData for maximum compatibility with Formspree and similar services
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', msg);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if(res.ok){
        if(statusEl) statusEl.textContent = 'Mensaje enviado. Gracias — te responderé pronto.';
        // clear form
        nameEl.value=''; emailEl.value=''; msgEl.value='';
      } else {
        const text = await res.text();
        if(statusEl) statusEl.textContent = 'Error al enviar: ' + (res.statusText || text);
      }
    }catch(err){
      if(statusEl) statusEl.textContent = 'Error de red al enviar el formulario.';
      console.error('sendMessage error', err);
    }
  };

  // Smooth anchor scrolling with offset for sticky header
  (function(){
    const OFFSET = 18;
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const target = document.querySelector(a.getAttribute('href'));
        if(target){ e.preventDefault(); const top = target.getBoundingClientRect().top + window.pageYOffset - OFFSET - 20; window.scrollTo({top, behavior:'smooth'}); }
      });
    });
  })();

  // Accessibility: allow keyboard close for modal
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ const m = document.getElementById('modal'); if(m) m.classList.remove('active'); } });

  // Micro-interactions: tilt effect on project cards and subtle hero parallax
  (function(){
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReduce) return;

    // tilt for small project cards
    const tiltCards = document.querySelectorAll('.project-card-small');
    tiltCards.forEach(card => {
      card.classList.add('tilt');
      card.addEventListener('mousemove', (e)=>{
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * 6; // rotateX
        const ry = (x - 0.5) * -6; // rotateY
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
    });

    // subtle parallax on hero when available
    const hero = document.querySelector('.hero-card');
    if(hero){
      hero.style.willChange = 'transform';
      hero.addEventListener('mousemove', (e)=>{
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        hero.style.transform = `translate3d(${x*6}px, ${y*6}px, 0)`;
      });
      hero.addEventListener('mouseleave', ()=>{ hero.style.transform = ''; });
    }
  })();

  /* Theme toggle */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('site-theme');
  // default to light if not set
  if(!savedTheme) root.setAttribute('data-theme', 'light');
  else root.setAttribute('data-theme', savedTheme);

  // reflect icon state
  function updateThemeIcon(){
    const t = root.getAttribute('data-theme');
    if(!themeToggle) return;
    themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  }

  updateThemeIcon();

  themeToggle?.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateThemeIcon();
  });

  /* Modal controls (close button and backdrop) */
  const modalClose = document.getElementById('modal-close');
  const modalEl = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  function closeModal(){ if(!modalEl) return; modalEl.classList.remove('active'); modalEl.setAttribute('aria-hidden','true'); modalImg.src=''; modalCaption.textContent=''; }
  modalClose?.addEventListener('click', closeModal);
  modalEl?.addEventListener('click', (e)=>{ if(e.target === modalEl) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  // expose a helper to open project previews with brief info
  window.openProjectPreview = function({src, title, desc}){
    if(!modalEl || !modalImg || !modalCaption) return;
    modalImg.src = src || '';
    modalImg.alt = title || '';
    modalCaption.innerHTML = `<strong>${title || ''}</strong><p class="tiny">${desc || ''}</p>`;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden','false');
  };

  /* Cursor tracking accent */
  const cursorAccent = document.createElement('div'); cursorAccent.className='cursor-accent'; document.body.appendChild(cursorAccent);
  document.addEventListener('mousemove', (e)=>{
    cursorAccent.style.left = e.clientX + 'px'; cursorAccent.style.top = e.clientY + 'px';
    cursorAccent.classList.add('show');
    clearTimeout(window._cursorHide);
    window._cursorHide = setTimeout(()=> cursorAccent.classList.remove('show'), 600);
  });

  // Wire project cards (small) to open the modal using openProjectPreview
  function wireProjectCards(){
    const cards = document.querySelectorAll('.project-card-small');
    cards.forEach(card => {
      // make it keyboard accessible
      card.setAttribute('tabindex', '0');
      card.style.cursor = 'pointer';
      const img = card.querySelector('img');
      const title = card.querySelector('strong')?.textContent || card.getAttribute('data-title') || '';
      const desc = card.querySelector('.muted')?.textContent || card.getAttribute('data-desc') || '';
      const src = img?.getAttribute('src') || img?.dataset?.src || '';
      const open = ()=> window.openProjectPreview({src, title, desc});
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  // run wiring initially and after roles render (in case content is replaced)
  wireProjectCards();
  // observe roles-panels to re-wire when innerHTML changes
  const rolesPanels = document.querySelector('.roles-panels');
  if(rolesPanels){
    const mo = new MutationObserver(()=> wireProjectCards());
    mo.observe(rolesPanels, {childList:true, subtree:true, characterData:true});
  }
});

// Roles section: dynamic content and tab handling
(() => {
  const rolesData = {
    formador: {
      title: 'Formador',
      summary: 'Docente y mentor con experiencia en formación práctica de herramientas de diseño, visualización 3D y metodologías de producto. Diseño programas y talleres orientados a resultados y transferencia de habilidades.',
      projects: [
        {img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60', title:'Taller V-Ray Pro', desc:'Programa intensivo de visualización fotorrealista para profesionales.'},
        {img:'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60', title:'Curso UX Básico', desc:'Curso práctico de fundamentos UX para equipos de producto.'},
        {img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60', title:'Mentoría 1:1', desc:'Acompañamiento en portfolio y desarrollo profesional.'}
      ],
      skills: ['Didáctica', 'Diseño instruccional', 'Figma', 'V-Ray', 'Mentoría']
    },
    interior: {
      title: 'Diseño Interior / Mobiliario',
      summary: 'Experiencia en proyectos residenciales y comerciales, desde ideación hasta fabricación y puesta en obra. Enfoque en ergonomía, materiales y viabilidad constructiva.',
      projects: [
        {img:'https://images.unsplash.com/photo-1505691723518-36a7f1ab4c6b?auto=format&fit=crop&w=800&q=60', title:'Vivienda Campestre', desc:'Proyecto completo: planos, mobiliario a medida y renders.'},
        {img:'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=60', title:'Gastro Bar Cielo Abierto', desc:'Diseño interior con enfoque industrial y experiencia cliente.'},
        {img:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60', title:'Mobiliario a medida', desc:'Líneas y piezas diseñadas para producción local.'}
      ],
      skills: ['SketchUp', 'Rhino', 'V-Ray', 'Fabricación', 'Materiales']
    },
    ux: {
      title: 'Diseño UX / UI',
      summary: 'Diseño centrado en el usuario: investigación, flujo, prototipado y pruebas. Creación de sistemas de diseño y componentes para implementación.',
      projects: [
        {img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60', title:'Plataforma de reservas', desc:'Arquitectura de información y prototipo de alta fidelidad.'},
        {img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60', title:'Rediseño App E-commerce', desc:'Sistema de diseño y componentes.'},
        {img:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60', title:'Test de usabilidad', desc:'Pruebas y reportes con mejoras iterativas.'}
      ],
      skills: ['Figma', 'Prototipado', 'Pruebas de usabilidad', 'Sistemas de diseño', 'Arquitectura de información']
    },
    gestor: {
      title: 'Gestor de proyectos',
      summary: 'Coordinación y liderazgo en proyectos creativos y técnicos. Gestión de equipos, planificación, alcance y entrega con foco en calidad y tiempo.',
      projects: [
        {img:'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=60', title:'Liderazgo Novus', desc:'Coordinación de equipos multidisciplinarios.'},
        {img:'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60', title:'Gestión integral', desc:'Planificación, presupuesto y entrega de proyecto.'},
        {img:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60', title:'Implementación Agile', desc:'Rituales ágiles y seguimiento de objetivos.'}
      ],
      skills: ['Gestión de proyectos', 'Scrum', 'Planificación', 'Comunicación', 'Documentación']
    },
    contenido: {
      title: 'Diseñador gráfico / Content',
      summary: 'Dirección creativa y producción de contenido visual para marcas y redes. Enfoque en narrativa visual y coherencia de marca.',
      projects: [
        {img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60', title:'Campaña Creat3d', desc:'Dirección visual y piezas para redes.'},
        {img:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=60', title:'Identidad Visual', desc:'Logo y aplicaciones para emprendimiento.'},
        {img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60', title:'Calendario de contenidos', desc:'Planificación y ejecución creativa.'}
      ],
      skills: ['Dirección creativa', 'Branding', 'Contenido social', 'Photoshop', 'Illustrator']
    }
  };

  function renderRole(roleKey){
    const container = document.querySelector(`.role-panel[data-role="${roleKey}"]`);
    if(!container) return;
    const data = rolesData[roleKey];
    // create a featured-first layout: 1 large featured project + 2 small
    const featured = data.projects[0];
    const others = data.projects.slice(1,3);
    container.innerHTML = `
      <div class="role-content">
        <div class="role-hero">
          <h3>${data.title}</h3>
          <p class="muted">${data.summary}</p>
        </div>

        <div class="featured-projects">
          <div class="featured">
            <div class="featured-img-wrap">
              <img class="featured-img" loading="lazy" src="${featured.img}" alt="${featured.title}" />
            </div>
            <div class="featured-info">
              <h4>${featured.title}</h4>
              <p class="muted">${featured.desc}</p>
              <div class="tech-badges">
                ${data.skills.slice(0,5).map(s=>`<span class="skill-pill">${s}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="aside-small">
            ${others.map(p=>`
              <div class="project-card-small">
                <img loading="lazy" src="${p.img}" alt="${p.title}">
                <strong>${p.title}</strong>
                <p class="muted" style="font-size:13px">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4>Habilidades</h4>
          <div class="skills-list">
            ${data.skills.map(s=>`<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // initial render for all roles (so panels are ready)
  Object.keys(rolesData).forEach(k=>renderRole(k));

  // animated tab switching (SPA-like) with keyboard and swipe support
  (function(){
    const tabs = Array.from(document.querySelectorAll('.role-tab'));
    const panels = Array.from(document.querySelectorAll('.role-panel'));
    let current = tabs.find(t=>t.classList.contains('active'))?.dataset.role || tabs[0].dataset.role;

    function findIndexByRole(role){ return tabs.findIndex(t=>t.dataset.role===role); }

    function switchRole(newRole){
      if(newRole===current) return;
      const oldRole = current;
      const oldIdx = findIndexByRole(oldRole);
      const newIdx = findIndexByRole(newRole);
      const direction = newIdx > oldIdx ? 'right' : 'left';

      const oldPanel = document.querySelector(`.role-panel[data-role="${oldRole}"]`);
      const newPanel = document.querySelector(`.role-panel[data-role="${newRole}"]`);
      if(!newPanel || !oldPanel) return;

      // prepare new panel off-screen
      newPanel.classList.add('anim-enter-' + direction);
      newPanel.classList.add('active');

      // force reflow then animate
      requestAnimationFrame(()=>{
        oldPanel.classList.add('anim-exit-' + direction);
        newPanel.classList.remove('anim-enter-' + direction);
        newPanel.classList.add('anim-enter-active');
        oldPanel.classList.add('anim-exit-active');
      });

      // cleanup after animation
      const onAnimEnd = (ev) => {
        // ensure cleanup
        oldPanel.classList.remove('active', 'anim-exit-' + direction, 'anim-exit-active');
        newPanel.classList.remove('anim-enter-active');
        oldPanel.removeEventListener('transitionend', onAnimEnd);
      };
      oldPanel.addEventListener('transitionend', onAnimEnd);

      // update tabs selected state
      tabs.forEach(t=>{ const sel = t.dataset.role===newRole; t.classList.toggle('active', sel); t.setAttribute('aria-selected', sel?'true':'false'); });

      current = newRole;

      // smooth scroll to roles on small screens
      const rolesSection = document.getElementById('roles');
      if(window.innerWidth < 760 && rolesSection) rolesSection.scrollIntoView({behavior:'smooth'});
    }

    // click handler
    document.addEventListener('click', (e)=>{
      const tab = e.target.closest('.role-tab');
      if(!tab) return;
      switchRole(tab.dataset.role);
    });

    // keyboard nav already attached earlier; ensure Enter/Space triggers switchRole
    tabs.forEach((tab)=>{
      tab.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchRole(tab.dataset.role); }
      });
    });

    // touch / swipe support for panels
    (function addSwipe(){
      const container = document.querySelector('.roles-panels');
      if(!container) return;
      let startX = 0, dx = 0, startTime = 0;
      container.addEventListener('touchstart', (ev)=>{ startX = ev.touches[0].clientX; dx = 0; startTime = Date.now(); });
      container.addEventListener('touchmove', (ev)=>{ dx = ev.touches[0].clientX - startX; });
      container.addEventListener('touchend', ()=>{
        const elapsed = Date.now() - startTime;
        if(Math.abs(dx) > 50 && elapsed < 500){
          const idx = findIndexByRole(current);
          if(dx < 0){ // swipe left -> next
            const next = tabs[(idx+1) % tabs.length]; switchRole(next.dataset.role);
          } else { // swipe right -> prev
            const prev = tabs[(idx-1+tabs.length) % tabs.length]; switchRole(prev.dataset.role);
          }
        }
      });
    })();

  })();

  // Keyboard navigation for role tabs
  (function(){
    const tabs = Array.from(document.querySelectorAll('.role-tab'));
    if(!tabs.length) return;

    function focusTab(index){
      const t = tabs[index];
      t.focus();
      t.click();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowRight') { e.preventDefault(); focusTab((i+1)%tabs.length); }
        else if(e.key === 'ArrowLeft') { e.preventDefault(); focusTab((i-1+tabs.length)%tabs.length); }
        else if(e.key === 'Home') { e.preventDefault(); focusTab(0); }
        else if(e.key === 'End') { e.preventDefault(); focusTab(tabs.length-1); }
        else if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tab.click(); }
      });
    });
  })();

})();

// Floating sticker badge behavior (open contact or mailto)
(function(){
  const badge = document.getElementById('sticker-badge');
  if(!badge) return;
  const img = document.getElementById('sticker-img');
  const fallback = document.getElementById('sticker-fallback');

  // if image fails, show fallback SVG
  if(img){
    img.addEventListener('error', ()=>{
      img.classList.add('hidden');
      if(fallback) fallback.classList.remove('hidden');
    });
  }

  badge.addEventListener('click', ()=>{
    // if the badge has a whatsapp number configured, open WhatsApp chat
    const wa = badge.getAttribute('data-whatsapp');
    if(wa){
      const text = encodeURIComponent('Hola Yeison, estoy interesado en contactarte como profesional del diseño. ¿Podemos conversar sobre una oportunidad?');
      // open wa.me link (works on mobile and desktop with WhatsApp Web)
      const url = `https://wa.me/${wa}?text=${text}`;
      window.open(url, '_blank');
      return;
    }

    // otherwise scroll to contact section if present
    const contacto = document.getElementById('contacto');
    if(contacto){
      contacto.scrollIntoView({behavior:'smooth', block:'center'});
      contacto.querySelector('input, textarea, button')?.focus();
      return;
    }

    // last fallback to mailto
    window.location.href = 'mailto:yeisongamba97@gmail.com?subject=' + encodeURIComponent('Contacto desde portafolio');
  });

  // keyboard activation
  badge.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); badge.click(); } });
})();
