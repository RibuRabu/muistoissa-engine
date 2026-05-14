const i18n = {
  fi: {
    page_title: "Muistosivun hallinta",
    page_subtitle: "Muokkaa tietoja, jotka näkyvät julkisessa Muistoissa-muistosivussa.",
    editor_eyebrow: "Muistosivun hallinta",
    editor_card_title: "Muiston tiedot",
    editor_card_intro: "Näitä tietoja käytetään julkisessa muistosivussa ja mausoleuminäkymässä.",
    timeline_title: "Historia",
    timeline_intro: "Muistosivun viimeisimmät muutokset ja järjestelmätapahtumat.",
    open_public_page: "Avaa muistosivu",

    identity_section_title: "Nimi ja identiteetti",
    identity_kind_label: "Kenestä muistosivu kertoo?",
    identity_kind_human: "Ihminen",
    identity_kind_animal: "Eläin",
    identity_kind_other: "Muu",
    display_name_override_label: "Julkinen nimi käsin",
    display_name_override_hint: "Käytä tätä vain, jos haluat määrittää monoliitissa näkyvän nimen itse.",
    public_display_name_preview_label: "Monoliitissa näkyvä nimi",
    save_identity: "Tallenna nimi",
    human_identity_title: "Ihmisen tiedot",
    person_first_name_label: "Etunimi",
    person_middle_names_label: "Muut etunimet",
    person_last_name_label: "Sukunimi",
    person_nickname_label: "Kutsumanimi",
    person_honorific_label: "Arvonimi tai puhuttelu",
    person_descriptor_label: "Lisämääre",
    prefer_person_nickname_label: "Käytä kutsumanimeä etunimen sijasta",
    show_person_middle_names_label: "Näytä muut etunimet",
    show_person_last_name_label: "Näytä sukunimi",
    show_person_honorific_label: "Näytä arvonimi",
    show_person_descriptor_label: "Näytä lisämääre",
    animal_identity_title: "Eläimen tiedot",
    animal_name_label: "Nimi",
    animal_registered_name_label: "Rekisterinimi",
    animal_nickname_label: "Kutsumanimi",
    animal_species_label: "Laji",
    animal_breed_label: "Rotu",
    prefer_animal_nickname_label: "Käytä kutsumanimeä nimen sijasta",
    show_animal_registered_name_label: "Näytä rekisterinimi",
    animal_use_registered_as_main_label: "Käytä rekisterinimeä päänimenä",
    show_animal_species_label: "Näytä laji",
    show_animal_breed_label: "Näytä rotu",

    overview_section_title: "Muiston tiedot",
    birth_date_label: "Syntymäaika",
    death_date_label: "Kuolinaika",
    visibility_mode_label: "Julkaisutila",
    published_at_label: "Julkaistu",
    published_at_hint: "Voit käyttää esimerkiksi ISO-aikaleimaa tai päivämäärää tekstinä.",
    save_overview: "Tallenna tiedot",

    inscription_section_title: "Muistomerkintä",
    short_epitaph_label: "Lyhyt epitafi",
    save_inscription: "Tallenna epitafi",

    memory_section_title: "Muistoteksti",
    memory_text_label: "Muistoteksti",
    save_memory: "Tallenna muistoteksti",

    story_section_title: "Elämäntarina",
    life_story_label: "Elämäntarina",
    save_story: "Tallenna elämäntarina",

    scene_media_section_title: "Muistotilan kuva",
    scene_media_intro: "Muistotilan kuva tuo sivulle tunnelmaa. Kuvan lataus tulee seuraavassa vaiheessa.",
    scene_media_placeholder_button: "Kuvan lataus tulossa",

    pin_section_title: "Suojaus",
    current_pin_label: "Nykyinen PIN",
    new_pin_label: "Uusi PIN",
    confirm_pin_label: "Vahvista uusi PIN",
    change_pin_button: "Vaihda PIN",
    change_pin_success: "PIN vaihdettu.",
    change_pin_failed: "PIN-koodin vaihto epäonnistui",
    change_pin_mismatch: "Uusi PIN ja vahvistus eivät täsmää.",
    change_pin_invalid_format: "PIN-koodin on oltava 4-6 numeroa.",
    change_pin_invalid_current: "Nykyinen PIN on virheellinen.",

    visibility_mode_draft: "Luonnos",
    visibility_mode_private: "Yksityinen",
    visibility_mode_public: "Julkinen",
    visibility_mode_unknown: "Muu",
    published_state_empty: "Ei asetettu",

    memorial_name_fallback: "Nimeämätön muisto",
    history_empty: "Ei tapahtumia vielä.",
    timeline_show_all: "Näytä kaikki",
    timeline_hide_all: "Piilota lokit",
    timeline_filter_all: "Kaikki",

    timeline_detail_message: "Viesti",
    timeline_detail_location: "Sijainti",
    timeline_detail_name: "Lähettäjä",
    timeline_detail_contact: "Yhteystieto",

    summary_name: "Muisto",
    summary_visibility: "Julkaisutila",
    summary_published: "Julkaistu",
    summary_slug: "Osoite",

    load_owner_failed: "Muistosivun tietojen lataus epäonnistui",
    load_timeline_failed: "Historian lataus epäonnistui",
    update_failed: "Päivitys epäonnistui",
    save_success: "Tallennus onnistui.",
    missing_token: "Omistajan tunniste puuttuu",
    pin_prompt: "Syötä PIN",
    pin_required: "PIN vaaditaan.",
    pin_verify_failed: "PIN-vahvistus epäonnistui",
    session_check_failed: "Istunnon tarkistus epäonnistui",

    event_NODE_CREATED: "Muistosivu luotu",
    event_PROFILE_UPDATED: "Muiston tietoja päivitetty",
    event_STATUS_CHANGED: "Sisäinen tila muuttunut",
    event_VISIBILITY_UPDATED: "Julkaisutila päivitetty",
    event_RECOVERY_LOCATION_UPDATED: "Perustietoja päivitetty",
    event_ANONYMOUS_REPORT_CREATED: "Viesti vastaanotettu",
    event_CARRIER_REPLACED: "Tunniste vaihdettu",
    event_OWNER_TOKEN_REISSUED: "Omistajan linkki uusittu",
    event_pin_changed: "PIN vaihdettu",
    event_OWNER_PIN_RESET: "PIN nollattu",
    event_NODE_LEFT_COLLECTION: "Kokoelmayhteys poistettu",
    event_NODE_DISABLED: "Muistosivu poistettu käytöstä",

    event_desc_NODE_CREATED: "Muistosivun pohja luotiin.",
    event_desc_PROFILE_UPDATED: "Julkisia muistotietoja päivitettiin.",
    event_desc_STATUS_CHANGED: "Sisäistä tilaa päivitettiin.",
    event_desc_VISIBILITY_UPDATED: "Muistosivun julkaisutilaa päivitettiin.",
    event_desc_RECOVERY_LOCATION_UPDATED: "Vanhaa taustatietoa päivitettiin.",
    event_desc_ANONYMOUS_REPORT_CREATED: "Muistosivulle saapui viesti.",
    event_desc_CARRIER_REPLACED: "Tunnistehistoriaan kirjattiin muutos.",
    event_desc_OWNER_TOKEN_REISSUED: "Omistajan kirjautumislinkki uusittiin.",
    event_desc_pin_changed: "Omistajan PIN vaihdettiin.",
    event_desc_OWNER_PIN_RESET: "Omistajan PIN nollattiin.",
    event_desc_NODE_LEFT_COLLECTION: "Muistosivu irrotettiin aiemmasta kokoelmasta.",
    event_desc_NODE_DISABLED: "Muistosivu poistettiin käytöstä."
  },
  en: {
    page_title: "Memorial page manager",
    page_subtitle: "Edit the details shown on the public Muistoissa memorial page.",
    editor_eyebrow: "Memorial page manager",
    editor_card_title: "Memorial details",
    editor_card_intro: "These fields are used by the public memorial page and mausoleum scene.",
    timeline_title: "History",
    timeline_intro: "Recent owner and system events for this memorial.",
    open_public_page: "Open memorial",

    identity_section_title: "Name and identity",
    identity_kind_label: "Who is this memorial for?",
    identity_kind_human: "Human",
    identity_kind_animal: "Animal",
    identity_kind_other: "Other",
    display_name_override_label: "Set public name manually",
    display_name_override_hint: "Use this only if you want to define the name shown on the monolith yourself.",
    public_display_name_preview_label: "Name shown on the monolith",
    save_identity: "Save name",
    human_identity_title: "Human details",
    person_first_name_label: "First name",
    person_middle_names_label: "Middle names",
    person_last_name_label: "Last name",
    person_nickname_label: "Nickname",
    person_honorific_label: "Honorific or title",
    person_descriptor_label: "Descriptor",
    prefer_person_nickname_label: "Use nickname instead of first name",
    show_person_middle_names_label: "Show middle names",
    show_person_last_name_label: "Show last name",
    show_person_honorific_label: "Show honorific",
    show_person_descriptor_label: "Show descriptor",
    animal_identity_title: "Animal details",
    animal_name_label: "Name",
    animal_registered_name_label: "Registered name",
    animal_nickname_label: "Nickname",
    animal_species_label: "Species",
    animal_breed_label: "Breed",
    prefer_animal_nickname_label: "Use nickname instead of name",
    show_animal_registered_name_label: "Show registered name",
    animal_use_registered_as_main_label: "Use registered name as the main name",
    show_animal_species_label: "Show species",
    show_animal_breed_label: "Show breed",

    overview_section_title: "Memorial details",
    birth_date_label: "Birth date",
    death_date_label: "Death date",
    visibility_mode_label: "Publication status",
    published_at_label: "Published at",
    published_at_hint: "You can use an ISO timestamp or a plain date string.",
    save_overview: "Save details",

    inscription_section_title: "Memorial inscription",
    short_epitaph_label: "Short epitaph",
    save_inscription: "Save inscription",

    memory_section_title: "Memory text",
    memory_text_label: "Memory text",
    save_memory: "Save memory text",

    story_section_title: "Life story",
    life_story_label: "Life story",
    save_story: "Save life story",

    scene_media_section_title: "Memorial image",
    scene_media_intro: "The memorial image will shape the atmosphere of the space. Image upload will arrive in the next step.",
    scene_media_placeholder_button: "Image upload coming next",

    pin_section_title: "Security",
    current_pin_label: "Current PIN",
    new_pin_label: "New PIN",
    confirm_pin_label: "Confirm new PIN",
    change_pin_button: "Change PIN",
    change_pin_success: "PIN changed.",
    change_pin_failed: "Failed to change PIN",
    change_pin_mismatch: "New PIN and confirmation do not match.",
    change_pin_invalid_format: "PIN must be 4-6 digits.",
    change_pin_invalid_current: "Current PIN is incorrect.",

    visibility_mode_draft: "Draft",
    visibility_mode_private: "Private",
    visibility_mode_public: "Public",
    visibility_mode_unknown: "Custom",
    published_state_empty: "Not set",

    memorial_name_fallback: "Untitled memorial",
    history_empty: "No events yet.",
    timeline_show_all: "Show all",
    timeline_hide_all: "Hide logs",
    timeline_filter_all: "All",

    timeline_detail_message: "Message",
    timeline_detail_location: "Location",
    timeline_detail_name: "Sender",
    timeline_detail_contact: "Contact",

    summary_name: "Memorial",
    summary_visibility: "Publication",
    summary_published: "Published",
    summary_slug: "Address",

    load_owner_failed: "Failed to load memorial data",
    load_timeline_failed: "Failed to load history",
    update_failed: "Update failed",
    save_success: "Saved successfully.",
    missing_token: "Missing owner token",
    pin_prompt: "Enter PIN",
    pin_required: "PIN required.",
    pin_verify_failed: "PIN verification failed",
    session_check_failed: "Session check failed",

    event_NODE_CREATED: "Memorial created",
    event_PROFILE_UPDATED: "Memorial details updated",
    event_STATUS_CHANGED: "Internal status changed",
    event_VISIBILITY_UPDATED: "Publication updated",
    event_RECOVERY_LOCATION_UPDATED: "Legacy details updated",
    event_ANONYMOUS_REPORT_CREATED: "Message received",
    event_CARRIER_REPLACED: "Carrier replaced",
    event_OWNER_TOKEN_REISSUED: "Owner link reissued",
    event_pin_changed: "PIN changed",
    event_OWNER_PIN_RESET: "PIN reset",
    event_NODE_LEFT_COLLECTION: "Collection removed",
    event_NODE_DISABLED: "Memorial disabled",

    event_desc_NODE_CREATED: "The memorial record was created.",
    event_desc_PROFILE_UPDATED: "Public memorial details were updated.",
    event_desc_STATUS_CHANGED: "The internal status was updated.",
    event_desc_VISIBILITY_UPDATED: "The memorial publication status was updated.",
    event_desc_RECOVERY_LOCATION_UPDATED: "A legacy field was updated.",
    event_desc_ANONYMOUS_REPORT_CREATED: "A message was received.",
    event_desc_CARRIER_REPLACED: "A carrier change was recorded.",
    event_desc_OWNER_TOKEN_REISSUED: "The owner access link was reissued.",
    event_desc_pin_changed: "The owner PIN was changed.",
    event_desc_OWNER_PIN_RESET: "The owner PIN was reset.",
    event_desc_NODE_LEFT_COLLECTION: "The node left its collection.",
    event_desc_NODE_DISABLED: "The memorial was disabled."
  }
};

