const i18n = {
  fi: {
    pageTitle: "Muistoissa",
    siteMark: "MUISTOISSA",
    stateMark: "Muistoissa",
    loadingTitle: "Ladataan muistosivua",
    loadingText: "Hetki vain.",
    disabledKicker: "Ei saatavilla",
    disabledTitle: "Muistosivu ei ole saatavilla",
    disabledText: "Tämä muistosivu on poistettu käytöstä.",
    notFoundKicker: "Ei löytynyt",
    notFoundTitle: "Muistosivua ei löytynyt",
    notFoundText: "Tätä muistoarkistoa ei ole saatavilla.",
    errorKicker: "Virhe",
    errorTitle: "Lataus epäonnistui",
    errorText: "Muistosivun avaaminen ei juuri nyt onnistunut.",
    memorialTypeDefault: "Muistoarkisto",
    untitledMemorial: "Rakas muisto",
    noImageCopy: "Jotkin muistot säilyvät ilman kuvaakin.",
    galleryTitle: "Kuvamuistoja",
    storyTitle: "Elämän tarina",
    dateSeparator: "–"
  },
  en: {
    pageTitle: "Muistoissa",
    siteMark: "MUISTOISSA",
    stateMark: "Muistoissa",
    loadingTitle: "Loading memorial page",
    loadingText: "Please wait a moment.",
    disabledKicker: "Unavailable",
    disabledTitle: "Memorial page unavailable",
    disabledText: "This memorial page has been disabled.",
    notFoundKicker: "Not found",
    notFoundTitle: "Memorial page not found",
    notFoundText: "This memory archive is not available.",
    errorKicker: "Error",
    errorTitle: "Loading failed",
    errorText: "The memorial page could not be opened right now.",
    memorialTypeDefault: "Memory archive",
    untitledMemorial: "Beloved memory",
    noImageCopy: "Some memories remain without a photograph.",
    galleryTitle: "Photo memories",
    storyTitle: "Life story",
    dateSeparator: "–"
  }
};

let currentLang = "fi";
let currentState = "loading";
let currentViewModel = null;

const els = {
  html: document.documentElement,
  siteMark: document.getElementById("site-mark"),
  footerMark: document.getElementById("footer-mark"),
  langFi: document.getElementById("lang-fi"),
  langEn: document.getElementById("lang-en"),
  pageState: document.getElementById("page-state"),
  stateKicker: document.getElementById("state-kicker"),
  stateTitle: document.getElementById("state-title"),
  stateText: document.getElementById("state-text"),
  article: document.getElementById("memorial-article"),
  memorialType: document.getElementById("memorial-type"),
  memorialName: document.getElementById("memorial-name"),
  memorialDates: document.getElementById("memorial-dates"),
  memorialEpitaph: document.getElementById("memorial-epitaph"),
  memoryText: document.getElementById("memory-text"),
  heroFigure: document.getElementById("hero-figure"),
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

    const url = getTrimmedString(entry.url || entry.image_url || entry.src || "");

    if (!url) {
      continue;
    }

    const caption = getTrimmedString(entry.caption || entry.title || entry.alt || "");
    items.push({ url, caption });
  }

  return dedupeGalleryItems(items);
}

function dedupeGalleryItems(items) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    if (!item.url || seen.has(item.url)) {
      continue;
    }

    seen.add(item.url);
    result.push(item);
  }

  return result;
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

function buildViewModel(data) {
  const memorialName = getTrimmedString(data.memorial_name) || getTrimmedString(data.name) || t("untitledMemorial");
  const memorialType = getTrimmedString(data.memorial_type) || t("memorialTypeDefault");
  const birthDate = getTrimmedString(data.birth_date);
  const deathDate = getTrimmedString(data.death_date);
  const shortEpitaph = getTrimmedString(data.short_epitaph);
  const memoryText = getTrimmedString(data.memory_text) || getTrimmedString(data.message);
  const lifeStory = getTrimmedString(data.life_story);
  const galleryItems = parseGalleryJson(data.gallery_json);
  const explicitHero = getTrimmedString(data.hero_image_url) || getTrimmedString(data.image_url);
  const heroImageUrl = explicitHero || (galleryItems[0] ? galleryItems[0].url : "");
  const gallery = galleryItems.filter((item) => item.url !== heroImageUrl);

  return {
    memorialName,
    memorialType,
    dateLine: buildDateLine(birthDate, deathDate),
    shortEpitaph,
    memoryText,
    lifeStory,
    heroImageUrl,
    gallery
  };
}

