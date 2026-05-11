function getBootstrapToken() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const parts = path.split("/");

  if (parts.length >= 3 && parts[1] === "c") {
    return parts[2];
  }

  return null;
}

function setActionStatus(message, type) {
  const el = document.getElementById("actionStatus");
  el.className = `hero-notice ${type === "error" ? "error" : "success"}`;
  el.textContent = message;
}

function setCollectionStatus(message) {
  document.getElementById("collectionStatus").textContent = message;
}

function renderCollectionMembers(items) {
  const el = document.getElementById("collectionMembers");

  if (!Array.isArray(items) || items.length === 0) {
    el.innerHTML = `<div class="muted small">No Nodes in this Collection.</div>`;
    return;
  }

  el.innerHTML = items.map((item) => {
    const primary = item.profile_name || item.public_identifier || "";
    const secondaryParts = [item.public_identifier || "", item.status || ""].filter(Boolean);
    const href = item.public_slug ? `/n/${encodeURIComponent(item.public_slug)}` : null;
    const content = `
      <div>${escapeHtml(primary)}</div>
      <div class="muted small">${escapeHtml(secondaryParts.join(" · "))}</div>
    `;

    if (href) {
      return `
        <a class="section-block" href="${escapeHtml(href)}">
          ${content}
        </a>
      `;
    }

    return `
      <div class="section-block">
        ${content}
      </div>
    `;
  }).join("");
}

function renderCollectionMembersFallback() {
  document.getElementById("collectionMembers").innerHTML = `
    <div class="muted small">Failed to load Collection members.</div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function createCollectionSession(token) {
  const res = await fetch(`/api/collection/${token}/session`, {
    method: "POST"
  });

  if (!res.ok) {
    throw new Error("Collection token invalid.");
  }
}

async function fetchCollectionAuthState() {
  const res = await fetch("/api/collection/auth-state");

  if (res.status === 401) {
    return { state: "token_required" };
  }

  if (!res.ok) {
    throw new Error("Collection session check failed.");
  }

  return res.json();
}

async function fetchCollectionNodes() {
  const res = await fetch("/api/collection/nodes");

  if (!res.ok) {
    throw new Error("Failed to load Collection members.");
  }

  return res.json();
}

async function logoutCollectionSession() {
  const res = await fetch("/api/collection/logout", {
    method: "POST"
  });

  if (!res.ok) {
    throw new Error("Collection logout failed.");
  }
}

function redirectToCollectionDashboard() {
  window.location.replace("/collection");
}

async function handleLogout() {
  try {
    await logoutCollectionSession();
    redirectToCollectionDashboard();
  } catch (error) {
    setActionStatus(error.message || "Collection logout failed.", "error");
  }
}

async function handleBootstrapRoute(token) {
  try {
    await createCollectionSession(token);
    redirectToCollectionDashboard();
  } catch (error) {
    setActionStatus(error.message || "Collection token invalid.", "error");
  }
}

async function handleCollectionDashboardRoute() {
  try {
    const authState = await fetchCollectionAuthState();

    if (authState.state !== "session_valid") {
      setActionStatus("Collection session required.", "error");
      return;
    }

    if (typeof authState.collection_name === "string" && authState.collection_name.trim() !== "") {
      document.getElementById("pageSubtitle").textContent = authState.collection_name.trim();
    }

    setCollectionStatus("Collection session active.");

    try {
      const nodes = await fetchCollectionNodes();
      renderCollectionMembers(nodes);
    } catch (error) {
      setActionStatus(error.message || "Failed to load Collection members.", "error");
      renderCollectionMembersFallback();
    }
  } catch (error) {
    setActionStatus(error.message || "Collection session check failed.", "error");
  }
}

async function init() {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  const bootstrapToken = getBootstrapToken();

  if (bootstrapToken) {
    await handleBootstrapRoute(bootstrapToken);
    return;
  }

  if (window.location.pathname.replace(/\/+$/, "") === "/collection") {
    await handleCollectionDashboardRoute();
  }
}

init();