let currentLang = "fi";
let bootstrapToken = null;
let currentNode = null;
let currentEvents = [];
let timelineExpanded = false;
let selectedTimelineMonth = "all";
let ownerSessionActive = false;

function getBootstrapToken() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const parts = path.split("/");

  if (parts.length >= 3 && parts[1] === "o") {
    return parts[2];
  }

  return null;
}

function hasBootstrapToken() {
  return typeof bootstrapToken === "string" && bootstrapToken.trim() !== "";
}

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");

  if (lang === "en") return "en";
  if (lang === "fi") return "fi";

  return "fi";
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "fi";

  const url = new URL(window.location.href);
  url.searchParams.set("lang", currentLang);
  window.history.replaceState({}, "", url.toString());

  renderStaticTexts();
  renderNode();
  renderTimeline();
  updateLanguageButtons();
}

function updateLanguageButtons() {
  document.getElementById("langFi").classList.toggle("active", currentLang === "fi");
  document.getElementById("langEn").classList.toggle("active", currentLang === "en");
}

function t(key) {
  return i18n[currentLang][key] || key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTrimmedString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function formatVisibilityMode(value) {
  const normalized = getTrimmedString(value).toLowerCase();

  if (normalized === "draft") return t("visibility_mode_draft");
  if (normalized === "private") return t("visibility_mode_private");
  if (normalized === "public") return t("visibility_mode_public");
  if (!normalized) return t("visibility_mode_draft");

  return `${t("visibility_mode_unknown")}: ${normalized}`;
}

function formatPublishedAt(value) {
  const text = getTrimmedString(value);
  return text || t("published_state_empty");
}

function translateEventType(type) {
  return t(`event_${type}`) || type || "";
}

function getTimelineEventDescription(event) {
  if (!event || !event.event_type) {
    return "";
  }

  return t(`event_desc_${event.event_type}`) || "";
}

function getTimelineEventDetailRows(event) {
  if (event?.event_type !== "ANONYMOUS_REPORT_CREATED") {
    return "";
  }

  const payload = event && event.payload && typeof event.payload === "object"
    ? event.payload
    : null;
  const message = getTrimmedString(payload?.message || "");
  const location = getTrimmedString(payload?.location || "");
  const senderName = getTrimmedString(payload?.finder_name || "");
  const senderContact = getTrimmedString(payload?.finder_contact || "");
  const rows = [];

  if (message) {
    rows.push(`
      <div class="event-payload">
        <strong>${escapeHtml(t("timeline_detail_message"))}:</strong> ${escapeHtml(message)}
      </div>
    `);
  }

  if (location) {
    rows.push(`
      <div class="event-payload">
        <strong>${escapeHtml(t("timeline_detail_location"))}:</strong> ${escapeHtml(location)}
      </div>
    `);
  }

  if (senderName) {
    rows.push(`
      <div class="event-payload">
        <strong>${escapeHtml(t("timeline_detail_name"))}:</strong> ${escapeHtml(senderName)}
      </div>
    `);
  }

  if (senderContact) {
    rows.push(`
      <div class="event-payload">
        <strong>${escapeHtml(t("timeline_detail_contact"))}:</strong> ${escapeHtml(senderContact)}
      </div>
    `);
  }

  return rows.join("");
}

function getTimelineMonthKey(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "unknown";
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatTimelineMonthLabel(monthKey) {
  if (monthKey === "unknown") {
    return monthKey;
  }

  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, (month || 1) - 1, 1);

  return date.toLocaleDateString(currentLang === "fi" ? "fi-FI" : "en-US", {
    month: "long",
    year: "numeric"
  });
}

function getTimelineMonthOptions() {
  const months = [];
  const seen = new Set();

  for (const event of currentEvents) {
    const monthKey = getTimelineMonthKey(event.created_at);

    if (seen.has(monthKey)) {
      continue;
    }

    seen.add(monthKey);
    months.push(monthKey);
  }

  return months;
}

function updatePublicPageButton() {
  const link = document.getElementById("openPublicPageButton");

  if (!currentNode || !currentNode.public_slug) {
    link.href = "#";
    link.classList.add("disabled");
    return;
  }

  link.href = `/n/${encodeURIComponent(currentNode.public_slug)}`;
  link.classList.remove("disabled");
  link.textContent = t("open_public_page");
}

function renderStaticTexts() {
  document.documentElement.lang = currentLang;

  document.getElementById("pageTitle").textContent = t("page_title");
  document.getElementById("pageSubtitle").textContent = t("page_subtitle");
  document.getElementById("editorEyebrow").textContent = t("editor_eyebrow");
  document.getElementById("editorCardTitle").textContent = t("editor_card_title");
  document.getElementById("editorCardIntro").textContent = t("editor_card_intro");
  document.getElementById("timelineTitle").textContent = t("timeline_title");
  document.getElementById("timelineIntro").textContent = t("timeline_intro");
  document.getElementById("openPublicPageButton").textContent = t("open_public_page");

  document.getElementById("identitySectionTitle").textContent = t("identity_section_title");
  document.getElementById("identityKindLabel").textContent = t("identity_kind_label");
  document.getElementById("displayNameOverrideLabel").textContent = t("display_name_override_label");
  document.getElementById("displayNameOverrideHint").textContent = t("display_name_override_hint");
  document.getElementById("publicDisplayNamePreviewLabel").textContent = t("public_display_name_preview_label");
  document.getElementById("saveIdentityButton").textContent = t("save_identity");
  document.getElementById("humanIdentityTitle").textContent = t("human_identity_title");
  document.getElementById("personFirstNameLabel").textContent = t("person_first_name_label");
  document.getElementById("personMiddleNamesLabel").textContent = t("person_middle_names_label");
  document.getElementById("personLastNameLabel").textContent = t("person_last_name_label");
  document.getElementById("personNicknameLabel").textContent = t("person_nickname_label");
  document.getElementById("personHonorificLabel").textContent = t("person_honorific_label");
  document.getElementById("personDescriptorLabel").textContent = t("person_descriptor_label");
  document.getElementById("preferPersonNicknameLabel").textContent = t("prefer_person_nickname_label");
  document.getElementById("showPersonMiddleNamesLabel").textContent = t("show_person_middle_names_label");
  document.getElementById("showPersonLastNameLabel").textContent = t("show_person_last_name_label");
  document.getElementById("showPersonHonorificLabel").textContent = t("show_person_honorific_label");
  document.getElementById("showPersonDescriptorLabel").textContent = t("show_person_descriptor_label");
  document.getElementById("animalIdentityTitle").textContent = t("animal_identity_title");
  document.getElementById("animalNameLabel").textContent = t("animal_name_label");
  document.getElementById("animalRegisteredNameLabel").textContent = t("animal_registered_name_label");
  document.getElementById("animalNicknameLabel").textContent = t("animal_nickname_label");
  document.getElementById("animalSpeciesLabel").textContent = t("animal_species_label");
  document.getElementById("animalBreedLabel").textContent = t("animal_breed_label");
  document.getElementById("preferAnimalNicknameLabel").textContent = t("prefer_animal_nickname_label");
  document.getElementById("showAnimalRegisteredNameLabel").textContent = t("show_animal_registered_name_label");
  document.getElementById("animalUseRegisteredAsMainLabel").textContent = t("animal_use_registered_as_main_label");
  document.getElementById("showAnimalSpeciesLabel").textContent = t("show_animal_species_label");
  document.getElementById("showAnimalBreedLabel").textContent = t("show_animal_breed_label");

  document.getElementById("overviewSectionTitle").textContent = t("overview_section_title");
  document.getElementById("birthDateLabel").textContent = t("birth_date_label");
  document.getElementById("deathDateLabel").textContent = t("death_date_label");
  document.getElementById("visibilityModeLabel").textContent = t("visibility_mode_label");
  document.getElementById("publishedAtLabel").textContent = t("published_at_label");
  document.getElementById("publishedAtHint").textContent = t("published_at_hint");
  document.getElementById("saveOverviewButton").textContent = t("save_overview");

  document.getElementById("inscriptionSectionTitle").textContent = t("inscription_section_title");
  document.getElementById("shortEpitaphLabel").textContent = t("short_epitaph_label");
  document.getElementById("saveInscriptionButton").textContent = t("save_inscription");

  document.getElementById("memorySectionTitle").textContent = t("memory_section_title");
  document.getElementById("memoryTextLabel").textContent = t("memory_text_label");
  document.getElementById("saveMemoryButton").textContent = t("save_memory");

  document.getElementById("storySectionTitle").textContent = t("story_section_title");
  document.getElementById("lifeStoryLabel").textContent = t("life_story_label");
  document.getElementById("saveStoryButton").textContent = t("save_story");

  document.getElementById("sceneMediaSectionTitle").textContent = t("scene_media_section_title");
  document.getElementById("sceneMediaIntro").textContent = t("scene_media_intro");
  document.getElementById("sceneMediaPlaceholderButton").textContent = t("scene_media_placeholder_button");

  document.getElementById("pinSectionTitle").textContent = t("pin_section_title");
  document.getElementById("currentPinLabel").textContent = t("current_pin_label");
  document.getElementById("newPinLabel").textContent = t("new_pin_label");
  document.getElementById("confirmPinLabel").textContent = t("confirm_pin_label");
  document.getElementById("changePinButton").textContent = t("change_pin_button");

  const identityKind = document.getElementById("identityKind");
  identityKind.options[0].text = t("identity_kind_human");
  identityKind.options[1].text = t("identity_kind_animal");
  identityKind.options[2].text = t("identity_kind_other");

  const visibilityMode = document.getElementById("visibilityMode");
  visibilityMode.options[0].text = t("visibility_mode_draft");
  visibilityMode.options[1].text = t("visibility_mode_private");
  visibilityMode.options[2].text = t("visibility_mode_public");

  updatePublicPageButton();
}

function getCurrentIdentityKind() {
  return getTrimmedString(document.getElementById("identityKind").value || "other") || "other";
}

function toggleIdentityGroups() {
  const identityKind = getCurrentIdentityKind();
  document.getElementById("humanIdentityFields").hidden = identityKind !== "human";
  document.getElementById("animalIdentityFields").hidden = identityKind !== "animal";

  const animalUseRegisteredAsMain = document.getElementById("animalUseRegisteredAsMain");
  const showAnimalRegisteredName = document.getElementById("showAnimalRegisteredName");

  if (!showAnimalRegisteredName.checked) {
    animalUseRegisteredAsMain.checked = false;
  }

  animalUseRegisteredAsMain.disabled = identityKind !== "animal" || !showAnimalRegisteredName.checked;
}

function derivePublicDisplayNameFromForm() {
  const override = getTrimmedString(document.getElementById("displayNameOverride").value);

  if (override) {
    return override;
  }

  const identityKind = getCurrentIdentityKind();

  if (identityKind === "human") {
    const firstName = getTrimmedString(document.getElementById("personFirstName").value);
    const middleNames = document.getElementById("showPersonMiddleNames").checked
      ? getTrimmedString(document.getElementById("personMiddleNames").value)
      : "";
    const lastName = document.getElementById("showPersonLastName").checked
      ? getTrimmedString(document.getElementById("personLastName").value)
      : "";
    const nickname = getTrimmedString(document.getElementById("personNickname").value);
    const honorific = document.getElementById("showPersonHonorific").checked
      ? getTrimmedString(document.getElementById("personHonorific").value)
      : "";
    const useNickname = document.getElementById("preferPersonNickname").checked && nickname;
    const baseName = useNickname ? nickname : (firstName || nickname);
    const parts = [honorific, baseName, middleNames, lastName].filter(Boolean);

    return parts.join(" ").trim();
  }

  if (identityKind === "animal") {
    const nickname = getTrimmedString(document.getElementById("animalNickname").value);
    const animalName = getTrimmedString(document.getElementById("animalName").value);
    const registeredName = getTrimmedString(document.getElementById("animalRegisteredName").value);
    const useRegistered = document.getElementById("animalUseRegisteredAsMain").checked
      && document.getElementById("showAnimalRegisteredName").checked
      && registeredName;

    if (useRegistered) {
      return registeredName;
    }

    const useNickname = document.getElementById("preferAnimalNickname").checked && nickname;
    return (useNickname ? nickname : (animalName || nickname || registeredName)).trim();
  }

  return getTrimmedString(document.getElementById("memorialName").value);
}

function syncCompatibilityFields() {
  const identityKind = getCurrentIdentityKind();
  const preview = derivePublicDisplayNameFromForm();
  const currentLegacyName = getTrimmedString(document.getElementById("memorialName").value);
  const resolvedLegacyName = preview || currentLegacyName || getTrimmedString(currentNode?.memorial_name || "");
  const publicNameMode = identityKind === "animal" && document.getElementById("animalUseRegisteredAsMain").checked
    ? "registered"
    : "default";

  document.getElementById("publicDisplayNamePreview").value = preview || "";
  document.getElementById("memorialName").value = resolvedLegacyName;
  document.getElementById("publicNameMode").value = publicNameMode;
}

function updateIdentityUi() {
  toggleIdentityGroups();
  syncCompatibilityFields();
}

function renderHeroSummary() {
  if (!currentNode) {
    return;
  }

  const memorialName = getTrimmedString(currentNode.public_display_name)
    || getTrimmedString(currentNode.memorial_name)
    || t("memorial_name_fallback");
  const heroSummary = document.getElementById("heroSummary");

  heroSummary.innerHTML = `
    <div class="hero-chip">
      <div class="hero-chip-label">${escapeHtml(t("summary_name"))}</div>
      <div class="hero-chip-value">${escapeHtml(memorialName)}</div>
    </div>
    <div class="hero-chip">
      <div class="hero-chip-label">${escapeHtml(t("summary_visibility"))}</div>
      <div class="hero-chip-value">${escapeHtml(formatVisibilityMode(currentNode.visibility_mode))}</div>
    </div>
    <div class="hero-chip">
      <div class="hero-chip-label">${escapeHtml(t("summary_published"))}</div>
      <div class="hero-chip-value">${escapeHtml(formatPublishedAt(currentNode.published_at))}</div>
    </div>
    <div class="hero-chip">
      <div class="hero-chip-label">${escapeHtml(t("summary_slug"))}</div>
      <div class="hero-chip-value">${escapeHtml(currentNode.public_slug || "-")}</div>
    </div>
  `;
}

function renderNode() {
  if (!currentNode) {
    return;
  }

  renderHeroSummary();
  updatePublicPageButton();

  document.getElementById("identityKind").value = getTrimmedString(currentNode.identity_kind || "other") || "other";
  document.getElementById("displayNameOverride").value = currentNode.display_name_override ?? "";
  document.getElementById("memorialName").value = currentNode.memorial_name ?? "";
  document.getElementById("memorialType").value = currentNode.memorial_type ?? "";
  document.getElementById("publicNameMode").value = currentNode.public_name_mode ?? "default";

  document.getElementById("personFirstName").value = currentNode.person_first_name ?? "";
  document.getElementById("personMiddleNames").value = currentNode.person_middle_names ?? "";
  document.getElementById("personLastName").value = currentNode.person_last_name ?? "";
  document.getElementById("personNickname").value = currentNode.person_nickname ?? "";
  document.getElementById("personHonorific").value = currentNode.person_honorific ?? "";
  document.getElementById("personDescriptor").value = currentNode.person_descriptor ?? "";
  document.getElementById("preferPersonNickname").checked = Boolean(currentNode.prefer_person_nickname);
  document.getElementById("showPersonMiddleNames").checked = Boolean(currentNode.show_person_middle_names);
  document.getElementById("showPersonLastName").checked = Boolean(currentNode.show_person_last_name);
  document.getElementById("showPersonHonorific").checked = Boolean(currentNode.show_person_honorific);
  document.getElementById("showPersonDescriptor").checked = Boolean(currentNode.show_person_descriptor);

  document.getElementById("animalName").value = currentNode.animal_name ?? "";
  document.getElementById("animalRegisteredName").value = currentNode.animal_registered_name ?? "";
  document.getElementById("animalNickname").value = currentNode.animal_nickname ?? "";
  document.getElementById("animalSpecies").value = currentNode.animal_species ?? "";
  document.getElementById("animalBreed").value = currentNode.animal_breed ?? "";
  document.getElementById("preferAnimalNickname").checked = Boolean(currentNode.prefer_animal_nickname);
  document.getElementById("showAnimalRegisteredName").checked = Boolean(currentNode.show_animal_registered_name);
  document.getElementById("animalUseRegisteredAsMain").checked = getTrimmedString(currentNode.public_name_mode) === "registered";
  document.getElementById("showAnimalSpecies").checked = Boolean(currentNode.show_animal_species);
  document.getElementById("showAnimalBreed").checked = Boolean(currentNode.show_animal_breed);

  document.getElementById("birthDate").value = currentNode.birth_date ?? "";
  document.getElementById("deathDate").value = currentNode.death_date ?? "";
  document.getElementById("visibilityMode").value = getTrimmedString(currentNode.visibility_mode || "draft") || "draft";
  document.getElementById("publishedAt").value = currentNode.published_at ?? "";
  document.getElementById("shortEpitaph").value = currentNode.short_epitaph ?? "";
  document.getElementById("memoryText").value = currentNode.memory_text ?? "";
  document.getElementById("lifeStory").value = currentNode.life_story ?? "";
  document.getElementById("heroImageUrl").value = currentNode.hero_image_url ?? "";
  document.getElementById("galleryJson").value = currentNode.gallery_json ?? "";

  updateIdentityUi();

  if (getTrimmedString(currentNode.public_display_name)) {
    document.getElementById("publicDisplayNamePreview").value = currentNode.public_display_name;
    if (!getTrimmedString(document.getElementById("displayNameOverride").value)) {
      document.getElementById("memorialName").value = currentNode.public_display_name;
    }
  }
}

function renderTimeline() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  if (!currentEvents.length) {
    timeline.innerHTML = `<div class="muted">${escapeHtml(t("history_empty"))}</div>`;
    return;
  }

  const monthOptions = getTimelineMonthOptions();

  if (selectedTimelineMonth !== "all" && !monthOptions.includes(selectedTimelineMonth)) {
    selectedTimelineMonth = "all";
  }

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "secondary-button";
  toggleButton.textContent = timelineExpanded ? t("timeline_hide_all") : t("timeline_show_all");
  toggleButton.addEventListener("click", () => {
    timelineExpanded = !timelineExpanded;

    if (!timelineExpanded) {
      selectedTimelineMonth = "all";
    }

    renderTimeline();
  });

  if (timelineExpanded || currentEvents.length > 3) {
    const controls = document.createElement("div");
    controls.className = "button-row";

    if (timelineExpanded) {
      const monthSelect = document.createElement("select");

      const allOption = document.createElement("option");
      allOption.value = "all";
      allOption.textContent = t("timeline_filter_all");
      monthSelect.appendChild(allOption);

      for (const monthKey of monthOptions) {
        const option = document.createElement("option");
        option.value = monthKey;
        option.textContent = formatTimelineMonthLabel(monthKey);
        monthSelect.appendChild(option);
      }

      monthSelect.value = selectedTimelineMonth;
      monthSelect.addEventListener("change", (event) => {
        selectedTimelineMonth = event.target.value || "all";
        renderTimeline();
      });
      controls.appendChild(monthSelect);
    }

    controls.appendChild(toggleButton);
    timeline.appendChild(controls);
  }

  const visibleEvents = currentEvents.filter((event) => (
    selectedTimelineMonth === "all" || getTimelineMonthKey(event.created_at) === selectedTimelineMonth
  ));
  const eventsToRender = timelineExpanded ? visibleEvents : visibleEvents.slice(0, 3);

  for (const event of eventsToRender) {
    const wrapper = document.createElement("div");
    wrapper.className = "event";
    const description = getTimelineEventDescription(event);
    const detailRows = getTimelineEventDetailRows(event);
    const timestamp = new Date(event.created_at);
    const formattedTime = Number.isNaN(timestamp.getTime())
      ? (event.created_at || "")
      : timestamp.toLocaleString(currentLang === "fi" ? "fi-FI" : "en-US");

    wrapper.innerHTML = `
      <div class="event-type">${escapeHtml(translateEventType(event.event_type))}</div>
      <div class="event-time">${escapeHtml(formattedTime)}</div>
      ${description ? `<div class="event-payload">${escapeHtml(description)}</div>` : ""}
      ${detailRows}
    `;

    timeline.appendChild(wrapper);
  }
}