function renderTextBlocks(container, text) {
  container.textContent = "";

  const value = getTrimmedString(text);

  if (!value) {
    return;
  }

  const blocks = value
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    const p = document.createElement("p");
    p.textContent = value;
    container.appendChild(p);
    return;
  }

  for (const block of blocks) {
    const p = document.createElement("p");
    p.textContent = block;
    container.appendChild(p);
  }
}

function renderGallery(gallery, memorialName) {
  els.galleryGrid.textContent = "";

  if (!gallery.length) {
    els.gallerySection.hidden = true;
    return;
  }

  for (const item of gallery) {
    const figure = document.createElement("figure");
    figure.className = "gallery-card";

    const image = document.createElement("img");
    image.src = item.url;
    image.alt = item.caption || memorialName;
    figure.appendChild(image);

    if (item.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = item.caption;
      figure.appendChild(caption);
    }

    els.galleryGrid.appendChild(figure);
  }

  els.gallerySection.hidden = false;
}

function renderState(state) {
  currentState = state;
  els.pageState.hidden = false;
  els.article.hidden = true;
  document.title = t("pageTitle");

  if (state === "loading") {
    els.stateKicker.textContent = t("stateMark");
    els.stateTitle.textContent = t("loadingTitle");
    els.stateText.textContent = t("loadingText");
    return;
  }

  if (state === "disabled") {
    els.stateKicker.textContent = t("disabledKicker");
    els.stateTitle.textContent = t("disabledTitle");
    els.stateText.textContent = t("disabledText");
    return;
  }

  if (state === "not_found") {
    els.stateKicker.textContent = t("notFoundKicker");
    els.stateTitle.textContent = t("notFoundTitle");
    els.stateText.textContent = t("notFoundText");
    return;
  }

  els.stateKicker.textContent = t("errorKicker");
  els.stateTitle.textContent = t("errorTitle");
  els.stateText.textContent = t("errorText");
}

function renderMemorial(viewModel) {
  currentState = "ready";
  currentViewModel = viewModel;
  els.pageState.hidden = true;
  els.article.hidden = false;

  els.memorialType.textContent = viewModel.memorialType;
  els.memorialType.hidden = !viewModel.memorialType;
  els.memorialName.textContent = viewModel.memorialName;
  els.memorialDates.textContent = viewModel.dateLine;
  els.memorialDates.hidden = !viewModel.dateLine;
  els.memorialEpitaph.textContent = viewModel.shortEpitaph;
  els.memorialEpitaph.hidden = !viewModel.shortEpitaph;

  renderTextBlocks(els.memoryText, viewModel.memoryText);
  els.memoryText.hidden = !getTrimmedString(viewModel.memoryText);

  if (viewModel.heroImageUrl) {
    els.heroImage.src = viewModel.heroImageUrl;
    els.heroImage.alt = viewModel.memorialName;
    els.heroFigure.hidden = false;
    els.heroPlaceholder.hidden = true;
  } else {
    els.heroImage.src = "";
    els.heroImage.alt = "";
    els.heroFigure.hidden = true;
    els.heroPlaceholder.hidden = false;
    els.heroPlaceholderCopy.textContent = t("noImageCopy");
  }

  renderGallery(viewModel.gallery, viewModel.memorialName);

  renderTextBlocks(els.storyBody, viewModel.lifeStory);
  els.storySection.hidden = !getTrimmedString(viewModel.lifeStory);

  document.title = `${viewModel.memorialName} | ${t("pageTitle")}`;
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "fi";
  els.html.lang = currentLang;
  els.langFi.classList.toggle("active", currentLang === "fi");
  els.langEn.classList.toggle("active", currentLang === "en");
  els.siteMark.textContent = t("siteMark");
  els.footerMark.textContent = t("pageTitle");
  els.galleryTitle.textContent = t("galleryTitle");
  els.storyTitle.textContent = t("storyTitle");

  if (currentState === "ready" && currentViewModel) {
    renderMemorial(currentViewModel);
    return;
  }

  renderState(currentState);
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
