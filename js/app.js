/* ============================================
   CYBER HOMEPAGE - Main Application Logic
   ============================================ */

(function () {
  'use strict';

  /* ---------- Particle System ---------- */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let animId;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.7 ? '139, 92, 246' : '0, 229, 255';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Mouse interaction
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
      }
      // Wrap around
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const opacity = (1 - dist / 100) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    if (isReducedMotion) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animId = requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resizeCanvas();
  initParticles();
  animateParticles();

  /* ---------- Clock ---------- */
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('dateDisplay');
  const focusClockEl = document.getElementById('focusClock');
  const focusDateEl = document.getElementById('focusDate');
  const greetingEl = document.getElementById('greeting');

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${h}:${m}:${s}`;
    clockEl.textContent = timeStr;
    focusClockEl.textContent = `${h}:${m}`;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const wd = weekDays[now.getDay()];
    const dateStr = `${year}.${month}.${day} ${wd}`;
    dateEl.textContent = dateStr;
    focusDateEl.textContent = dateStr;

    const hour = now.getHours();
    let greetText = 'GOOD NIGHT';
    if (hour >= 5 && hour < 12) greetText = 'GOOD MORNING';
    else if (hour >= 12 && hour < 18) greetText = 'GOOD AFTERNOON';
    else if (hour >= 18 && hour < 23) greetText = 'GOOD EVENING';
    greetingEl.textContent = greetText;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- Search ---------- */
  let currentEngine = 'google';
  const searchEngines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd=',
    duckduckgo: 'https://duckduckgo.com/?q='
  };

  const searchInput = document.getElementById('searchInput');
  const engineTabs = document.querySelectorAll('.engine-tab');

  engineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      engineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentEngine = tab.dataset.engine;
      searchInput.focus();
    });
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
      }
    }
  });

  // "/" shortcut to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      if (focusMode) toggleFocusMode();
      searchInput.blur();
    }
  });

  /* ---------- System Info ---------- */
  function fillSystemInfo() {
    const ua = navigator.userAgent;
    let platform = 'Unknown';
    if (ua.includes('Win')) platform = 'Windows';
    else if (ua.includes('Mac')) platform = 'macOS';
    else if (ua.includes('Linux')) platform = 'Linux';
    else if (ua.includes('Android')) platform = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) platform = 'iOS';

    document.getElementById('sysPlatform').textContent = platform;
    document.getElementById('sysScreen').textContent = `${screen.width}×${screen.height} @${window.devicePixelRatio}x`;
    document.getElementById('sysLang').textContent = navigator.language || 'N/A';
    document.getElementById('sysCores').textContent = navigator.hardwareConcurrency || 'N/A';

    if (navigator.deviceMemory) {
      document.getElementById('sysMemory').textContent = `${navigator.deviceMemory} GB`;
    } else {
      document.getElementById('sysMemory').textContent = 'N/A';
    }

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      document.getElementById('sysNetwork').textContent = `${conn.effectiveType || 'N/A'} / ${conn.downlink || '?'}Mbps`;
    } else {
      document.getElementById('sysNetwork').textContent = 'Connected';
    }
  }
  fillSystemInfo();

  /* ---------- IP & Weather ---------- */
  async function fetchIP() {
    try {
      const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
      const data = await res.json();
      const loc = `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`;
      document.getElementById('ipInfo').textContent = loc.trim();
    } catch {
      document.getElementById('ipInfo').textContent = 'LOCATION: N/A';
    }
  }

  async function fetchWeather() {
    try {
      const res = await fetch('https://wttr.in/?format=%t+%C', { signal: AbortSignal.timeout(5000) });
      const text = await res.text();
      document.getElementById('weatherInfo').textContent = text.trim();
    } catch {
      document.getElementById('weatherInfo').textContent = 'WEATHER: N/A';
    }
  }

  fetchIP();
  fetchWeather();

  /* ---------- Daily Quote ---------- */
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "It's not a bug — it's an undocumented feature.", author: "Anonymous" },
    { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
    { text: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.", author: "Tim Berners-Lee" },
    { text: "I think it's a new frontier. Nobody knows what's going to happen.", author: "Jeff Bezos" },
    { text: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates" }
  ];

  function typeQuote() {
    const dayIndex = Math.floor(Date.now() / 86400000) % quotes.length;
    const quote = quotes[dayIndex];
    const textEl = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    textEl.innerHTML = '';
    authorEl.textContent = '';

    const fullText = `"${quote.text}"`;
    let i = 0;

    function typeChar() {
      if (i < fullText.length) {
        textEl.innerHTML = fullText.slice(0, i + 1) + '<span class="quote-cursor"></span>';
        i++;
        setTimeout(typeChar, 40 + Math.random() * 30);
      } else {
        textEl.innerHTML = fullText;
        authorEl.textContent = `— ${quote.author}`;
      }
    }

    // Delay start slightly
    setTimeout(typeChar, 800);
  }

  typeQuote();

  /* ---------- Notes ---------- */
  const noteInput = document.getElementById('noteInput');
  const noteSaveBtn = document.getElementById('noteSaveBtn');
  const notesList = document.getElementById('notesList');
  const noteCount = document.getElementById('noteCount');

  function getNotes() {
    try {
      return JSON.parse(localStorage.getItem('cyber_notes') || '[]');
    } catch { return []; }
  }

  function saveNotes(notes) {
    localStorage.setItem('cyber_notes', JSON.stringify(notes));
  }

  function renderNotes() {
    const notes = getNotes();
    noteCount.textContent = notes.length;
    notesList.innerHTML = '';
    notes.slice().reverse().forEach((note, idx) => {
      const div = document.createElement('div');
      div.className = 'note-item';
      div.innerHTML = `
        <span class="note-content">${escapeHtml(note.text)}</span>
        <span class="note-time">${note.time}</span>
        <button class="note-delete" data-idx="${notes.length - 1 - idx}" title="Delete">✕</button>
      `;
      notesList.appendChild(div);
    });

    // Bind delete buttons
    notesList.querySelectorAll('.note-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const all = getNotes();
        all.splice(idx, 1);
        saveNotes(all);
        renderNotes();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  noteSaveBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (!text) return;
    const notes = getNotes();
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    notes.push({ text, time });
    saveNotes(notes);
    noteInput.value = '';
    renderNotes();
  });

  // Ctrl+Enter to save
  noteInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      noteSaveBtn.click();
    }
  });

  renderNotes();

  /* ---------- Focus Mode ---------- */
  let focusMode = false;
  const focusToggle = document.getElementById('focusToggle');
  const focusOverlay = document.getElementById('focusOverlay');
  const mainContent = document.getElementById('mainContent');
  const topBar = document.getElementById('topBar');
  const dataStream = document.getElementById('dataStream');

  function toggleFocusMode() {
    focusMode = !focusMode;
    focusOverlay.classList.toggle('active', focusMode);
    mainContent.classList.toggle('hidden', focusMode);
    topBar.style.opacity = focusMode ? '0' : '1';
    topBar.style.pointerEvents = focusMode ? 'none' : 'auto';
    dataStream.classList.toggle('hidden', focusMode);
  }

  focusToggle.addEventListener('click', toggleFocusMode);

  /* ---------- Data Stream ---------- */
  function generateStreamContent() {
    const items = [
      'SYS::HEARTBEAT OK',
      'NET::LATENCY 12ms',
      'CPU::NOMINAL',
      'MEM::STABLE',
      'DISK::HEALTHY',
      'SEC::FIREWALL ACTIVE',
      'LOG::NO ALERTS',
      'SYNC::COMPLETED',
      'CACHE::CLEARED',
      'DNS::RESOLVED',
      'TLS::1.3 ACTIVE',
      'DB::CONN POOL OK',
      'API::RESPONSE 200',
      'CLUSTER::ALL NODES UP',
      'QUEUE::DRAIN RATE OK',
      'MONITOR::UPTIME 99.97%',
      'BACKUP::LAST RUN 06:00',
      'CERT::VALID 284 DAYS',
      'CDN::EDGE SYNC OK',
      'AUTH::TOKEN REFRESHED'
    ];

    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    let html = '';
    // Double the items for seamless loop
    for (let rep = 0; rep < 2; rep++) {
      items.forEach(item => {
        html += `<span class="stream-item">[${ts}] ${item}</span>`;
      });
    }
    return html;
  }

  document.getElementById('streamContent').innerHTML = generateStreamContent();

  // Refresh stream timestamps periodically
  setInterval(() => {
    document.getElementById('streamContent').innerHTML = generateStreamContent();
  }, 60000);

})();