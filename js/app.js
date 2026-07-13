/* ============================================
   CYBER HOMEPAGE - Main Application Logic
   ============================================ */

(function () {
  'use strict';

  /* ==========================================
     i18n System
     ========================================== */

  const i18n = {
    zh: {
      locating: '定位中...',
      systemOnline: '系统在线',
      settings: '设置',
      focusMode: '专注模式',
      searchPlaceholder: '搜索浩瀚宇宙...',
      quickAccess: '快捷访问',
      systemTerminal: '系统终端',
      dailyQuote: '每日电波',
      quickNotes: '快捷便签',
      save: '保存',
      focusHint: '按 <kbd>Esc</kbd> 退出',
      // Settings
      settingsTitle: '系统设置',
      labelLang: '语言',
      labelAccent: '主题色',
      labelParticle: '粒子颜色',
      labelClock: '时钟格式',
      labelEngine: '默认搜索引擎',
      labelGreeting: '自定义问候语',
      labelTitle: '页面标题',
      labelSearchPh: '搜索框提示文字',
      labelDensity: '粒子密度',
      labelLinks: '快捷链接管理',
      phGreeting: '留空则按时间段自动切换',
      phSearchSetting: '搜索浩瀚宇宙...',
      phLinkName: '名称',
      phLinkIcon: '图标(可选)',
      resetAll: '重置全部',
      saveApply: '保存并应用',
      // Terminal
      termInit: '初始化系统...',
      termFetch: '获取系统信息',
      termPlatform: '平台',
      termScreen: '屏幕',
      termLanguage: '语言',
      termMemory: '内存',
      termCores: '核心',
      termNetwork: '网络',
      termStatus: '状态报告',
      termOk: '所有系统正常运行',
      // Greeting
      goodMorning: '早上好',
      goodAfternoon: '下午好',
      goodEvening: '晚上好',
      goodNight: '夜深了',
      // Notes
      notePlaceholder: '记录你的想法...',
      // Stream
      streamItems: [
        '系统::心跳正常', '网络::延迟 12ms', 'CPU::运行正常', '内存::稳定',
        '磁盘::健康', '安全::防火墙已启用', '日志::无告警', '同步::已完成',
        '缓存::已清理', 'DNS::解析成功', 'TLS::1.3 已启用', '数据库::连接池正常',
        '接口::响应 200', '集群::所有节点在线', '队列::消费速率正常',
        '监控::在线率 99.97%', '备份::上次运行 06:00', '证书::有效期 284 天',
        'CDN::边缘节点已同步', '认证::令牌已刷新'
      ],
      // Reset confirm
      resetConfirm: '确认重置所有设置？这将清除你的自定义主题、链接等配置。',
      // Weekdays
      weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      // N/A
      na: 'N/A',
      connected: '已连接'
    },
    en: {
      locating: 'LOCATING...',
      systemOnline: 'SYSTEM ONLINE',
      settings: 'Settings',
      focusMode: 'Focus Mode',
      searchPlaceholder: 'Search the cosmos...',
      quickAccess: 'QUICK ACCESS',
      systemTerminal: 'SYSTEM TERMINAL',
      dailyQuote: 'DAILY TRANSMISSION',
      quickNotes: 'QUICK NOTES',
      save: 'SAVE',
      focusHint: 'Press <kbd>Esc</kbd> to exit',
      settingsTitle: 'SYSTEM SETTINGS',
      labelLang: 'LANGUAGE',
      labelAccent: 'ACCENT COLOR',
      labelParticle: 'PARTICLE COLOR',
      labelClock: 'CLOCK FORMAT',
      labelEngine: 'DEFAULT ENGINE',
      labelGreeting: 'CUSTOM GREETING',
      labelTitle: 'PAGE TITLE',
      labelSearchPh: 'SEARCH PLACEHOLDER',
      labelDensity: 'PARTICLE DENSITY',
      labelLinks: 'QUICK LINKS',
      phGreeting: 'Leave empty for auto time-based greeting',
      phSearchSetting: 'Search the cosmos...',
      phLinkName: 'Name',
      phLinkIcon: 'Icon(opt)',
      resetAll: 'RESET ALL',
      saveApply: 'SAVE & APPLY',
      termInit: 'Initializing...',
      termFetch: 'Fetching system info',
      termPlatform: 'Platform',
      termScreen: 'Screen',
      termLanguage: 'Language',
      termMemory: 'Memory',
      termCores: 'Cores',
      termNetwork: 'Network',
      termStatus: 'Status report',
      termOk: 'ALL SYSTEMS NOMINAL',
      goodMorning: 'GOOD MORNING',
      goodAfternoon: 'GOOD AFTERNOON',
      goodEvening: 'GOOD EVENING',
      goodNight: 'GOOD NIGHT',
      notePlaceholder: 'Record your transmission...',
      streamItems: [
        'SYS::HEARTBEAT OK', 'NET::LATENCY 12ms', 'CPU::NOMINAL', 'MEM::STABLE',
        'DISK::HEALTHY', 'SEC::FIREWALL ACTIVE', 'LOG::NO ALERTS', 'SYNC::COMPLETED',
        'CACHE::CLEARED', 'DNS::RESOLVED', 'TLS::1.3 ACTIVE', 'DB::CONN POOL OK',
        'API::RESPONSE 200', 'CLUSTER::ALL NODES UP', 'QUEUE::DRAIN RATE OK',
        'MONITOR::UPTIME 99.97%', 'BACKUP::LAST RUN 06:00', 'CERT::VALID 284 DAYS',
        'CDN::EDGE SYNC OK', 'AUTH::TOKEN REFRESHED'
      ],
      resetConfirm: 'Reset all settings? This will clear your custom theme, links, etc.',
      weekDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      na: 'N/A',
      connected: 'Connected'
    }
  };

  // Detect browser language, default zh
  function detectLang() {
    const saved = localStorage.getItem('cyber_lang');
    if (saved === 'zh' || saved === 'en') return saved;
    const nav = navigator.language || navigator.userLanguage || '';
    return nav.toLowerCase().startsWith('zh') ? 'zh' : 'zh'; // default zh
  }

  let lang = detectLang();

  function t(key) {
    return (i18n[lang] && i18n[lang][key]) || (i18n.en[key]) || key;
  }

  function applyI18n() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    // HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    // Placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    // Title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
      el.setAttribute('aria-label', t(el.dataset.i18nTitle));
    });
    // html lang attr
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }

  /* ==========================================
     Settings System (localStorage)
     ========================================== */

  const SETTINGS_KEY = 'cyber_settings';
  const LINKS_KEY = 'cyber_custom_links';
  const NOTES_KEY = 'cyber_notes';

  const DEFAULT_LINKS = [
    { name: 'GitHub', url: 'https://github.com', icon: '⌥', color: '#f97316' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '▶', color: '#ef4444' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '✦', color: '#3b82f6' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: '◈', color: '#10b981' },
    { name: 'StackOverflow', url: 'https://stackoverflow.com', icon: '⧫', color: '#f59e0b' },
    { name: 'Reddit', url: 'https://reddit.com', icon: '◉', color: '#ff6b35' },
    { name: 'Notion', url: 'https://notion.so', icon: '▢', color: '#a855f7' },
    { name: 'Spotify', url: 'https://spotify.com', icon: '♫', color: '#22c55e' }
  ];

  const DEFAULT_SETTINGS = {
    accentColor: '#00e5ff',
    particleColor: '0,229,255',
    clockFormat: '24',
    defaultEngine: 'google',
    customGreeting: '',
    pageTitle: '',
    searchPlaceholder: '',
    particleDensity: 100
  };

  function loadSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS };
    } catch { return { ...DEFAULT_SETTINGS }; }
  }

  function saveSettingsToStorage(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function loadCustomLinks() {
    try {
      const saved = localStorage.getItem(LINKS_KEY);
      return saved ? JSON.parse(saved) : [...DEFAULT_LINKS];
    } catch { return [...DEFAULT_LINKS]; }
  }

  function saveCustomLinks(links) {
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  }

  let settings = loadSettings();

  /* ==========================================
     Apply Settings
     ========================================== */

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  function applyAccentColor(hex) {
    const rgb = hexToRgb(hex);
    const root = document.documentElement;
    root.style.setProperty('--cyan', hex);
    root.style.setProperty('--cyan-dim', `rgba(${rgb}, 0.15)`);
    root.style.setProperty('--cyan-glow', `rgba(${rgb}, 0.4)`);
    root.style.setProperty('--border-color', `rgba(${rgb}, 0.12)`);
    root.style.setProperty('--border-glow', `rgba(${rgb}, 0.3)`);
    document.querySelector('.grid-pulse').style.backgroundImage =
      `linear-gradient(rgba(${rgb}, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(${rgb}, 0.03) 1px, transparent 1px)`;
  }

  function applyAllSettings() {
    applyAccentColor(settings.accentColor);
    if (settings.pageTitle) document.title = settings.pageTitle;
    if (settings.searchPlaceholder) {
      document.getElementById('searchInput').placeholder = settings.searchPlaceholder;
    } else {
      document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    }
    const tabs = document.querySelectorAll('.engine-tab');
    tabs.forEach(tb => tb.classList.toggle('active', tb.dataset.engine === settings.defaultEngine));
    currentEngine = settings.defaultEngine;
    renderLinks();
    particleDensityMultiplier = settings.particleDensity / 100;
    initParticles();
    buildTerminal();
    generateStreamContent();
  }

  /* ==========================================
     Particle System
     ========================================== */

  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let animId;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particleDensityMultiplier = settings.particleDensity / 100;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = settings.particleColor;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
      }
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
    const baseCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200);
    const count = Math.max(Math.floor(baseCount * particleDensityMultiplier), 10);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawLines() {
    const lc = settings.particleColor;
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
          ctx.strokeStyle = `rgba(${lc}, ${opacity})`;
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

  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  resizeCanvas();
  initParticles();
  animateParticles();

  /* ==========================================
     Clock
     ========================================== */

  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('dateDisplay');
  const focusClockEl = document.getElementById('focusClock');
  const focusDateEl = document.getElementById('focusDate');
  const greetingEl = document.getElementById('greeting');

  function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    if (settings.clockFormat === '12') {
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      clockEl.textContent = `${String(h).padStart(2, '0')}:${m}:${s} ${ampm}`;
      focusClockEl.textContent = `${String(h).padStart(2, '0')}:${m} ${ampm}`;
    } else {
      clockEl.textContent = `${String(h).padStart(2, '0')}:${m}:${s}`;
      focusClockEl.textContent = `${String(h).padStart(2, '0')}:${m}`;
    }

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const wd = t('weekDays')[now.getDay()];
    const dateStr = `${year}.${month}.${day} ${wd}`;
    dateEl.textContent = dateStr;
    focusDateEl.textContent = dateStr;

    if (settings.customGreeting) {
      greetingEl.textContent = settings.customGreeting;
    } else {
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) greetingEl.textContent = t('goodMorning');
      else if (hour >= 12 && hour < 18) greetingEl.textContent = t('goodAfternoon');
      else if (hour >= 18 && hour < 23) greetingEl.textContent = t('goodEvening');
      else greetingEl.textContent = t('goodNight');
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ==========================================
     Search
     ========================================== */

  let currentEngine = settings.defaultEngine;
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
      engineTabs.forEach(tb => tb.classList.remove('active'));
      tab.classList.add('active');
      currentEngine = tab.dataset.engine;
      searchInput.focus();
    });
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      if (settingsOpen) { closeSettings(); return; }
      if (focusMode) { toggleFocusMode(); return; }
      searchInput.blur();
    }
  });

  /* ==========================================
     System Info Terminal (i18n aware)
     ========================================== */

  function buildTerminal() {
    const body = document.getElementById('terminalBody');
    const ua = navigator.userAgent;
    let platform = 'Unknown';
    if (ua.includes('Win')) platform = 'Windows';
    else if (ua.includes('Mac')) platform = 'macOS';
    else if (ua.includes('Linux')) platform = 'Linux';
    else if (ua.includes('Android')) platform = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) platform = 'iOS';

    const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : t('na');
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const network = conn ? `${conn.effectiveType || t('na')} / ${conn.downlink || '?'}Mbps` : t('connected');

    body.innerHTML = `
      <div class="terminal-line"><span class="t-green">$</span> system_scan --init</div>
      <div class="terminal-line t-dim">> ${t('termInit')}</div>
      <div class="terminal-line"><span class="t-green">$</span> fetch_system_info</div>
      <div class="terminal-line t-dim">> ${t('termPlatform')}: ${platform}</div>
      <div class="terminal-line t-dim">> ${t('termScreen')}: ${screen.width}x${screen.height} @${window.devicePixelRatio}x</div>
      <div class="terminal-line t-dim">> ${t('termLanguage')}: ${navigator.language || t('na')}</div>
      <div class="terminal-line t-dim">> ${t('termMemory')}: ${memory}</div>
      <div class="terminal-line t-dim">> ${t('termCores')}: ${navigator.hardwareConcurrency || t('na')}</div>
      <div class="terminal-line t-dim">> ${t('termNetwork')}: ${network}</div>
      <div class="terminal-line"><span class="t-green">$</span> status_report</div>
      <div class="terminal-line t-cyan">> ${t('termOk')}</div>
      <div class="terminal-line"><span class="t-green">$</span> <span class="terminal-cursor">█</span></div>
    `;
  }

  /* ==========================================
     IP & Weather
     ========================================== */

  async function fetchIP() {
    try {
      const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
      const data = await res.json();
      const loc = `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`;
      document.getElementById('ipInfo').textContent = loc.trim();
    } catch {
      document.getElementById('ipInfo').textContent = t('locating');
    }
  }

  async function fetchWeather() {
    try {
      const res = await fetch('https://wttr.in/?format=%t+%C', { signal: AbortSignal.timeout(5000) });
      document.getElementById('weatherInfo').textContent = (await res.text()).trim();
    } catch {
      document.getElementById('weatherInfo').textContent = '--';
    }
  }

  fetchIP();
  fetchWeather();

  /* ==========================================
     Daily Quote
     ========================================== */

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
    setTimeout(typeChar, 800);
  }
  typeQuote();

  /* ==========================================
     Notes
     ========================================== */

  const noteInput = document.getElementById('noteInput');
  const noteSaveBtn = document.getElementById('noteSaveBtn');
  const notesList = document.getElementById('notesList');
  const noteCount = document.getElementById('noteCount');

  function getNotes() {
    try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '[]'); }
    catch { return []; }
  }

  function saveNotesToStorage(notes) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
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
    notesList.querySelectorAll('.note-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const all = getNotes();
        all.splice(idx, 1);
        saveNotesToStorage(all);
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
    saveNotesToStorage(notes);
    noteInput.value = '';
    renderNotes();
  });

  noteInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); noteSaveBtn.click(); }
  });

  renderNotes();

  /* ==========================================
     Quick Links
     ========================================== */

  const linksGrid = document.getElementById('linksGrid');

  function renderLinks() {
    linksGrid.innerHTML = '';
    loadCustomLinks().forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'link-item';
      a.dataset.color = link.color || '#00e5ff';
      a.innerHTML = `<div class="link-icon">${escapeHtml(link.icon || '●')}</div><span>${escapeHtml(link.name)}</span>`;
      linksGrid.appendChild(a);
    });
  }

  /* ==========================================
     Focus Mode
     ========================================== */

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

  /* ==========================================
     Data Stream (i18n aware)
     ========================================== */

  function generateStreamContent() {
    const items = t('streamItems');
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    let html = '';
    for (let rep = 0; rep < 2; rep++) {
      items.forEach(item => { html += `<span class="stream-item">[${ts}] ${item}</span>`; });
    }
    document.getElementById('streamContent').innerHTML = html;
  }

  setInterval(generateStreamContent, 60000);

  /* ==========================================
     Settings Modal
     ========================================== */

  let settingsOpen = false;
  const settingsBackdrop = document.getElementById('settingsBackdrop');
  const settingsToggleBtn = document.getElementById('settingsToggle');
  const settingsClose = document.getElementById('settingsClose');
  const saveSettingsBtn = document.getElementById('saveSettings');
  const resetSettingsBtn = document.getElementById('resetSettings');

  function openSettings() {
    settingsOpen = true;
    settingsBackdrop.classList.add('active');
    populateSettingsUI();
  }

  function closeSettings() {
    settingsOpen = false;
    settingsBackdrop.classList.remove('active');
  }

  settingsToggleBtn.addEventListener('click', openSettings);
  settingsClose.addEventListener('click', closeSettings);
  settingsBackdrop.addEventListener('click', e => { if (e.target === settingsBackdrop) closeSettings(); });

  /* --- Language toggle in settings --- */

  document.querySelectorAll('#langToggle .toggle-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('#langToggle .toggle-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      // Live preview language
      lang = opt.dataset.value;
      localStorage.setItem('cyber_lang', lang);
      applyI18n();
      buildTerminal();
      generateStreamContent();
      updateClock();
      noteSaveBtn.textContent = t('save');
      noteInput.placeholder = t('notePlaceholder');
      if (!settings.searchPlaceholder) {
        searchInput.placeholder = t('searchPlaceholder');
      }
    });
  });

  function populateSettingsUI() {
    const s = loadSettings();

    // Language
    document.querySelectorAll('#langToggle .toggle-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.value === lang);
    });

    // Accent color
    document.getElementById('accentPicker').value = s.accentColor;
    document.querySelectorAll('#accentPresets .color-preset').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === s.accentColor);
    });

    // Particle color
    document.querySelectorAll('#particlePresets .color-preset').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === s.particleColor);
    });

    // Clock format
    document.querySelectorAll('#clockFormatToggle .toggle-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.value === s.clockFormat);
    });

    document.getElementById('defaultEngine').value = s.defaultEngine;
    document.getElementById('customGreeting').value = s.customGreeting || '';
    document.getElementById('pageTitle').value = s.pageTitle || '';
    document.getElementById('searchPlaceholder').value = s.searchPlaceholder || '';
    document.getElementById('particleDensity').value = s.particleDensity;
    document.getElementById('particleDensityVal').textContent = s.particleDensity + '%';

    renderLinksEditor();
  }

  /* --- Accent color --- */
  document.querySelectorAll('#accentPresets .color-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#accentPresets .color-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('accentPicker').value = btn.dataset.color;
    });
  });
  document.getElementById('accentPicker').addEventListener('input', () => {
    document.querySelectorAll('#accentPresets .color-preset').forEach(b => b.classList.remove('active'));
  });

  /* --- Particle color --- */
  document.querySelectorAll('#particlePresets .color-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#particlePresets .color-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* --- Clock format --- */
  document.querySelectorAll('#clockFormatToggle .toggle-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('#clockFormatToggle .toggle-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  /* --- Density slider --- */
  document.getElementById('particleDensity').addEventListener('input', e => {
    document.getElementById('particleDensityVal').textContent = e.target.value + '%';
  });

  /* --- Links editor --- */
  function renderLinksEditor() {
    const list = document.getElementById('linkEditList');
    const links = loadCustomLinks();
    list.innerHTML = '';
    links.forEach((link, idx) => {
      const div = document.createElement('div');
      div.className = 'link-edit-item';
      div.innerHTML = `
        <span class="le-icon">${escapeHtml(link.icon || '●')}</span>
        <span class="le-name">${escapeHtml(link.name)}</span>
        <span class="le-url">${escapeHtml(link.url)}</span>
        <button class="le-del" data-idx="${idx}" title="Delete">✕</button>
      `;
      list.appendChild(div);
    });
    list.querySelectorAll('.le-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const all = loadCustomLinks();
        all.splice(idx, 1);
        saveCustomLinks(all);
        renderLinksEditor();
      });
    });
  }

  document.getElementById('addLinkBtn').addEventListener('click', () => {
    const name = document.getElementById('newLinkName').value.trim();
    let url = document.getElementById('newLinkUrl').value.trim();
    const icon = document.getElementById('newLinkIcon').value.trim() || '●';
    if (!name || !url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
    const links = loadCustomLinks();
    links.push({ name, url, icon, color: '#00e5ff' });
    saveCustomLinks(links);
    document.getElementById('newLinkName').value = '';
    document.getElementById('newLinkUrl').value = '';
    document.getElementById('newLinkIcon').value = '';
    renderLinksEditor();
  });

  /* --- Save --- */
  saveSettingsBtn.addEventListener('click', () => {
    const activeAccent = document.querySelector('#accentPresets .color-preset.active');
    const activeParticle = document.querySelector('#particlePresets .color-preset.active');
    const activeFormat = document.querySelector('#clockFormatToggle .toggle-option.active');

    settings.accentColor = document.getElementById('accentPicker').value;
    settings.particleColor = activeParticle ? activeParticle.dataset.color : '0,229,255';
    settings.clockFormat = activeFormat ? activeFormat.dataset.value : '24';
    settings.defaultEngine = document.getElementById('defaultEngine').value;
    settings.customGreeting = document.getElementById('customGreeting').value.trim();
    settings.pageTitle = document.getElementById('pageTitle').value.trim();
    settings.searchPlaceholder = document.getElementById('searchPlaceholder').value.trim();
    settings.particleDensity = parseInt(document.getElementById('particleDensity').value, 10);

    saveSettingsToStorage(settings);
    applyAllSettings();
    closeSettings();
  });

  /* --- Reset --- */
  resetSettingsBtn.addEventListener('click', () => {
    if (!confirm(t('resetConfirm'))) return;
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(LINKS_KEY);
    localStorage.removeItem('cyber_lang');
    lang = 'zh';
    settings = { ...DEFAULT_SETTINGS };
    applyI18n();
    applyAllSettings();
    populateSettingsUI();
  });

  /* ==========================================
     Boot
     ========================================== */

  applyI18n();
  applyAllSettings();

})();