async function fetchOwnerNode() {
  const res = await fetch("/api/owner");

  if (!res.ok) {
    throw new Error(t("load_owner_failed"));
  }

  currentNode = await res.json();
}

async function fetchTimeline() {
  const endpoint = !ownerSessionActive && hasBootstrapToken()
    ? `/api/owner/${bootstrapToken}/events`
    : "/api/owner/events";
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(t("load_timeline_failed"));
  }

  const data = await res.json();
  currentEvents = data.events || [];
}

async function refreshAll() {
  await fetchOwnerNode();
  await fetchTimeline();
  renderNode();
  renderTimeline();
}

function setActionStatus(message, type) {
  const el = document.getElementById("actionStatus");
  el.className = `hero-notice ${type === "error" ? "error" : "success"}`;
  el.textContent = message;
}

function clearActionStatus() {
  const el = document.getElementById("actionStatus");
  el.className = "hero-notice";
  el.textContent = "";
}

function setPinStatus(message, type) {
  const el = document.getElementById("pinStatus");
  el.className = type === "error" ? "small error" : "small";
  el.textContent = message;
}

function clearPinStatus() {
  const el = document.getElementById("pinStatus");
  el.className = "muted small";
  el.textContent = "";
}

async function postOwnerUpdate(payload) {
  const endpoint = !ownerSessionActive && hasBootstrapToken() ? `/api/owner/${bootstrapToken}` : "/api/owner";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || t("update_failed"));
  }

  currentNode = await res.json();
  await fetchTimeline();
  renderNode();
  renderTimeline();
  setActionStatus(t("save_success"), "success");
}

