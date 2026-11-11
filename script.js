const repertoire = {
  played: {
    summary: "3 pieces. A few old friends.",
    pieces: [
      ["Clair de lune", "Claude Debussy", "L. 75, No. 3"],
      ["Nocturne in E-flat major", "Frédéric Chopin", "Op. 9, No. 2"],
      ["Prelude in C major", "Johann Sebastian Bach", "BWV 846"],
    ],
  },
  learning: {
    summary: "2 pieces. A little better every day.",
    pieces: [
      ["Arabesque No. 1", "Claude Debussy", "L. 66"],
      ["Piano Sonata No. 14 “Moonlight”", "Ludwig van Beethoven", "Op. 27, No. 2"],
    ],
  },
  wishlist: {
    summary: "2 pieces. Something to look forward to.",
    pieces: [
      ["The Four Seasons", "Antonio Vivaldi", "Op. 8"],
      ["Gymnopédie No. 1", "Erik Satie", "Piano"],
    ],
  },
};

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panel = document.getElementById("pieces");
const summary = document.getElementById("list-summary");

function selectTab(tab) {
  const selected = repertoire[tab.dataset.status];
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", tab.id);
  panel.replaceChildren(...selected.pieces.map(([title, composer, catalogue], index) => {
    const row = document.createElement("div");
    row.className = "piece";
    const number = document.createElement("span");
    number.className = "piece-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const info = document.createElement("div");
    info.className = "piece-info";
    const heading = document.createElement("h3");
    heading.textContent = title;
    const detail = document.createElement("p");
    detail.textContent = `${composer} · ${catalogue}`;
    info.append(heading, detail);
    const note = document.createElement("span");
    note.className = "piece-note";
    note.setAttribute("aria-hidden", "true");
    note.textContent = "♪";
    row.append(number, info, note);
    return row;
  }));
  summary.textContent = selected.summary;
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});
