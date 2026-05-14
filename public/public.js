const i18n = {
  fi: {
    pageTitle: "Muistoissa",
    siteMark: "MUISTOISSA",
    stateMark: "Muistoissa",
    loadingTitle: "Ladataan muistosivua",
    loadingText: "Hetki vain.",
    disabledKicker: "Ei saatavilla",
    disabledTitle: "Muistosivu ei ole saatavilla",
    disabledText: "Tama muistosivu on poistettu kaytosta.",
    notFoundKicker: "Ei loytynyt",
    notFoundTitle: "Muistosivua ei loytynyt",
    notFoundText: "Tata muistoarkistoa ei ole saatavilla.",
    errorKicker: "Virhe",
    errorTitle: "Lataus epaonnistui",
    errorText: "Muistosivun avaaminen ei juuri nyt onnistunut.",
    memorialTypeDefault: "Muistoarkisto",
    untitledMemorial: "Rakas muisto",
    memoryKicker: "Muisto",
    storyKicker: "Elaman tarina",
    dateSeparator: "-"
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
    memoryKicker: "Memory",
    storyKicker: "Life story",
    dateSeparator: "-"
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
  sceneRoot: document.getElementById("scene-root"),
  memorialType: document.getElementById("memorial-type"),
  memorialName: document.getElementById("memorial-name"),
  memorialDates: document.getElementById("memorial-dates"),
  identityDetailsBelowName: document.getElementById("identity-details-below-name"),
  identityDetailsAboveEpitaph: document.getElementById("identity-details-above-epitaph"),
  memorialEpitaph: document.getElementById("memorial-epitaph"),
  artifactFrame: document.getElementById("artifact-frame"),
  artifactImage: document.getElementById("artifact-image"),
  memoryLayer: document.getElementById("memory-layer"),
  memoryKicker: document.getElementById("memory-kicker"),
  identityDetailsMemory: document.getElementById("identity-details-memory"),
  memoryText: document.getElementById("memory-text"),
  storyLayer: document.getElementById("story-layer"),
  storyKicker: document.getElementById("story-kicker"),
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

function buildTextBlocks(text) {
  const value = getTrimmedString(text);

  if (!value) {
    return [];
  }

  const blocks = value
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.length > 0 ? blocks : [value];
}

function isTruthyFlag(value, defaultValue = true) {
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const normalized = getTrimmedString(String(value)).toLowerCase();

  if (!normalized) {
    return defaultValue;
  }

  if (normalized === "0" || normalized === "false" || normalized === "off" || normalized === "no") {
    return false;
  }

  return true;
}

function sanitizeIdentityDetailsPosition(value) {
  const normalized = getTrimmedString(value);

  if (
    normalized === "hidden"
    || normalized === "below_name"
    || normalized === "above_epitaph"
    || normalized === "memory_section"
  ) {
    return normalized;
  }

  return "below_name";
}

function buildViewModel(data) {
  const memorialName = getTrimmedString(data.public_display_name)
    || getTrimmedString(data.memorial_name)
    || getTrimmedString(data.name)
    || t("untitledMemorial");
  const memorialType = getTrimmedString(data.memorial_type) || t("memorialTypeDefault");
  const birthDate = getTrimmedString(data.birth_date);
  const deathDate = getTrimmedString(data.death_date);
  const shortEpitaph = getTrimmedString(data.short_epitaph);
  const memoryText = getTrimmedString(data.memory_text) || getTrimmedString(data.message);
  const lifeStory = getTrimmedString(data.life_story);
  const galleryItems = parseGalleryJson(data.gallery_json);
  const explicitHero = getTrimmedString(data.hero_image_url) || getTrimmedString(data.image_url);
  const heroImageUrl = explicitHero || (galleryItems[0] ? galleryItems[0].url : "");
  const showEpitaph = isTruthyFlag(data.show_epitaph, true);
  const showMemoryText = isTruthyFlag(data.show_memory_text, true);
  const showLifeStory = isTruthyFlag(data.show_life_story, true);
  const showIdentityDetails = isTruthyFlag(data.show_identity_details, false);
  const identityDetailsText = getTrimmedString(data.identity_details_text);
  const identityDetailsPosition = sanitizeIdentityDetailsPosition(data.identity_details_position);
  const resolvedIdentityDetailsPosition = showIdentityDetails && identityDetailsText && identityDetailsPosition !== "hidden"
    ? identityDetailsPosition
    : "hidden";
  const memoryBlocks = showMemoryText ? buildTextBlocks(memoryText) : [];
  const storyBlocks = showLifeStory ? buildTextBlocks(lifeStory) : [];
  const resolvedShortEpitaph = showEpitaph ? shortEpitaph : "";

  return {
    memorialName,
    memorialType,
    dateLine: buildDateLine(birthDate, deathDate),
    shortEpitaph: resolvedShortEpitaph,
    memoryBlocks,
    storyBlocks,
    identityDetailsText,
    identityDetailsPosition: resolvedIdentityDetailsPosition,
    heroImageUrl,
    galleryCount: galleryItems.length
  };
}

function renderTextBlocks(container, blocks) {
  container.textContent = "";

  if (!Array.isArray(blocks) || blocks.length === 0) {
    return;
  }

  for (const block of blocks) {
    const p = document.createElement("p");
    p.textContent = block;
    container.appendChild(p);
  }
}

function syncSceneState(viewModel) {
  els.sceneRoot.dataset.hasImage = viewModel.heroImageUrl ? "true" : "false";
  els.sceneRoot.dataset.hasEpitaph = viewModel.shortEpitaph ? "true" : "false";
  els.sceneRoot.dataset.hasMemory = viewModel.memoryBlocks.length > 0 ? "true" : "false";
  els.sceneRoot.dataset.hasStory = viewModel.storyBlocks.length > 0 ? "true" : "false";
  els.sceneRoot.dataset.hasIdentityDetails = viewModel.identityDetailsText ? "true" : "false";
  els.sceneRoot.dataset.identityDetailsPosition = viewModel.identityDetailsPosition;
  els.sceneRoot.dataset.hasFragments = viewModel.galleryCount > 0 ? "true" : "false";
}

function clearIdentityDetails() {
  els.identityDetailsBelowName.textContent = "";
  els.identityDetailsBelowName.hidden = true;
  els.identityDetailsAboveEpitaph.textContent = "";
  els.identityDetailsAboveEpitaph.hidden = true;
  els.identityDetailsMemory.textContent = "";
  els.identityDetailsMemory.hidden = true;
}

function renderIdentityDetails(viewModel) {
  clearIdentityDetails();

  if (!viewModel.identityDetailsText || viewModel.identityDetailsPosition === "hidden") {
    return;
  }

  if (viewModel.identityDetailsPosition === "below_name") {
    els.identityDetailsBelowName.textContent = viewModel.identityDetailsText;
    els.identityDetailsBelowName.hidden = false;
    return;
  }

  if (viewModel.identityDetailsPosition === "above_epitaph") {
    els.identityDetailsAboveEpitaph.textContent = viewModel.identityDetailsText;
    els.identityDetailsAboveEpitaph.hidden = false;
    return;
  }

  if (viewModel.identityDetailsPosition === "memory_section") {
    els.identityDetailsMemory.textContent = viewModel.identityDetailsText;
    els.identityDetailsMemory.hidden = false;
  }
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
  renderIdentityDetails(viewModel);

  els.memorialEpitaph.textContent = viewModel.shortEpitaph;
  els.memorialEpitaph.hidden = !viewModel.shortEpitaph;

  renderTextBlocks(els.memoryText, viewModel.memoryBlocks);
  els.memoryLayer.hidden = viewModel.memoryBlocks.length === 0
    && !(viewModel.identityDetailsText && viewModel.identityDetailsPosition === "memory_section");

  renderTextBlocks(els.storyBody, viewModel.storyBlocks);
  els.storyLayer.hidden = viewModel.storyBlocks.length === 0;

  if (viewModel.heroImageUrl) {
    els.artifactImage.src = viewModel.heroImageUrl;
    els.artifactImage.alt = viewModel.memorialName;
    els.artifactFrame.hidden = false;
  } else {
    els.artifactImage.src = "";
    els.artifactImage.alt = "";
    els.artifactFrame.hidden = true;
  }

  syncSceneState(viewModel);
  document.title = `${viewModel.memorialName} | ${t("pageTitle")}`;
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "fi";
  els.html.lang = currentLang;
  els.langFi.classList.toggle("active", currentLang === "fi");
  els.langEn.classList.toggle("active", currentLang === "en");
  els.siteMark.textContent = t("siteMark");
  els.footerMark.textContent = t("pageTitle");
  els.memoryKicker.textContent = t("memoryKicker");
  els.storyKicker.textContent = t("storyKicker");

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