async function handleSaveIdentity() {
  clearActionStatus();
  syncCompatibilityFields();

  try {
    await postOwnerUpdate({
      memorial_name: document.getElementById("memorialName").value,
      memorial_type: document.getElementById("memorialType").value,
      identity_kind: document.getElementById("identityKind").value,
      display_name_override: document.getElementById("displayNameOverride").value,
      public_name_mode: document.getElementById("publicNameMode").value,
      person_first_name: document.getElementById("personFirstName").value,
      person_middle_names: document.getElementById("personMiddleNames").value,
      person_last_name: document.getElementById("personLastName").value,
      person_nickname: document.getElementById("personNickname").value,
      person_honorific: document.getElementById("personHonorific").value,
      person_descriptor: document.getElementById("personDescriptor").value,
      show_person_middle_names: document.getElementById("showPersonMiddleNames").checked ? 1 : 0,
      show_person_last_name: document.getElementById("showPersonLastName").checked ? 1 : 0,
      show_person_honorific: document.getElementById("showPersonHonorific").checked ? 1 : 0,
      show_person_descriptor: document.getElementById("showPersonDescriptor").checked ? 1 : 0,
      prefer_person_nickname: document.getElementById("preferPersonNickname").checked ? 1 : 0,
      animal_name: document.getElementById("animalName").value,
      animal_registered_name: document.getElementById("animalRegisteredName").value,
      animal_nickname: document.getElementById("animalNickname").value,
      animal_species: document.getElementById("animalSpecies").value,
      animal_breed: document.getElementById("animalBreed").value,
      show_animal_registered_name: document.getElementById("showAnimalRegisteredName").checked ? 1 : 0,
      show_animal_species: document.getElementById("showAnimalSpecies").checked ? 1 : 0,
      show_animal_breed: document.getElementById("showAnimalBreed").checked ? 1 : 0,
      prefer_animal_nickname: document.getElementById("preferAnimalNickname").checked ? 1 : 0
    });
  } catch (error) {
    setActionStatus(error.message || t("update_failed"), "error");
  }
}

