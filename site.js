// Small progressive enhancements. No tracking, cookies or storage.
(() => {
  "use strict";

  // ---------- Ranking demo ----------
  const BANDS = { easy: [1.0, 3.9], medium: [4.0, 6.9], hard: [7.0, 10.0] };
  const LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };
  const START = {
    easy: [
      { title: "Gymnopédie No. 1", composer: "Erik Satie", score: 2.1, color: "#3f6b58" },
      { title: "Prelude in E minor, Op. 28 No. 4", composer: "Frédéric Chopin", score: 3.2, color: "#5d6f8a" }
    ],
    medium: [
      { title: "Für Elise", composer: "Ludwig van Beethoven", score: 4.6, color: "#8a6b4a" },
      { title: "Clair de lune", composer: "Claude Debussy", score: 5.7, color: "#6b7a45" }
    ],
    hard: [
      { title: "Moonlight Sonata: III. Presto agitato", composer: "Ludwig van Beethoven", score: 7.8, color: "#4a4f63" },
      { title: "Ballade No. 1 in G minor", composer: "Frédéric Chopin", score: 8.9, color: "#7a4a5a" }
    ]
  };
  const NEW_PIECE = { title: "Nocturne, Op. 9 No. 2", composer: "Frédéric Chopin", color: "#6a4560", isNew: true };

  const demo = document.querySelector("[data-demo]");
  if (demo) {
    const $ = (sel) => demo.querySelector(sel);
    const steps = {
      category: $('[data-step="category"]'),
      compare: $('[data-step="compare"]'),
      result: $('[data-step="result"]')
    };
    const list = $("[data-list]");
    const reset = $("[data-reset]");
    let state;

    const fresh = () => ({
      lists: JSON.parse(JSON.stringify(START)),
      category: null,
      low: 0,     // index range in which the new piece may still land
      high: 2,
      asked: 0,
      placed: null
    });

    const show = (name) => {
      Object.entries(steps).forEach(([key, el]) => { el.hidden = key !== name; });
      reset.hidden = name === "category";
    };

    const render = () => {
      list.innerHTML = "";
      let n = 0;
      ["easy", "medium", "hard"].forEach((cat) => {
        const head = document.createElement("li");
        head.className = "cat";
        head.textContent = `Piano · Played · ${LABEL[cat]}`;
        list.append(head);
        state.lists[cat].forEach((p, i) => {
          n += 1;
          const li = document.createElement("li");
          if (p.isNew) li.className = "new";
          const total = state.lists[cat].length;
          li.innerHTML =
            `<span class="art" style="background:linear-gradient(145deg,${p.color},#1c1c1e)">♪</span>` +
            `<span class="t">${n}. ${p.title}<small>${p.composer} · ${LABEL[cat]} #${i + 1} of ${total}</small></span>` +
            `<span class="s">${p.score.toFixed(1)}<small>${p.isNew ? "Estimated" : "/ 10"}</small></span>`;
          list.append(li);
        });
      });
    };

    const ask = () => {
      const ref = state.lists[state.category][state.low];
      $("[data-ref]").textContent = ref.title;
      $("[data-hint]").textContent = `Comparison ${state.asked + 1} of up to 2 · only against other ${LABEL[state.category]} pieces.`;
      show("compare");
    };

    const place = (index, score) => {
      const [lo, hi] = BANDS[state.category];
      const piece = { ...NEW_PIECE, score: Math.min(hi, Math.max(lo, Math.round(score * 10) / 10)) };
      const arr = state.lists[state.category];
      arr.splice(index, 0, piece);
      render();
      $("[data-result]").innerHTML =
        `Saved as <strong>${LABEL[state.category]} · #${index + 1} of ${arr.length}</strong> — ` +
        `${piece.score.toFixed(1)} / 10, <em>Estimated</em> until more comparisons agree.`;
      show("result");
    };

    const answer = (dir) => {
      const arr = state.lists[state.category];
      const [lo, hi] = BANDS[state.category];
      const i = state.low;
      const ref = arr[i];
      state.asked += 1;
      if (dir === 0) return place(i + 1, ref.score + 0.1);
      if (dir < 0) {
        const below = i > 0 ? arr[i - 1].score : lo;
        return place(i, (below + ref.score) / 2);
      }
      // Harder: compare with the next piece up, if there is one and we have a question left.
      if (i + 1 < arr.length && state.asked < 2) { state.low = i + 1; return ask(); }
      const above = i + 1 < arr.length ? arr[i + 1].score : hi;
      return place(i + 1, (ref.score + above) / 2);
    };

    demo.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      if (btn.dataset.category) { state.category = btn.dataset.category; ask(); }
      else if (btn.dataset.answer !== undefined) answer(Number(btn.dataset.answer));
      else if (btn.hasAttribute("data-reset")) { state = fresh(); render(); show("category"); }
    });

    state = fresh();
    render();
    show("category");
  }

  // ---------- Theme explorer (palettes match the app) ----------
  const ERAS = [
    ["Medieval", "Illuminated manuscripts, old stone, and candlelight.", [
      ["Illuminated Gold", "Parchment, antique gold, and linen", 0x76623F, 0xF3EFE6, 0xFAF7F0, [0x8D7852, 0xC2B28F, 0xE8DFCD]],
      ["Cloister Stone", "Limestone, moss, and silver sage", 0x52645A, 0xEDEEE8, 0xF7F7F0, [0x68796B, 0xADB4A4, 0xDCDDD2]],
      ["Midnight Manuscript", "Smoked ink and candlelit brass", 0xC6B793, 0x1B2025, 0x272E34, [0x35434C, 0x827963, 0xC6B793]]]],
    ["Renaissance", "Frescoes, rich pigments, and warm vellum.", [
      ["Fresco Sage", "Fresco sage and faded terracotta", 0x59694F, 0xEFEFE6, 0xF8F7EF, [0x7A876B, 0xB69B88, 0xDDD7C5]],
      ["Venetian Crimson", "Oxblood, antique rose, and silk", 0xD1B7AE, 0x292124, 0x382D31, [0x704B52, 0xA4857C, 0xD1B7AE]],
      ["Warm Vellum", "Vellum, warm taupe, and umber", 0x78624F, 0xF1EBE0, 0xFAF6ED, [0x8D7660, 0xBCAF96, 0xE4D8C4]]]],
    ["Baroque", "Deep wood, gilded details, and cathedral interiors.", [
      ["Cathedral Burgundy", "Burgundy velvet and aged brass", 0xCEBA97, 0x282024, 0x382D31, [0x67444B, 0x998568, 0xCEBA97]],
      ["Gilded Ivory", "Brushed gold on warm ivory", 0x796742, 0xF3EFE4, 0xFAF7EF, [0x9A8659, 0xC6B892, 0xE7DECA]],
      ["Organ Loft", "Walnut, olive, and softened brass", 0xC4B99B, 0x24251F, 0x32342C, [0x565A45, 0x92866A, 0xC4B99B]]]],
    ["Classical", "Blue editions, clear lines, and quiet elegance.", [
      ["Edition Blue", "Prussian ink and ivory paper", 0x3C536B, 0xEEEFEA, 0xF8F8F2, [0x3C536B, 0xA4AFB7, 0xE3DED0]],
      ["Porcelain", "Blue-grey glaze and chalk white", 0x5C6871, 0xF0F1ED, 0xFAFBF7, [0x798992, 0xBCC5C7, 0xE4E5DD]],
      ["Concert Sage", "Laurel, sage, and unbleached linen", 0x536651, 0xECEEE5, 0xF7F8F0, [0x71816A, 0xB4BEA6, 0xE4DECA]]]],
    ["Romantic", "Rose, impressionist gardens, and twilight.", [
      ["Romantic Rose", "Dusty rose, blush silk, and ivory", 0x835C65, 0xF3ECE8, 0xFBF6F1, [0x997780, 0xCEB5B4, 0xE8DCCE]],
      ["Water Lilies", "Willow, muted lilac, and mist blue", 0x526C64, 0xEBEFE8, 0xF6F8F1, [0x85988A, 0xAEA7B9, 0xB8C5CB]],
      ["Nocturne Plum", "Smoked plum and cashmere mauve", 0xCCB8C7, 0x262229, 0x36303B, [0x65576A, 0xA08D9F, 0xCCB8C7]]]],
    ["Contemporary", "Architectural neutrals, soft ink, and patinated color.", [
      ["Graphite", "Graphite, pewter, and pearl", 0xC9CBC9, 0x222426, 0x303437, [0x464C50, 0x959D9F, 0xCDD0CD]],
      ["Paper & Ink", "Warm paper and soft black ink", 0x454642, 0xF0EFE8, 0xFAF9F3, [0x454642, 0xACADA4, 0xE4E1D5]],
      ["Patina Teal", "Deep petrol and patinated jade", 0xADC7BD, 0x1E2929, 0x2C3A38, [0x45615D, 0x7F9D92, 0xADC7BD]]]],
    ["Jazz", "Smoked blues, brushed gold, and late-night warmth.", [
      ["Midnight Jazz", "Smoked navy, violet, and champagne", 0xB9BDD2, 0x1C2230, 0x2B3344, [0x3F4E68, 0x8C8B9E, 0xC5B38C]],
      ["Black & Gold", "Charcoal and brushed champagne gold", 0xC6B58D, 0x22221F, 0x32322C, [0x30312C, 0x8C8165, 0xC6B58D]],
      ["After Hours", "Espresso, cognac, and muted copper", 0xCEB3A0, 0x29231F, 0x3B312B, [0x715B4D, 0xA38A73, 0xCEB3A0]]]]
  ];

  const hex = (n) => "#" + n.toString(16).padStart(6, "0");
  const isDark = (n) => {
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.45;
  };

  const themes = document.querySelector("[data-themes]");
  if (themes) {
    const eraBox = themes.querySelector("[data-eras]");
    const detail = themes.querySelector("[data-era-detail]");
    const paletteBox = themes.querySelector("[data-palettes]");

    const apply = ([, , accent, bg, surface, sw]) => {
      const dark = isDark(bg);
      const s = themes.style;
      s.setProperty("--t-bg", hex(bg));
      s.setProperty("--t-surface", hex(surface));
      s.setProperty("--t-accent", hex(accent));
      s.setProperty("--t-s1", hex(sw[0]));
      s.setProperty("--t-s2", hex(sw[1]));
      s.setProperty("--t-s3", hex(sw[2]));
      s.setProperty("--t-ink", dark ? "#f2f0ea" : "#1c1c1e");
      s.setProperty("--t-muted", dark ? "#f2f0eab3" : "#6c6c70");
    };

    const selectPalette = (era, index) => {
      paletteBox.querySelectorAll(".palette").forEach((b, i) => b.setAttribute("aria-pressed", String(i === index)));
      apply(ERAS[era][2][index]);
    };

    const selectEra = (era, paletteIndex = 0) => {
      eraBox.querySelectorAll("button").forEach((b, i) => {
        b.setAttribute("aria-selected", String(i === era));
        b.tabIndex = i === era ? 0 : -1;
      });
      detail.textContent = ERAS[era][1];
      paletteBox.innerHTML = "";
      ERAS[era][2].forEach((p, i) => {
        const [name, desc, , bg, surface, sw] = p;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "palette";
        btn.style.background = hex(surface);
        btn.style.color = isDark(bg) ? "#f2f0ea" : "#1c1c1e";
        btn.style.boxShadow = "0 0 0 1px " + (isDark(bg) ? "#ffffff1a" : "#0000000f");
        btn.innerHTML = `<span class="swatches">${sw.map((c) => `<i style="background:${hex(c)}"></i>`).join("")}</span><span><b>${name}</b><small>${desc}</small></span>`;
        btn.addEventListener("click", () => selectPalette(era, i));
        paletteBox.append(btn);
      });
      selectPalette(era, paletteIndex);
    };

    ERAS.forEach(([name], i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.role = "tab";
      b.textContent = name;
      b.addEventListener("click", () => selectEra(i));
      b.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = (i + (e.key === "ArrowRight" ? 1 : ERAS.length - 1)) % ERAS.length;
        selectEra(next);
        eraBox.children[next].focus();
      });
      eraBox.append(b);
    });

    selectEra(4); // Romantic Rose, as in onboarding
  }

  // ---------- Gentle reveal on scroll ----------
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const targets = document.querySelectorAll(".section-head, .shelf, .facts dl > div, .feature-copy, .demo, .screen, .features article, .themes-copy, .theme-preview, .promise > *, .closing > *");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
      io.observe(el);
    });
  }
})();
