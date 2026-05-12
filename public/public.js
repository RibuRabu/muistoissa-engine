const i18n = {
  fi: {
    pageTitle: "Muistoissa",
    memorialMark: "Muistoissa",
    loadingTitle: "Ladataan muistosivua",
    loadingText: "Hetki vain.",
    notFoundTitle: "Muistosivua ei löytynyt",
    notFoundText: "Tätä muistohuonetta ei ole saatavilla.",
    disabledTitle: "Muistosivu ei ole saatavilla",
    disabledText: "Tämä muistosivu on poistettu käytöstä.",
    loadFailedTitle: "Lataus epäonnistui",
    loadFailedText: "Muistosivun avaaminen ei juuri nyt onnistunut.",
    stateDisabled: "Ei saatavilla",
    stateNotFound: "Ei löytynyt",
    stateError: "Virhe",
    memorialTypeDefault: "Muistosivu",
    galleryTitle: "Muistoja kuvina",
    storyTitle: "Elämän tarina",
    untitledMemorial: "Rakas muisto",
    noImageCopy: "Muistot elävät kuvienkin ulkopuolella.",
    dateSeparator: "–"
  },
  en: {
    pageTitle: "Muistoissa",
    memorialMark: "Muistoissa",
    loadingTitle: "Loading memorial page",
    loadingText: "Please wait a moment.",
    notFoundTitle: "Memorial page not found",
    notFoundText: "This memorial room is not available.",
    disabledTitle: "Memorial page unavailable",
    disabledText: "This memorial page has been disabled.",
    loadFailedTitle: "Loading failed",
    loadFailedText: "The memorial page could not be opened right now.",
    stateDisabled: "Unavailable",
    stateNotFound: "Not found",
    stateError: "Error",
    memorialTypeDefault: "Memorial page",
    galleryTitle: "Gallery of memories",
    storyTitle: "Life story",
    untitledMemorial: "Beloved memory",
    noImageCopy: "Some memories remain vivid even without a photograph.",
    dateSeparator: "–"
  }
};

let currentLang = "fi";
let currentPageState = "loading";
let currentViewModel = null;

const els = {
  html: document.documentElement,
  memorialMark: document.getElementById("memorial-mark"),
  langFi: document.getElementById("lang-fi"),
  langEn: document.getElementById("lang-en"),
  statePanel: document.getElementById("state-panel"),
  stateEyebrow: document.getElementById("state-eyebrow"),
  stateTitle: document.getElementById("state-title"),
  stateText: document.getElementById("state-text"),
  memorialContent: document.getElementById("memorial-content"),
  heroKicker: document.getElementById("hero-kicker"),
  memorialName: document.getElementById("memorial-name"),
  memorialDates: document.getElementById("memorial-dates"),
  memorialEpitaph: document.getElementById("memorial-epitaph"),
  memoryLead: document.getElementById("memory-lead"),
  heroVisual: document.getElementById("hero-visual"),
  heroFrame: document.getElementById("hero-frame"),
  heroImage: document.getElementById("hero-image"),
  heroPlaceholder: document.getElementById("hero-placeholder"),
  heroPlaceholderCopy: document.getElementById("hero-placeholder-copy"),
  gallerySection: document.getElementById("gallery-section"),
  galleryTitle: document.getElementById("gallery-title"),
  galleryGrid: document.getElementById("gallery-grid"),
  storySection: document.getElementById("story-section"),
  storyTitle: document.getElementById("story-title"),
  storyBody: document.getElementById("story-body")
};

function t(key) {
  return i18n[currentLang][key] || "";
}

function getTrimmedString(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getSlug() {
  const url = new URL(window.location.href);
  const querySlug = getTrimmedString(url.searchParams.get("slug") || "");

  if (querySlug) {
    return querySlug;
  }

  const parts = url.pathname.split("/").filter(Boolean);

  if (parts.length >= 2 && (parts[0] === "m" || parts[0] === "n")) {
    return decodeURIComponent(parts[1]);
  }

  return "";
}

function parseGalleryJson(value) {
  const text = getTrimmedString(value);

  if (!text) {
    return [];
  }

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const items = [];

  for (const entry of parsed) {
    if (typeof entry === "string") {
      const url = getTrimmedString(entry);

      if (url) {
        items.push({ url, caption: "" });
      }

      continue;
    }

    if (!entry || typeof entry !== "object") {
      continue;
    }

    const url = getTrimmedString(
      entry.url || entry.image_url || entry.src || ""
    );

    if (!url) {
      continue;
    }

    const caption = getTrimmedString(entry.caption || entry.alt || entry.title || "");
    items.push({ url, caption });
  }

  return dedupeGalleryItems(items);
}

function dedupeGalleryItems(items) {
  const seen = new Set();
  const next = [];

  for (const item of items) {
    const key = item.url;

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    next.push(item);
  }

  return next;
}

function buildDateLine(birthDate, deathDate) {
  const birth = getTrimmedString(birthDate);
  const death = getTrimmedString(deathDate);

  if (birth && death) {
    return `${birth} ${t("dateSeparator")} ${death}`;
  }

  if (birth) {
    return birth;
  }

  if (death) {
    return death;
  }

  return "";
}

function buildViewModel(node) {
  const memorialName = getTrimmedString(node.memorial_name) || getTrimmedString(node.name) || t("untitledMemorial");
  const birthDate = getTrimmedString(node.birth_date);
  const deathDate = getTrimmedString(node.death_date);
  const memorialType = getTrimmedString(node.memorial_type) || t("memorialTypeDefault");
  const shortEpitaph = getTrimmedString(node.short_epitaph);
  const memoryText = getTrimmedString(node.memory_text) || getTrimmedString(node.message);
  const lifeStory = getTrimmedString(node.life_story);
  const galleryItems = parseGalleryJson(node.gallery_json);
  const explicitHeroUrl = getTrimmedString(node.hero_image_url) || getTrimmedString(node.image_url);
  const heroItem = explicitHeroUrl
    ? {
        url: explicitHeroUrl,
        caption: ""
      }
    : galleryItems[0] || null;
  const heroImageUrl = heroItem ? heroItem.url : "";
  const gallery = galleryItems.filter((item) => item.url !== heroImageUrl);

  return {
    memorialName,
    birthDate,
    deathDate,
    dateLine: buildDateLine(birthDate, deathDate),
    memorialType,
    shortEpitaph,
    memoryText,
    lifeStory,
    heroImageUrl,
    gallery
  };
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "fi";
  els.html.lang = currentLang;
  els.langFi.classList.toggle("active", currentLang === "fi");
  els.langEn.classList.toggle("active", currentLang === "en");
  els.memorialMark.textContent = t("memorialMark");
  els.galleryTitle.textContent = t("galleryTitle");
  els.storyTitle.textContent = t("storyTitle");

  if (currentPageState === "ready" && currentViewModel) {
    renderMemorial(currentViewModel);
    return;
  }

  renderState(currentPageState);
}

function renderTextBlocks(container, text) {
  container.textContent = "";

  const value = getTrimmedString(text);

  if (!value) {
    return;
  }

  const parts = value
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    const p = document.createElement("p");
    p.textContent = value;
    container.appendChild(p);
    return;
  }

  for (const part of parts) {
    const p = document.createElement("p");
    p.textContent = part;
    container.appendChild(p);
  }
}

