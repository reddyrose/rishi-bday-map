/* ── Birthday Memory Map — script.js ─────────────────────── */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs = {}) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function driveEmbedUrl(id) {
    return `https://drive.google.com/file/d/${id}/preview`;
  }

  // ── Timeline (dual-handle) ────────────────────────────────
  const sliderMin   = $('yearSliderMin');
  const sliderMax   = $('yearSliderMax');
  const sliderFill  = $('sliderFill');
  const yearDisplay = $('yearDisplay');
  const minYearLabel = $('minYearLabel');
  const maxYearLabel = $('maxYearLabel');

  const yearMin = Math.min(...friends.map(f => f.yearMet));
  const yearMax = new Date().getFullYear();

  sliderMin.min = yearMin; sliderMin.max = yearMax; sliderMin.value = yearMin;
  sliderMax.min = yearMin; sliderMax.max = yearMax; sliderMax.value = yearMax;
  minYearLabel.textContent = yearMin;
  maxYearLabel.textContent = yearMax;

  function getRange() {
    return { lo: parseInt(sliderMin.value, 10), hi: parseInt(sliderMax.value, 10) };
  }

  function updateFill() {
    const { lo, hi } = getRange();
    const span = yearMax - yearMin || 1;
    const leftPct  = (lo - yearMin) / span * 100;
    const rightPct = (hi - yearMin) / span * 100;
    sliderFill.style.left  = leftPct + '%';
    sliderFill.style.width = (rightPct - leftPct) + '%';
  }

  function updateYearLabel() {
    const { lo, hi } = getRange();
    if (lo === yearMin && hi === yearMax) {
      yearDisplay.textContent = 'all years';
    } else if (lo === hi) {
      yearDisplay.textContent = `${lo}`;
    } else {
      yearDisplay.textContent = `${lo} – ${hi}`;
    }
  }

  sliderMin.addEventListener('input', () => {
    if (parseInt(sliderMin.value) > parseInt(sliderMax.value))
      sliderMin.value = sliderMax.value;
    updateFill(); updateYearLabel(); applyFilter();
  });
  sliderMax.addEventListener('input', () => {
    if (parseInt(sliderMax.value) < parseInt(sliderMin.value))
      sliderMax.value = sliderMin.value;
    updateFill(); updateYearLabel(); applyFilter();
  });

  // ── Inject state paths ────────────────────────────────────
  $('states-layer').innerHTML = US_MAP_PATHS;

  const pinsLayer = $('pins-layer');
  const arcsLayer = $('arcs-layer');

  // ── Cluster spreading ─────────────────────────────────────
  // Pins within CLUSTER_R px of each other are fanned out so they're all clickable.
  // Arcs always connect to the original geographic position.
  const CLUSTER_R   = 40;   // px on the 960×600 SVG canvas
  const PIN_D       = 28;   // effective pin diameter (px) — pins must not overlap
  // SPREAD_R is computed dynamically per cluster so every pin fits without overlap

  function computeDisplayPositions(friendList) {
    const n = friendList.length;
    const display = friendList.map(f => ({ x: f.svgX, y: f.svgY, geo: { x: f.svgX, y: f.svgY } }));

    // Find clusters (simple greedy grouping — good enough for a few dozen pins)
    const assigned = new Array(n).fill(-1);
    const clusters = [];

    for (let i = 0; i < n; i++) {
      if (assigned[i] !== -1) continue;
      const cluster = [i];
      assigned[i] = clusters.length;
      for (let j = i + 1; j < n; j++) {
        if (assigned[j] !== -1) continue;
        const dx = friendList[i].svgX - friendList[j].svgX;
        const dy = friendList[i].svgY - friendList[j].svgY;
        if (Math.sqrt(dx * dx + dy * dy) < CLUSTER_R) {
          cluster.push(j);
          assigned[j] = clusters.length;
        }
      }
      clusters.push(cluster);
    }

    // Spread each cluster with more than one pin
    for (const cluster of clusters) {
      if (cluster.length === 1) continue;

      // Centroid of the geographic positions
      const cx = cluster.reduce((s, i) => s + friendList[i].svgX, 0) / cluster.length;
      const cy = cluster.reduce((s, i) => s + friendList[i].svgY, 0) / cluster.length;

      const count = cluster.length;

      // Use a full circle for large clusters, semicircle for small ones
      const totalArc = count >= 7 ? Math.PI * 2 : Math.PI * 1.1;

      // Radius large enough that adjacent pins don't overlap:
      // arc-length between pins = totalArc/count * R >= PIN_D
      const minR = (PIN_D * count) / totalArc;
      const SPREAD_R = Math.max(minR, 38);

      // Fan toward the map center so edge clusters spread inward, never off-screen
      const MAP_CX = 480, MAP_CY = 300;
      const dxC = MAP_CX - cx, dyC = MAP_CY - cy;
      const centerAngle = Math.atan2(dyC, dxC);
      // For full circle start at top; for semicircle centre the fan toward map centre
      const startAngle = totalArc >= Math.PI * 2
        ? -Math.PI / 2
        : centerAngle - totalArc / 2;

      cluster.forEach((idx, k) => {
        // For full circle evenly space without repeating the start angle
        const angle = startAngle + k * totalArc / (totalArc >= Math.PI * 2 ? count : (count - 1));
        display[idx] = {
          x: cx + SPREAD_R * Math.cos(angle),
          y: cy + SPREAD_R * Math.sin(angle),
          geo: { x: friendList[idx].svgX, y: friendList[idx].svgY },
          clustered: true,
          clusterCx: cx,
          clusterCy: cy,
        };
      });
    }

    return display;
  }

  const displayPos = computeDisplayPositions(friends);

  // ── Draw arcs (HOME → geo position) ──────────────────────
  const arcEls = [];

  function quadArc(x1, y1, x2, y2) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const cx = mx - (dy / len) * len * 0.35;
    const cy = my + (dx / len) * len * 0.35;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  friends.forEach((friend, i) => {
    const geo = displayPos[i].geo;
    const path = svgEl('path', {
      class: 'arc-line',
      d: quadArc(HOME.svgX, HOME.svgY, geo.x, geo.y),
    });
    arcsLayer.appendChild(path);
    arcEls.push(path);
  });

  // ── Draw pins ─────────────────────────────────────────────
  const pinGroups = [];
  const PIN_H = 22, PIN_R = 8;

  friends.forEach((friend, i) => {
    const pos = displayPos[i];
    const x = pos.x, y = pos.y;

    const g = svgEl('g', {
      class: 'pin-group',
      role: 'button',
      tabindex: '0',
      'aria-label': `${friend.name} — ${friend.city}`,
    });
    g.style.animationDelay = `${i * 0.12}s`;

    // Thin stem from spread pin down to the geographic cluster centroid
    if (pos.clustered) {
      const stem = svgEl('line', {
        class: 'cluster-stem',
        x1: x, y1: y,
        x2: pos.clusterCx, y2: pos.clusterCy,
      });
      g.appendChild(stem);
    }

    // Ripple at the pin tip (geographic point)
    const ripple = svgEl('circle', {
      class: 'pin-ripple',
      cx: x, cy: y, r: 8,
    });
    ripple.style.animationDelay = `${i * 0.3}s`;
    g.appendChild(ripple);

    // Pin tail + head
    const tail = svgEl('polygon', {
      class: 'pin-head',
      points: `${x - 4},${y - PIN_H + 4} ${x + 4},${y - PIN_H + 4} ${x},${y}`,
    });
    const head = svgEl('circle', {
      class: 'pin-head',
      cx: x, cy: y - PIN_H, r: PIN_R,
    });
    const inner = svgEl('circle', {
      cx: x, cy: y - PIN_H, r: PIN_R * 0.38,
      fill: 'rgba(255,255,255,0.45)',
      'pointer-events': 'none',
    });

    g.appendChild(tail);
    g.appendChild(head);
    g.appendChild(inner);

    // Hover — shows shared tooltip (see below)
    g.addEventListener('mouseenter', () => showTooltip(friend.name, x, y));
    g.addEventListener('mouseleave', hideTooltip);

    pinsLayer.appendChild(g);
    pinGroups.push(g);

    g.addEventListener('click', () => openModal(i));
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(i); }
    });
  });

  // Home marker — emoji house
  const homeG = svgEl('g', { class: 'home-marker' });
  // Subtle glow ring
  homeG.appendChild(svgEl('circle', {
    cx: HOME.svgX, cy: HOME.svgY, r: 13,
    fill: '#a0442a', opacity: 0.15,
  }));
  const homeEmoji = svgEl('text', {
    x: HOME.svgX,
    y: HOME.svgY + 7,   // offset so emoji sits centered on the point
    'text-anchor': 'middle',
    'font-size': '18',
    'dominant-baseline': 'auto',
    class: 'home-emoji',
  });
  homeEmoji.textContent = '🏠';
  homeG.appendChild(homeEmoji);
  pinsLayer.appendChild(homeG);

  // ── Shared hover tooltip — always topmost ─────────────────
  const tooltipG = svgEl('g', { class: 'pin-tooltip', visibility: 'hidden' });
  const tooltipBg = svgEl('rect', {
    rx: 4, ry: 4,
    fill: 'var(--cream)',
    stroke: 'var(--tan)',
    'stroke-width': '1',
  });
  const tooltipText = svgEl('text', {
    'text-anchor': 'middle',
    'dominant-baseline': 'middle',
    'font-family': 'Playfair Display, Georgia, serif',
    'font-size': '11',
    fill: 'var(--ink)',
  });
  tooltipG.appendChild(tooltipBg);
  tooltipG.appendChild(tooltipText);
  pinsLayer.appendChild(tooltipG);

  function showTooltip(name, pinX, pinY) {
    tooltipText.textContent = name;
    tooltipG.setAttribute('visibility', 'visible');
    const textW = tooltipText.getBBox().width;
    const pad = 8, h = 20;
    const bx = pinX - textW / 2 - pad;
    const by = pinY - PIN_H - PIN_R - h - 6;
    tooltipBg.setAttribute('x', bx);
    tooltipBg.setAttribute('y', by);
    tooltipBg.setAttribute('width',  textW + pad * 2);
    tooltipBg.setAttribute('height', h);
    tooltipText.setAttribute('x', pinX);
    tooltipText.setAttribute('y', by + h / 2);
  }

  function hideTooltip() {
    tooltipG.setAttribute('visibility', 'hidden');
  }

  // ── Year filter ───────────────────────────────────────────
  function applyFilter() {
    const { lo, hi } = getRange();
    friends.forEach((f, i) => {
      const visible = f.yearMet >= lo && f.yearMet <= hi;
      pinGroups[i].classList.toggle('faded', !visible);
      arcEls[i].classList.toggle('visible', visible);
    });
  }

  updateFill(); updateYearLabel(); applyFilter();

  // ── Modal ─────────────────────────────────────────────────
  const overlay   = $('modal-overlay');
  const iframe    = $('modal-iframe');
  const modalName = $('modal-name');
  const modalCity = $('modal-city');
  const modalYear = $('modal-year');
  const closeBtn  = $('modal-close');

  const modalBox = $('modal-box');

  function openModal(i) {
    const f = friends[i];
    modalName.textContent = f.name;
    modalCity.textContent = f.city;
    modalYear.textContent = `Friends since ${f.yearMet}`;
    iframe.src = driveEmbedUrl(f.driveId);
    // Switch layout for vertical vs horizontal videos
    modalBox.classList.toggle('vertical', !!f.vertical);
    overlay.classList.remove('hidden');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.add('hidden');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

})();