async function handleSaveOverview() {
  clearActionStatus();

  try {
    await postOwnerUpdate({
      birth_date: document.getElementById("birthDate").value,
      death_date: document.getElementById("deathDate").value,
      visibility_mode: document.getElementById("visibilityMode").value,
      published_at: document.getElementById("publishedAt").value
    });
  } catch (error) {
    setActionStatus(error.message || t("update_failed"), "error");
  }
}

async function handleSaveInscription() {
  clearActionStatus();

  try {
    await postOwnerUpdate({
      short_epitaph: document.getElementById("shortEpitaph").value
    });
  } catch (error) {
    setActionStatus(error.message || t("update_failed"), "error");
  }
}

async function handleSaveMemory() {
  clearActionStatus();

  try {
    await postOwnerUpdate({
      memory_text: document.getElementById("memoryText").value
    });
  } catch (error) {
    setActionStatus(error.message || t("update_failed"), "error");
  }
}

async function handleSaveStory() {
  clearActionStatus();

  try {
    await postOwnerUpdate({
      life_story: document.getElementById("lifeStory").value
    });
  } catch (error) {
    setActionStatus(error.message || t("update_failed"), "error");
  }
}

async function handleChangePin() {
  clearPinStatus();

  const currentPin = document.getElementById("currentPinInput").value.trim();
  const newPin = document.getElementById("newPinInput").value.trim();
  const confirmPin = document.getElementById("confirmPinInput").value.trim();

  if (!/^\d{4,6}$/.test(newPin)) {
    setPinStatus(t("change_pin_invalid_format"), "error");
    return;
  }

  if (newPin !== confirmPin) {
    setPinStatus(t("change_pin_mismatch"), "error");
    return;
  }

  try {
    const res = await fetch("/api/owner/change-pin", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ currentPin, newPin })
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 401 && data?.error === "invalid_current_pin") {
        throw new Error(t("change_pin_invalid_current"));
      }

      if (res.status === 400 && data?.error === "invalid_pin_format") {
        throw new Error(t("change_pin_invalid_format"));
      }

      throw new Error(t("change_pin_failed"));
    }

    document.getElementById("currentPinInput").value = "";
    document.getElementById("newPinInput").value = "";
    document.getElementById("confirmPinInput").value = "";
    setPinStatus(t("change_pin_success"), "success");
  } catch (error) {
    setPinStatus(error.message || t("change_pin_failed"), "error");
  }
}