function renderGallery(items, memorialName) {
  els.galleryGrid.textContent = "";

  if (!items.length) {
    els.gallerySection.hidden = true;
    return;
  }

  const classes = ["gallery-grid"];

  if (items.length === 1) classes.push("gallery-single");
  if (items.length === 2) classes.push("gallery-pair");
  if (items.length >= 3) classes.push("gallery-collage");

  els.galleryGrid.className = classes.join(" ");

  for (const item of items) {
    const figure = document.createElement("figure");
    figure.className = "gallery-card";

    const image = document.createElement("img");
    image.src = item.url;
    image.alt = item.caption || memorialName;
    figure.appendChild(image);

    if (item.caption) {
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = item.caption;
      figure.appendChild(figcaption);
    }

    els.galleryGrid.appendChild(figure);
  }

  els.gallerySection.hidden = false;
}

function renderState(state) {
  currentPageState = state;
  els.statePanel.hidden = false;
  els.memorialContent.hidden = true;
  document.title = t("pageTitle");

  if (state === "loading") {
    els.stateEyebrow.textContent = t("memorialMark");
    els.stateTitle.textContent = t("loadingTitle");
    els.stateText.textContent = t("loadingText");
    return;
  }

  if (state === "disabled") {
    els.stateEyebrow.textContent = t("stateDisabled");
    els.stateTitle.textContent = t("disabledTitle");
    els.stateText.textContent = t("disabledText");
    return;
  }

  if (state === "not_found") {
    els.stateEyebrow.textContent = t("stateNotFound");
    els.stateTitle.textContent = t("notFoundTitle");
    els.stateText.textContent = t("notFoundText");
    return;
  }

  els.stateEyebrow.textContent = t("stateError");
  els.stateTitle.textContent = t("loadFailedTitle");
  els.stateText.textContent = t("loadFailedText");
}

function renderMemorial(viewModel) {
  currentPageState = "ready";
  currentViewModel = viewModel;
  els.statePanel.hidden = true;
  els.memorialContent.hidden = false;

  document.title = `${viewModel.memorialName} | ${t("pageTitle")}`;

  els.heroKicker.textContent = viewModel.memorialType;
  els.memorialName.textContent = viewModel.memorialName;
  els.memorialDates.textContent = viewModel.dateLine;
  els.memorialDates.hidden = !viewModel.dateLine;

  els.memorialEpitaph.textContent = viewModel.shortEpitaph;
  els.memorialEpitaph.hidden = !viewModel.shortEpitaph;

  renderTextBlocks(els.memoryLead, viewModel.memoryText);
  els.memoryLead.hidden = !getTrimmedString(viewModel.memoryText);

  if (viewModel.heroImageUrl) {
    els.heroImage.src = viewModel.heroImageUrl;
    els.heroImage.alt = viewModel.memorialName;
    els.heroFrame.hidden = false;
    els.heroPlaceholder.hidden = true;
  } else {
    els.heroImage.src = "";
    els.heroImage.alt = "";
    els.heroFrame.hidden = true;
    els.heroPlaceholder.hidden = false;
    els.heroPlaceholderCopy.textContent = t("noImageCopy");
  }

  renderGallery(viewModel.gallery, viewModel.memorialName);

  renderTextBlocks(els.storyBody, viewModel.lifeStory);
  els.storySection.hidden = !getTrimmedString(viewModel.lifeStory);
}

async function loadMemorial() {
  const slug = getSlug();

  renderState("loading");

  if (!slug) {
    renderState("not_found");
    return;
  }

  try {
    const res = await fetch(`/api/public/${encodeURIComponent(slug)}`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (res.status === 410) {
      renderState("disabled");
      return;
    }

    if (res.status === 404) {
      renderState("not_found");
      return;
    }

    if (!res.ok) {
      renderState("load_failed");
      return;
    }

    const data = await res.json();
    renderMemorial(buildViewModel(data || {}));
  } catch (error) {
    console.error(error);
    renderState("load_failed");
  }
}

els.langFi.addEventListener("click", () => setLanguage("fi"));
els.langEn.addEventListener("click", () => setLanguage("en"));

setLanguage("fi");
loadMemorial();