function bindIdentityEvents() {
  const identityInputIds = [
    "identityKind",
    "displayNameOverride",
    "personFirstName",
    "personMiddleNames",
    "personLastName",
    "personNickname",
    "personHonorific",
    "personDescriptor",
    "preferPersonNickname",
    "showPersonMiddleNames",
    "showPersonLastName",
    "showPersonHonorific",
    "showPersonDescriptor",
    "animalName",
    "animalRegisteredName",
    "animalNickname",
    "animalSpecies",
    "animalBreed",
    "preferAnimalNickname",
    "showAnimalRegisteredName",
    "animalUseRegisteredAsMain",
    "showAnimalSpecies",
    "showAnimalBreed"
  ];

  for (const id of identityInputIds) {
    const element = document.getElementById(id);
    const eventName = element.type === "checkbox" || element.tagName === "SELECT" ? "change" : "input";
    element.addEventListener(eventName, updateIdentityUi);
  }

  document.getElementById("showAnimalRegisteredName").addEventListener("change", () => {
    if (!document.getElementById("showAnimalRegisteredName").checked) {
      document.getElementById("animalUseRegisteredAsMain").checked = false;
    }
    updateIdentityUi();
  });
}

function bindEvents() {
  document.getElementById("langFi").addEventListener("click", () => setLanguage("fi"));
  document.getElementById("langEn").addEventListener("click", () => setLanguage("en"));

  document.getElementById("saveIdentityButton").addEventListener("click", handleSaveIdentity);
  document.getElementById("saveOverviewButton").addEventListener("click", handleSaveOverview);
  document.getElementById("saveInscriptionButton").addEventListener("click", handleSaveInscription);
  document.getElementById("saveMemoryButton").addEventListener("click", handleSaveMemory);
  document.getElementById("saveStoryButton").addEventListener("click", handleSaveStory);
  document.getElementById("changePinButton").addEventListener("click", handleChangePin);

  bindIdentityEvents();
}

async function fetchOwnerAuthState() {
  if (bootstrapToken) {
    const res = await fetch(`/api/owner/${bootstrapToken}/auth-state`);

    if (!res.ok) {
      throw new Error(t("session_check_failed"));
    }

    return res.json();
  }

  const res = await fetch("/api/owner/auth-state");

  if (res.status === 401) {
    return { state: "pin_required" };
  }

  if (!res.ok) {
    throw new Error(t("session_check_failed"));
  }

  return res.json();
}

async function verifyBootstrapPin(pin) {
  if (!bootstrapToken) {
    throw new Error(t("missing_token"));
  }

  const res = await fetch(`/api/owner/${bootstrapToken}/verify-pin`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ pin })
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data || data.state !== "session_valid") {
    throw new Error(t("pin_verify_failed"));
  }

  ownerSessionActive = true;
}

async function setupBootstrapPin(pin) {
  if (!bootstrapToken) {
    throw new Error(t("missing_token"));
  }

  const res = await fetch(`/api/owner/${bootstrapToken}/set-pin`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ pin })
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data) {
    throw new Error(t("pin_verify_failed"));
  }
}

function redirectToOwnerDashboard() {
  const url = new URL("/owner", window.location.origin);
  url.searchParams.set("lang", currentLang);
  window.location.replace(url.toString());
}

async function handlePinRequired(state) {
  if (!bootstrapToken) {
    document.body.innerHTML = `<p class="error">${escapeHtml(t("pin_required"))}</p>`;
    return;
  }

  const pin = window.prompt(t("pin_prompt"));

  if (!pin) {
    document.body.innerHTML = `<p class="error">${escapeHtml(t("pin_required"))}</p>`;
    return;
  }

  if (state === "pin_not_set") {
    await setupBootstrapPin(pin);
  }

  await verifyBootstrapPin(pin);
  redirectToOwnerDashboard();
}

async function init() {
  bootstrapToken = getBootstrapToken();
  currentLang = getLanguage();

  renderStaticTexts();
  updateLanguageButtons();
  bindEvents();

  try {
    const authState = await fetchOwnerAuthState();

    if (authState.state === "session_valid") {
      ownerSessionActive = true;
      await refreshAll();
      return;
    }

    if (authState.state === "pin_not_set" || authState.state === "pin_required") {
      await handlePinRequired(authState.state);
      return;
    }

    document.body.innerHTML = `<p class="error">${escapeHtml(t("session_check_failed"))}</p>`;
  } catch (error) {
    document.body.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
  }
}

init();
