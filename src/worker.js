export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "GET" && path === "/public") {
      const slug = (url.searchParams.get("slug") || "").trim();

      if (slug) {
        const redirectUrl = new URL(`/m/${encodeURIComponent(slug)}`, request.url);
        return Response.redirect(redirectUrl.toString(), 302);
      }
    }

    if (request.method === "GET" && path.startsWith("/images/")) {
      return serveNodeImage(request, env, path);
    }

    if (request.method === "GET" && path.startsWith("/n/")) {
      return servePublicPage(request, env);
    }

    if (request.method === "GET" && path.startsWith("/m/")) {
      return servePublicPage(request, env);
    }

    if (request.method === "GET" && path === "/owner") {
      return serveOwnerPage(request, env);
    }

    if (request.method === "GET" && path.startsWith("/o/")) {
      const token = getOwnerPathToken(path);
      return serveOwnerBootstrapPage(request, env, token);
    }

    if (request.method === "GET" && path === "/collection") {
      return serveCollectionPage(request, env);
    }

    if (request.method === "GET" && path.startsWith("/c/")) {
      const token = getCollectionPathToken(path);
      return serveCollectionBootstrapPage(request, env, token);
    }

    if (request.method === "POST" && path === "/api/provision") {
      return provisionNode(request, env);
    }

    if (request.method === "POST" && path === "/api/admin/reissue-owner") {
      return reissueOwnerToken(request, env);
    }

    if (request.method === "POST" && path === "/api/admin/reset-pin") {
      return resetOwnerPin(request, env);
    }

    if (request.method === "POST" && path === "/api/admin/disable-node") {
      return disableAdminNode(request, env);
    }

    if (request.method === "GET" && path === "/api/admin/nodes") {
      return listAdminNodes(request, env);
    }

    if (request.method === "GET" && path === "/api/admin/overview") {
      return getAdminOverview(request, env);
    }

    if (request.method === "GET" && path === "/api/admin/collections") {
      return listAdminCollections(request, env);
    }

    if (request.method === "GET" && path === "/api/admin/recent-activity") {
      return getAdminRecentActivity(request, env);
    }

    if (request.method === "GET") {
      const adminCollectionParts = path.split("/").filter(Boolean);

      if (
        adminCollectionParts.length === 5 &&
        adminCollectionParts[0] === "api" &&
        adminCollectionParts[1] === "admin" &&
        adminCollectionParts[2] === "collection" &&
        adminCollectionParts[4] === "nodes"
      ) {
        const collectionId = adminCollectionParts[3];
        return getAdminCollectionNodes(request, env, collectionId);
      }
    }

    if (request.method === "GET" && path.startsWith("/api/admin/node/") && path.endsWith("/events")) {
      const slug = path.split("/").slice(-2, -1)[0];
      return getAdminNodeEvents(request, env, slug);
    }

    if (request.method === "GET" && path.startsWith("/api/admin/node/")) {
      const slug = path.split("/").pop();
      return getAdminNodeInspector(request, env, slug);
    }

    if (request.method === "GET" && path.startsWith("/api/public/")) {
      const slug = path.split("/").pop();
      return getPublicNode(env, slug);
    }

    if (
      request.method === "POST" &&
      path.startsWith("/api/collection/") &&
      path.endsWith("/session")
    ) {
      const token = getCollectionRouteToken(path);
      return createCollectionSession(request, env, token);
    }

    if (
      request.method === "GET" &&
      path === "/api/collection/auth-state"
    ) {
      return getCollectionSessionAuthState(request, env);
    }

    if (
      request.method === "GET" &&
      path === "/api/collection/nodes"
    ) {
      return getCollectionNodesFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/collection/logout"
    ) {
      return logoutCollectionSession();
    }

    if (
      request.method === "POST" &&
      path.startsWith("/api/owner/") &&
      path.endsWith("/set-pin")
    ) {
      const token = getOwnerRouteToken(path);
      return setOwnerPin(request, env, token);
    }

    if (
      request.method === "POST" &&
      path.startsWith("/api/owner/") &&
      path.endsWith("/verify-pin")
    ) {
      const token = getOwnerRouteToken(path);
      return postOwnerVerifyPin(request, env, token);
    }

    if (
      request.method === "POST" &&
      path.startsWith("/api/owner/") &&
      path.endsWith("/auth-state")
    ) {
      return new Response("Not found", { status: 404 });
    }

    if (
      request.method === "GET" &&
      path === "/api/owner/auth-state"
    ) {
      return getOwnerSessionAuthState(request, env);
    }

    if (
      request.method === "GET" &&
      path === "/api/owner"
    ) {
      return getOwnerNodeFromSession(request, env);
    }

    if (
      request.method === "GET" &&
      path === "/api/owner/events"
    ) {
      return getOwnerNodeEventsFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner"
    ) {
      return updateOwnerNodeFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/logout"
    ) {
      return logoutOwnerSession();
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/change-pin"
    ) {
      return changeOwnerPin(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/collection/create"
    ) {
      return createOwnerCollectionFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/collection/join"
    ) {
      return joinOwnerCollectionFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/collection/leave"
    ) {
      return leaveOwnerCollectionFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/collection/open"
    ) {
      return openOwnerCollectionFromSession(request, env);
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/collection/reissue-link"
    ) {
      return reissueOwnerCollectionLinkFromSession(request, env);
    }

    if (
      request.method === "GET" &&
      path.startsWith("/api/owner/") &&
      path.endsWith("/auth-state")
    ) {
      const token = getOwnerRouteToken(path);
      return getOwnerAuthState(request, env, token);
    }

    if (
      request.method === "GET" &&
      path.startsWith("/api/owner/") &&
      path.endsWith("/events")
    ) {
      return new Response("Not found", { status: 404 });
    }

    if (
      request.method === "POST" &&
      path.startsWith("/api/owner/") &&
      path.endsWith("/carrier")
    ) {
      return new Response("Not found", { status: 404 });
    }

    if (
      request.method === "POST" &&
      path === "/api/owner/image"
    ) {
      return uploadOwnerNodeImageFromSession(request, env);
    }

    if (
      request.method === "DELETE" &&
      path === "/api/owner/image"
    ) {
      return deleteOwnerNodeImageFromSession(request, env);
    }

    if (request.method === "GET" && isLegacyOwnerTokenPath(path)) {
      return new Response("Not found", { status: 404 });
    }

    if (request.method === "POST" && isLegacyOwnerTokenPath(path)) {
      return new Response("Not found", { status: 404 });
    }

    if (request.method === "POST" && path.startsWith("/api/report/")) {
      const slug = path.split("/").pop();
      return createAnonymousReport(request, env, slug);
    }

    if (request.method === "GET" && path === "/") {
      return new Response("Liminall Node Engine", { status: 200 });
    }

    if (request.method === "GET") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};

const OWNER_SESSION_COOKIE_NAME = "owner_session";
const COLLECTION_SESSION_COOKIE_NAME = "collection_session";
const OWNER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;
const COLLECTION_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;
const ANONYMOUS_REPORT_COOLDOWN_SECONDS = 60;
const OWNER_PIN_MAX_ATTEMPTS = 5;
const OWNER_PIN_LOCKOUT_SECONDS = 15 * 60;
const PUBLIC_APP_BASE_URL = "https://muistoissa-engine.rkallio88.workers.dev";

async function servePublicPage(request, env) {
  return fetchInternalHtmlAsset(request, env, "/public.html");
}

async function serveOwnerPage(request, env) {
  return fetchInternalHtmlAsset(request, env, "/owner.html");
}

async function serveOwnerBootstrapPage(request, env, token) {
  const status = await getOwnerAuthStatus(request, env, token);

  if (status.state === "invalid_token") {
    return new Response("Owner token invalid", { status: 404 });
  }

  if (status.state === "pin_not_set") {
    return serveOwnerPage(request, env);
  }

  if (status.state === "session_valid") {
    return new Response(null, {
      status: 302,
      headers: {
        location: "/owner"
      }
    });
  }

  return serveOwnerPage(request, env);
}

async function serveCollectionPage(request, env) {
  return fetchInternalHtmlAsset(request, env, "/collection.html");
}

async function serveCollectionBootstrapPage(request, env, token) {
  const collection = await getCollectionAuthRecord(env, token);

  if (!collection) {
    return new Response("Collection token invalid", { status: 404 });
  }

  const sessionCollection = await getCollectionSessionRecord(request, env);

  if (sessionCollection && sessionCollection.id === collection.id) {
    return new Response(null, {
      status: 302,
      headers: {
        location: "/collection"
      }
    });
  }

  return serveCollectionPage(request, env);
}

async function fetchInternalHtmlAsset(request, env, assetPath) {
  const assetUrl = new URL(assetPath, request.url);

  const headers = new Headers();
  const accept = request.headers.get("accept");
  const userAgent = request.headers.get("user-agent");
  const acceptLanguage = request.headers.get("accept-language");

  if (accept) headers.set("accept", accept);
  if (userAgent) headers.set("user-agent", userAgent);
  if (acceptLanguage) headers.set("accept-language", acceptLanguage);

  const assetRequest = new Request(assetUrl.toString(), {
    method: "GET",
    headers,
    redirect: "follow"
  });

  return env.ASSETS.fetch(assetRequest);
}

async function serveNodeImage(request, env, path) {
  const key = path.replace(/^\/images\//, "").trim();

  if (!key) {
    return new Response("Image not found", { status: 404 });
  }

  const object = await env.NODE_IMAGES.get(key);

  if (!object) {
    return new Response("Image not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, {
    status: 200,
    headers
  });
}

async function provisionNode(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  const nodeId = crypto.randomUUID();
  const slug = await generateUniqueSlug(env);
  const ownerToken = generateToken();
  const ownerTokenHash = await sha256(ownerToken);
  const identifier = generateIdentifier();
  const now = new Date().toISOString();

  const defaultProfileName = "Node";
  const defaultPublicMessage = "This tag is linked to a persistent digital identity object.";
  const defaultPreferredContact = "none";

  await env.DB.prepare(`
    INSERT INTO nodes (
      id,
      node_type,
      status,
      public_slug,
      owner_token_hash,
      profile_name,
      public_identifier,
      public_message,
      preferred_contact,
      show_profile_name,
      show_identifier,
      show_message,
      allow_anonymous_report,
      created_at,
      updated_at
    )
    VALUES (?, 'generic', 'active', ?, ?, ?, ?, ?, ?, 1, 1, 1, 1, ?, ?)
  `)
    .bind(
      nodeId,
      slug,
      ownerTokenHash,
      defaultProfileName,
      identifier,
      defaultPublicMessage,
      defaultPreferredContact,
      now,
      now
    )
    .run();

  await insertNodeEvent(env, {
    nodeId,
    eventType: "NODE_CREATED",
    actorType: "system",
    actorRef: null,
    payload: {
      node_type: "generic",
      status: "active",
      public_slug: slug,
      public_identifier: identifier,
      profile_name: defaultProfileName,
      public_message: defaultPublicMessage,
      preferred_contact: defaultPreferredContact,
      show_profile_name: 1,
      show_identifier: 1,
      show_message: 1,
      allow_anonymous_report: 1
    },
    createdAt: now
  });

  return Response.json({
    public_url: `${PUBLIC_APP_BASE_URL}/m/${slug}`,
    owner_url: `${PUBLIC_APP_BASE_URL}/o/${ownerToken}`,
    identifier
  });
}

async function reissueOwnerToken(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const publicSlug = sanitizeRequiredString(body.public_slug, 255);

  if (!publicSlug) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(publicSlug)
    .first();

  if (!node) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const newOwnerToken = generateToken();
  const newOwnerTokenHash = await sha256(newOwnerToken);
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      owner_token_hash = ?,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(
      newOwnerTokenHash,
      now,
      node.id
    )
    .run();

  return Response.json({
    public_slug: node.public_slug,
    owner_url: `/o/${newOwnerToken}`,
    updated_at: now
  });
}

async function resetOwnerPin(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const publicSlug = sanitizeRequiredString(body.public_slug, 255);

  if (!publicSlug) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(publicSlug)
    .first();

  if (!node) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      owner_pin_hash = NULL,
      owner_pin_set_at = NULL,
      owner_session_version = COALESCE(owner_session_version, 1) + 1,
      owner_failed_pin_attempts = 0,
      owner_lockout_until = NULL,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(now, node.id)
    .run();

  await insertNodeEvent(env, {
    nodeId: node.id,
    eventType: "OWNER_PIN_RESET",
    actorType: "admin",
    actorRef: null,
    payload: {
      public_slug: node.public_slug,
      reason: "admin_reset"
    },
    createdAt: now
  });

  return Response.json({
    public_slug: node.public_slug,
    pin_reset: true,
    updated_at: now
  });
}

async function disableAdminNode(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const publicSlug = sanitizeRequiredString(body.public_slug, 255);

  if (!publicSlug) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(publicSlug)
    .first();

  if (!node) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      status = 'disabled',
      updated_at = ?
    WHERE id = ?
  `)
    .bind(now, node.id)
    .run();

  await insertNodeEvent(env, {
    nodeId: node.id,
    eventType: "NODE_DISABLED",
    actorType: "admin",
    actorRef: null,
    payload: {
      public_slug: node.public_slug,
      reason: "admin_disable"
    },
    createdAt: now
  });

  return Response.json({
    public_slug: node.public_slug,
    status: "disabled",
    updated_at: now
  });
}

async function getAdminNodeInspector(request, env, slug) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!slug) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      owner_token_hash,
      status,
      created_at,
      updated_at,
      profile_name,
      profile_image_url,
      public_message,
      public_identifier,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      hero_image_url,
      gallery_json,
      visibility_mode,
      published_at,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(slug)
    .first();

  if (!node) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  return Response.json({
    public_slug: node.public_slug || "",
    status: node.status || "",
    created_at: node.created_at || "",
    updated_at: node.updated_at || "",
    name: node.profile_name || "",
    identifier: node.public_identifier || "",
    message: node.public_message || "",
    memorial_name: node.memorial_name || "",
    birth_date: node.birth_date || "",
    death_date: node.death_date || "",
    memorial_type: node.memorial_type || "",
    short_epitaph: node.short_epitaph || "",
    show_epitaph: resolveVisibilityFlag(node.show_epitaph, 1),
    memory_text: node.memory_text || "",
    show_memory_text: resolveVisibilityFlag(node.show_memory_text, 1),
    life_story: node.life_story || "",
    show_life_story: resolveVisibilityFlag(node.show_life_story, 1),
    show_identity_details: resolveVisibilityFlag(node.show_identity_details, 0),
    identity_details_position: sanitizeIdentityDetailsPosition(node.identity_details_position, "below_name"),
    hero_image_url: node.hero_image_url || "",
    gallery_json: node.gallery_json || "",
    visibility_mode: node.visibility_mode || "draft",
    published_at: node.published_at || "",
    phone: node.phone || "",
    sms: node.sms || "",
    email: node.email || "",
    whatsapp: node.whatsapp || "",
    show_phone: node.show_phone,
    show_sms: node.show_sms,
    show_email: node.show_email,
    show_whatsapp: node.show_whatsapp,
    preferred_contact: node.preferred_contact || "",
    image_url: node.profile_image_url || ""
  });
}

async function getAdminNodeEvents(request, env, slug) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(slug)
    .first();

  if (!node) {
    return Response.json({
      error: "Node not found"
    }, { status: 404 });
  }

  const eventsResult = await env.DB.prepare(`
    SELECT
      id,
      event_type,
      actor_type,
      actor_ref,
      payload_json,
      created_at
    FROM node_events
    WHERE node_id = ?
    ORDER BY created_at DESC
    LIMIT 100
  `)
    .bind(node.id)
    .all();

  const events = (eventsResult.results || []).map((row) => ({
    id: row.id,
    event_type: row.event_type,
    actor_type: row.actor_type,
    actor_ref: row.actor_ref,
    payload: safeParseJson(row.payload_json),
    created_at: row.created_at
  }));

  return Response.json({
    public_slug: node.public_slug,
    events
  });
}

async function listAdminNodes(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  const result = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      status,
      created_at,
      updated_at,
      profile_name,
      public_identifier
    FROM nodes
    ORDER BY created_at DESC
    LIMIT 100
  `).all();

  const nodes = (result.results || []).map((row) => ({
    node_id: row.id,
    slug: row.public_slug || "",
    status: row.status || "",
    created_at: row.created_at || "",
    updated_at: row.updated_at || "",
    name: row.profile_name || "",
    identifier: row.public_identifier || ""
  }));

  return Response.json({
    count: nodes.length,
    nodes
  });
}

async function getAdminOverview(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  const now = Date.now();
  const last24Hours = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  const nodesTotalRow = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM nodes
  `).first();

  const nodesActiveRow = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM nodes
    WHERE status = 'active'
  `).first();

  const nodesDisabledRow = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM nodes
    WHERE status = 'disabled'
  `).first();

  const nodesLostRow = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM nodes
    WHERE status = 'lost'
  `).first();

  const collectionsTotalRow = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM collections
  `).first();

  const nodesInCollectionsRow = await env.DB.prepare(`
    SELECT COUNT(DISTINCT node_id) AS count
    FROM collection_nodes
  `).first();

  const eventsLast24hRow = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM node_events
    WHERE created_at >= ?
  `)
    .bind(last24Hours)
    .first();

  return Response.json({
    nodes_total: Number(nodesTotalRow?.count || 0),
    nodes_active: Number(nodesActiveRow?.count || 0),
    nodes_disabled: Number(nodesDisabledRow?.count || 0),
    nodes_lost: Number(nodesLostRow?.count || 0),
    collections_total: Number(collectionsTotalRow?.count || 0),
    nodes_in_collections: Number(nodesInCollectionsRow?.count || 0),
    events_last_24h: Number(eventsLast24hRow?.count || 0)
  });
}

async function listAdminCollections(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  const result = await env.DB.prepare(`
    SELECT
      c.id,
      c.name,
      c.status,
      c.created_at,
      c.updated_at,
      COUNT(DISTINCT cn.node_id) AS node_count
    FROM collections c
    LEFT JOIN collection_nodes cn
      ON cn.collection_id = c.id
    GROUP BY
      c.id,
      c.name,
      c.status,
      c.created_at,
      c.updated_at
    ORDER BY c.created_at DESC
  `).all();

  return Response.json(result.results || []);
}

async function getAdminRecentActivity(request, env) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  const result = await env.DB.prepare(`
    SELECT
      n.public_slug,
      n.public_identifier,
      n.profile_name,
      ne.event_type AS latest_event_type,
      ne.created_at AS latest_event_created_at
    FROM node_events ne
    INNER JOIN nodes n
      ON n.id = ne.node_id
    WHERE ne.id IN (
      SELECT ne2.id
      FROM node_events ne2
      WHERE ne2.node_id = ne.node_id
      ORDER BY ne2.created_at DESC, ne2.id DESC
      LIMIT 1
    )
    ORDER BY ne.created_at DESC, ne.id DESC
    LIMIT 10
  `).all();

  return Response.json(result.results || []);
}

async function getAdminCollectionNodes(request, env, collectionId) {
  const adminKey = request.headers.get("x-admin-key");

  if (!env.PROVISION_ADMIN_KEY || adminKey !== env.PROVISION_ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!collectionId) {
    return Response.json({
      error: "Collection not found"
    }, { status: 404 });
  }

  const collection = await env.DB.prepare(`
    SELECT
      id
    FROM collections
    WHERE id = ?
    LIMIT 1
  `)
    .bind(collectionId)
    .first();

  if (!collection) {
    return Response.json({
      error: "Collection not found"
    }, { status: 404 });
  }

  const result = await env.DB.prepare(`
    SELECT DISTINCT
      n.id AS node_id,
      n.public_slug,
      n.status,
      n.profile_name AS name,
      n.public_identifier AS identifier
    FROM collection_nodes cn
    INNER JOIN nodes n
      ON n.id = cn.node_id
    WHERE cn.collection_id = ?
    ORDER BY n.updated_at DESC, n.id ASC
  `)
    .bind(collection.id)
    .all();

  return Response.json(result.results || []);
}

async function getPublicNode(env, slug) {
  const row = await env.DB.prepare(`
    SELECT
      public_slug,
      profile_name,
      profile_image_url,
      public_message,
      public_identifier,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      hero_image_url,
      gallery_json,
      visibility_mode,
      published_at,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      status
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(slug)
    .first();

  if (!row) {
    return new Response("Node not found", { status: 404 });
  }

  if ((row.status || "").trim().toLowerCase() === "disabled") {
    return Response.json({
      error: "Node disabled"
    }, { status: 410 });
  }

  const publicDisplayName = derivePublicDisplayName(row);
  const identityDetailsText = deriveIdentityDetailsText(row);
  const publicData = {
    slug: row.public_slug || "",
    name: resolveVisibilityFlag(row.show_profile_name, 0) ? (row.profile_name || "") : "",
    image_url: resolveVisibilityFlag(row.show_profile_image, 0) ? (row.profile_image_url || "") : "",
    identifier: resolveVisibilityFlag(row.show_identifier, 0) ? (row.public_identifier || "") : "",
    message: resolveVisibilityFlag(row.show_message, 0) ? (row.public_message || "") : "",
    memorial_name: row.memorial_name || "",
    public_display_name: publicDisplayName || "",
    identity_kind: row.identity_kind || "",
    public_name_mode: row.public_name_mode || "",
    person_descriptor: resolveVisibilityFlag(row.show_person_descriptor, 0) ? (row.person_descriptor || "") : "",
    animal_registered_name: resolveVisibilityFlag(row.show_animal_registered_name, 0) ? (row.animal_registered_name || "") : "",
    animal_species: resolveVisibilityFlag(row.show_animal_species, 0) ? (row.animal_species || "") : "",
    animal_breed: resolveVisibilityFlag(row.show_animal_breed, 0) ? (row.animal_breed || "") : "",
    birth_date: row.birth_date || "",
    death_date: row.death_date || "",
    memorial_type: row.memorial_type || "",
    short_epitaph: row.short_epitaph || "",
    show_epitaph: resolveVisibilityFlag(row.show_epitaph, 1),
    memory_text: row.memory_text || "",
    show_memory_text: resolveVisibilityFlag(row.show_memory_text, 1),
    life_story: row.life_story || "",
    show_life_story: resolveVisibilityFlag(row.show_life_story, 1),
    show_identity_details: resolveVisibilityFlag(row.show_identity_details, 0),
    identity_details_position: sanitizeIdentityDetailsPosition(row.identity_details_position, "below_name"),
    identity_details_text: identityDetailsText || "",
    hero_image_url: row.hero_image_url || "",
    gallery_json: row.gallery_json || "",
    visibility_mode: row.visibility_mode || "draft",
    published_at: row.published_at || "",
    contact_phone: resolveVisibilityFlag(row.show_phone, 0) ? (row.phone || "") : "",
    contact_sms: resolveVisibilityFlag(row.show_sms, 0) ? (row.sms || "") : "",
    contact_email: resolveVisibilityFlag(row.show_email, 0) ? (row.email || "") : "",
    contact_whatsapp: resolveVisibilityFlag(row.show_whatsapp, 0) ? (row.whatsapp || "") : "",
    preferred_contact: resolvePublicPreferredContact(row),
    location_label: resolveVisibilityFlag(row.show_last_recovery_point, 0) ? (row.last_recovery_label || "") : "",
    location_city: resolveVisibilityFlag(row.show_last_recovery_point, 0) ? extractLocationCity(row.last_recovery_label) : "",
    location_country: resolveVisibilityFlag(row.show_last_recovery_point, 0) ? extractLocationCountry(row.last_recovery_label) : "",
    allow_anonymous_report: resolveVisibilityFlag(row.allow_anonymous_report, 0),
    status: row.status || ""
  };

  return Response.json(publicData);
}

async function getOwnerNode(request, env, token) {
  const auth = await requireAuthorizedOwner(request, env, token);

  if (auth.response) {
    return auth.response;
  }

  const row = await env.DB.prepare(`
    SELECT
      id,
      node_type,
      status,
      public_slug,
      public_identifier,
      profile_name,
      profile_image_url,
      public_message,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      hero_image_url,
      gallery_json,
      visibility_mode,
      published_at,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      created_at,
      updated_at
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(auth.tokenHash)
    .first();

  return Response.json(await buildOwnerResponse(env, row));
}

async function getOwnerNodeEvents(request, env, token) {
  const auth = await requireAuthorizedOwner(request, env, token);

  if (auth.response) {
    return auth.response;
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      public_identifier
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(auth.tokenHash)
    .first();

  return getOwnerEventsResponse(env, node);
}

async function getOwnerNodeEventsFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  return getOwnerEventsResponse(env, node);
}

async function getOwnerEventsResponse(env, node) {
  const rows = await env.DB.prepare(`
    SELECT
      id,
      event_type,
      actor_type,
      actor_ref,
      payload_json,
      created_at
    FROM node_events
    WHERE node_id = ?
    ORDER BY created_at DESC
  `)
    .bind(node.id)
    .all();

  const events = (rows.results || []).map((row) => ({
    event_type: row.event_type,
    payload: safeParseJson(row.payload_json),
    created_at: row.created_at
  }));

  return Response.json({
    events
  });
}

async function replaceCarrier(request, env, token) {
  const auth = await requireAuthorizedOwner(request, env, token);

  if (auth.response) {
    return auth.response;
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      public_identifier,
      status
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(auth.tokenHash)
    .first();

  let body = {};

  try {
    if (request.headers.get("content-type")?.includes("application/json")) {
      body = await request.json();
    }
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const reason = sanitizeNullableString(body.reason, null, 255);
  const notes = sanitizeNullableString(body.notes, null, 1000);
  const now = new Date().toISOString();

  await insertNodeEvent(env, {
    nodeId: node.id,
    eventType: "CARRIER_REPLACED",
    actorType: "owner",
    actorRef: null,
    payload: {
      public_slug: node.public_slug,
      public_identifier: node.public_identifier,
      replacement_mode: "same-node-same-public-url",
      reason,
      notes
    },
    createdAt: now
  });

  return Response.json({
    ok: true,
    message: "Carrier replacement recorded",
    node_id: node.id,
    public_slug: node.public_slug,
    public_identifier: node.public_identifier,
    public_url: `/m/${node.public_slug}`,
    event_type: "CARRIER_REPLACED",
    created_at: now
  });
}

async function uploadOwnerNodeImage(request, env, token) {
  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif"
  ]);

  const auth = await requireAuthorizedOwner(request, env, token);

  if (auth.response) {
      return auth.response;
  }

  const existing = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      public_identifier,
      profile_image_url
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(auth.tokenHash)
    .first();

  return uploadOwnerNodeImageForExisting(request, env, existing);
}

async function uploadOwnerNodeImageFromSession(request, env) {
  const existing = await getOwnerSessionRecord(request, env);

  if (!existing) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  return uploadOwnerNodeImageForExisting(request, env, existing);
}

async function uploadOwnerNodeImageForExisting(request, env, existing) {
  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif"
  ]);

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return new Response("Invalid form data", { status: 400 });
  }

  const file = formData.get("image");

  if (!file || typeof file === "string") {
    return new Response("Image file is required", { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return new Response("Invalid image type", { status: 400 });
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return new Response("Image too large", { status: 400 });
  }

  const extension = getImageExtensionFromMimeType(file.type);
  const imageKey = `nodes/${existing.id}/${crypto.randomUUID()}.${extension}`;

  const previousImageKey = getImageKeyFromUrl(existing.profile_image_url);

  await env.NODE_IMAGES.put(imageKey, file.stream(), {
    httpMetadata: {
      contentType: file.type
    }
  });

  const imageUrl = `/images/${imageKey}`;
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      profile_image_url = ?,
      show_profile_image = 1,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(
      imageUrl,
      now,
      existing.id
    )
    .run();

  if (previousImageKey) {
    await env.NODE_IMAGES.delete(previousImageKey);
  }

  await insertNodeEvent(env, {
    nodeId: existing.id,
    eventType: "PROFILE_UPDATED",
    actorType: "owner",
    actorRef: null,
    payload: {
      profile_image_url: {
        from: existing.profile_image_url,
        to: imageUrl
      }
    },
    createdAt: now
  });

  const updated = await env.DB.prepare(`
    SELECT
      id,
      node_type,
      status,
      public_slug,
      public_identifier,
      profile_name,
      profile_image_url,
      public_message,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      created_at,
      updated_at
    FROM nodes
    WHERE id = ?
    LIMIT 1
  `)
    .bind(existing.id)
    .first();

  return Response.json(await buildOwnerResponse(env, updated));
}

async function deleteOwnerNodeImage(request, env, token) {
  const auth = await requireAuthorizedOwner(request, env, token);

  if (auth.response) {
    return auth.response;
  }

  const existing = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      public_identifier,
      profile_image_url
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(auth.tokenHash)
    .first();

  return deleteOwnerNodeImageForExisting(env, existing);
}

async function deleteOwnerNodeImageFromSession(request, env) {
  const existing = await getOwnerSessionRecord(request, env);

  if (!existing) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  return deleteOwnerNodeImageForExisting(env, existing);
}

async function deleteOwnerNodeImageForExisting(env, existing) {

  const previousImageUrl = existing.profile_image_url;
  const previousImageKey = getImageKeyFromUrl(previousImageUrl);
  const now = new Date().toISOString();

  if (previousImageKey) {
    await env.NODE_IMAGES.delete(previousImageKey);
  }

  await env.DB.prepare(`
    UPDATE nodes
    SET
      profile_image_url = NULL,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(
      now,
      existing.id
    )
    .run();

  await insertNodeEvent(env, {
    nodeId: existing.id,
    eventType: "PROFILE_UPDATED",
    actorType: "owner",
    actorRef: null,
    payload: {
      profile_image_url: {
        from: previousImageUrl,
        to: null
      }
    },
    createdAt: now
  });

  const updated = await env.DB.prepare(`
    SELECT
      id,
      node_type,
      status,
      public_slug,
      public_identifier,
      profile_name,
      profile_image_url,
      public_message,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      created_at,
      updated_at
    FROM nodes
    WHERE id = ?
    LIMIT 1
  `)
    .bind(existing.id)
    .first();

  return Response.json(await buildOwnerResponse(env, updated));
}

async function updateOwnerNode(request, env, token) {
  const auth = await requireAuthorizedOwner(request, env, token);

  if (auth.response) {
    return auth.response;
  }

  const existing = await env.DB.prepare(`
    SELECT
      id,
      node_type,
      status,
      public_slug,
      public_identifier,
      profile_name,
      profile_image_url,
      public_message,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      hero_image_url,
      gallery_json,
      visibility_mode,
      published_at,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      created_at,
      updated_at
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(auth.tokenHash)
    .first();

  return performOwnerNodeUpdate(request, env, existing);
}

async function updateOwnerNodeFromSession(request, env) {
  const existing = await getOwnerSessionRecord(request, env);

  if (!existing) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  return performOwnerNodeUpdate(request, env, existing);
}

async function performOwnerNodeUpdate(request, env, existing) {
  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const next = {
    status: sanitizeStatus(body.status, existing.status),
    profile_name: sanitizeNullableString(body.profile_name, existing.profile_name, 120),
    public_message: sanitizeNullableString(body.public_message, existing.public_message, 2000),
    memorial_name: sanitizeNullableString(body.memorial_name, existing.memorial_name, 255),
    birth_date: sanitizeNullableString(body.birth_date, existing.birth_date, 64),
    death_date: sanitizeNullableString(body.death_date, existing.death_date, 64),
    memorial_type: sanitizeNullableString(body.memorial_type, existing.memorial_type, 100),
    identity_kind: sanitizeIdentityKind(body.identity_kind, existing.identity_kind),
    display_name_override: sanitizeNullableString(body.display_name_override, existing.display_name_override, 255),
    public_name_mode: sanitizeNullableString(body.public_name_mode, existing.public_name_mode, 32),
    person_first_name: sanitizeNullableString(body.person_first_name, existing.person_first_name, 120),
    person_middle_names: sanitizeNullableString(body.person_middle_names, existing.person_middle_names, 255),
    person_last_name: sanitizeNullableString(body.person_last_name, existing.person_last_name, 120),
    person_nickname: sanitizeNullableString(body.person_nickname, existing.person_nickname, 120),
    person_honorific: sanitizeNullableString(body.person_honorific, existing.person_honorific, 120),
    person_descriptor: sanitizeNullableString(body.person_descriptor, existing.person_descriptor, 255),
    show_person_middle_names: sanitizeBooleanLike(body.show_person_middle_names, existing.show_person_middle_names),
    show_person_last_name: sanitizeBooleanLike(body.show_person_last_name, existing.show_person_last_name),
    show_person_nickname: sanitizeBooleanLike(body.show_person_nickname, existing.show_person_nickname),
    show_person_honorific: sanitizeBooleanLike(body.show_person_honorific, existing.show_person_honorific),
    show_person_descriptor: sanitizeBooleanLike(body.show_person_descriptor, existing.show_person_descriptor),
    prefer_person_nickname: sanitizeBooleanLike(body.prefer_person_nickname, existing.prefer_person_nickname),
    animal_name: sanitizeNullableString(body.animal_name, existing.animal_name, 120),
    animal_registered_name: sanitizeNullableString(body.animal_registered_name, existing.animal_registered_name, 255),
    animal_nickname: sanitizeNullableString(body.animal_nickname, existing.animal_nickname, 120),
    animal_species: sanitizeNullableString(body.animal_species, existing.animal_species, 120),
    animal_breed: sanitizeNullableString(body.animal_breed, existing.animal_breed, 120),
    show_animal_registered_name: sanitizeBooleanLike(body.show_animal_registered_name, existing.show_animal_registered_name),
    show_animal_nickname: sanitizeBooleanLike(body.show_animal_nickname, existing.show_animal_nickname),
    show_animal_species: sanitizeBooleanLike(body.show_animal_species, existing.show_animal_species),
    show_animal_breed: sanitizeBooleanLike(body.show_animal_breed, existing.show_animal_breed),
    prefer_animal_nickname: sanitizeBooleanLike(body.prefer_animal_nickname, existing.prefer_animal_nickname),
    short_epitaph: sanitizeNullableString(body.short_epitaph, existing.short_epitaph, 500),
    show_epitaph: sanitizeBooleanLike(body.show_epitaph, existing.show_epitaph),
    memory_text: sanitizeNullableString(body.memory_text, existing.memory_text, 4000),
    show_memory_text: sanitizeBooleanLike(body.show_memory_text, existing.show_memory_text),
    life_story: sanitizeNullableString(body.life_story, existing.life_story, 12000),
    show_life_story: sanitizeBooleanLike(body.show_life_story, existing.show_life_story),
    show_identity_details: sanitizeBooleanLike(body.show_identity_details, existing.show_identity_details),
    identity_details_position: sanitizeIdentityDetailsPosition(body.identity_details_position, existing.identity_details_position),
    hero_image_url: sanitizeNullableString(body.hero_image_url, existing.hero_image_url, 1000),
    gallery_json: sanitizeNullableString(body.gallery_json, existing.gallery_json, 20000),
    visibility_mode: sanitizeNullableString(body.visibility_mode, existing.visibility_mode, 32),
    published_at: sanitizeNullableString(body.published_at, existing.published_at, 64),
    phone: sanitizeNullableString(body.phone, existing.phone, 100),
    sms: sanitizeNullableString(body.sms, existing.sms, 100),
    email: sanitizeNullableString(body.email, existing.email, 255),
    whatsapp: sanitizeNullableString(body.whatsapp, existing.whatsapp, 100),
    preferred_contact: sanitizePreferredContact(body.preferred_contact, existing.preferred_contact),
    last_recovery_label: sanitizeNullableString(body.last_recovery_label, existing.last_recovery_label, 255),
    show_profile_name: sanitizeBooleanLike(body.show_profile_name, existing.show_profile_name),
    show_profile_image: sanitizeBooleanLike(body.show_profile_image, existing.show_profile_image),
    show_identifier: sanitizeBooleanLike(body.show_identifier, existing.show_identifier),
    show_message: sanitizeBooleanLike(body.show_message, existing.show_message),
    show_phone: sanitizeBooleanLike(body.show_phone, existing.show_phone),
    show_sms: sanitizeBooleanLike(body.show_sms, existing.show_sms),
    show_email: sanitizeBooleanLike(body.show_email, existing.show_email),
    show_whatsapp: sanitizeBooleanLike(body.show_whatsapp, existing.show_whatsapp),
    show_last_recovery_point: sanitizeBooleanLike(body.show_last_recovery_point, existing.show_last_recovery_point),
    allow_anonymous_report: sanitizeBooleanLike(body.allow_anonymous_report, existing.allow_anonymous_report)
  };

  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      status = ?,
      profile_name = ?,
      public_message = ?,
      memorial_name = ?,
      birth_date = ?,
      death_date = ?,
      memorial_type = ?,
      identity_kind = ?,
      display_name_override = ?,
      public_name_mode = ?,
      person_first_name = ?,
      person_middle_names = ?,
      person_last_name = ?,
      person_nickname = ?,
      person_honorific = ?,
      person_descriptor = ?,
      show_person_middle_names = ?,
      show_person_last_name = ?,
      show_person_nickname = ?,
      show_person_honorific = ?,
      show_person_descriptor = ?,
      prefer_person_nickname = ?,
      animal_name = ?,
      animal_registered_name = ?,
      animal_nickname = ?,
      animal_species = ?,
      animal_breed = ?,
      show_animal_registered_name = ?,
      show_animal_nickname = ?,
      show_animal_species = ?,
      show_animal_breed = ?,
      prefer_animal_nickname = ?,
      short_epitaph = ?,
      show_epitaph = ?,
      memory_text = ?,
      show_memory_text = ?,
      life_story = ?,
      show_life_story = ?,
      show_identity_details = ?,
      identity_details_position = ?,
      hero_image_url = ?,
      gallery_json = ?,
      visibility_mode = ?,
      published_at = ?,
      phone = ?,
      sms = ?,
      email = ?,
      whatsapp = ?,
      preferred_contact = ?,
      last_recovery_label = ?,
      show_profile_name = ?,
      show_profile_image = ?,
      show_identifier = ?,
      show_message = ?,
      show_phone = ?,
      show_sms = ?,
      show_email = ?,
      show_whatsapp = ?,
      show_last_recovery_point = ?,
      allow_anonymous_report = ?,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(
      next.status,
      next.profile_name,
      next.public_message,
      next.memorial_name,
      next.birth_date,
      next.death_date,
      next.memorial_type,
      next.identity_kind,
      next.display_name_override,
      next.public_name_mode,
      next.person_first_name,
      next.person_middle_names,
      next.person_last_name,
      next.person_nickname,
      next.person_honorific,
      next.person_descriptor,
      next.show_person_middle_names,
      next.show_person_last_name,
      next.show_person_nickname,
      next.show_person_honorific,
      next.show_person_descriptor,
      next.prefer_person_nickname,
      next.animal_name,
      next.animal_registered_name,
      next.animal_nickname,
      next.animal_species,
      next.animal_breed,
      next.show_animal_registered_name,
      next.show_animal_nickname,
      next.show_animal_species,
      next.show_animal_breed,
      next.prefer_animal_nickname,
      next.short_epitaph,
      next.show_epitaph,
      next.memory_text,
      next.show_memory_text,
      next.life_story,
      next.show_life_story,
      next.show_identity_details,
      next.identity_details_position,
      next.hero_image_url,
      next.gallery_json,
      next.visibility_mode,
      next.published_at,
      next.phone,
      next.sms,
      next.email,
      next.whatsapp,
      next.preferred_contact,
      next.last_recovery_label,
      next.show_profile_name,
      next.show_profile_image,
      next.show_identifier,
      next.show_message,
      next.show_phone,
      next.show_sms,
      next.show_email,
      next.show_whatsapp,
      next.show_last_recovery_point,
      next.allow_anonymous_report,
      now,
      existing.id
    )
    .run();

  const changeSet = buildChangeSet(existing, next);

  if (Object.keys(changeSet).length > 0) {
    await insertNodeEvent(env, {
      nodeId: existing.id,
      eventType: deriveOwnerUpdateEventType(changeSet),
      actorType: "owner",
      actorRef: null,
      payload: changeSet,
      createdAt: now
    });
  }

  const updated = await env.DB.prepare(`
    SELECT
      id,
      node_type,
      status,
      public_slug,
      public_identifier,
      profile_name,
      profile_image_url,
      public_message,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      hero_image_url,
      gallery_json,
      visibility_mode,
      published_at,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      created_at,
      updated_at
    FROM nodes
    WHERE id = ?
    LIMIT 1
  `)
    .bind(existing.id)
    .first();

  return Response.json(await buildOwnerResponse(env, updated));
}

async function createAnonymousReport(request, env, slug) {
  const node = await env.DB.prepare(`
    SELECT
      id,
      public_slug,
      allow_anonymous_report,
      status
    FROM nodes
    WHERE public_slug = ?
    LIMIT 1
  `)
    .bind(slug)
    .first();

  if (!node) {
    return new Response("Node not found", { status: 404 });
  }

  if ((node.status || "").trim().toLowerCase() === "disabled") {
    return new Response("Node disabled", { status: 410 });
  }

  if (!isTruthyDbValue(node.allow_anonymous_report)) {
    return new Response("Anonymous reporting disabled", { status: 403 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const finderName = sanitizeNullableString(body.name, null, 255);
  const finderContact = sanitizeNullableString(body.contact, null, 255);
  const message = sanitizeRequiredString(body.message, 2000);
  const location = sanitizeNullableString(body.location, null, 255);

  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  const clientIpHeader =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "";
  const clientIp = clientIpHeader.split(",")[0].trim();
  const clientIpHash = clientIp ? await sha256(clientIp) : null;

  if (!clientIpHash) {
    return new Response("Client IP unavailable", { status: 400 });
  }

  if (clientIpHash) {
    const cooldownWindowStart = new Date(
      Date.now() - ANONYMOUS_REPORT_COOLDOWN_SECONDS * 1000
    ).toISOString();

    const recentReport = await env.DB.prepare(`
      SELECT id
      FROM node_events
      WHERE node_id = ?
        AND event_type = 'ANONYMOUS_REPORT_CREATED'
        AND created_at >= ?
        AND json_extract(payload_json, '$.client_ip_hash') = ?
      LIMIT 1
    `)
      .bind(node.id, cooldownWindowStart, clientIpHash)
      .first();

    if (recentReport) {
      return new Response("Too many requests", { status: 429 });
    }
  }

  const reportId = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.DB.prepare(`
    INSERT INTO reports (
      id,
      node_id,
      message,
      location,
      created_at
    )
    VALUES (?, ?, ?, ?, ?)
  `)
    .bind(
      reportId,
      node.id,
      message,
      location,
      now
    )
    .run();

  await insertNodeEvent(env, {
    nodeId: node.id,
    eventType: "ANONYMOUS_REPORT_CREATED",
    actorType: "finder",
    actorRef: finderContact || finderName || null,
    payload: {
      report_id: reportId,
      finder_name: finderName,
      finder_contact: finderContact,
      client_ip_hash: clientIpHash,
      message,
      location
    },
    createdAt: now
  });

  return Response.json({
    ok: true,
    report_id: reportId,
    finder_name: finderName,
    finder_contact: finderContact,
    message: "Report submitted"
  });
}

async function insertNodeEvent(env, { nodeId, eventType, actorType, actorRef, payload, createdAt }) {
  const eventId = crypto.randomUUID();
  const payloadJson = payload ? JSON.stringify(payload) : null;

  await env.DB.prepare(`
    INSERT INTO node_events (
      id,
      node_id,
      event_type,
      actor_type,
      actor_ref,
      payload_json,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
    .bind(
      eventId,
      nodeId,
      eventType,
      actorType,
      actorRef,
      payloadJson,
      createdAt
    )
    .run();
}

async function getOwnerAuthRecord(env, token) {
  if (!token) {
    return null;
  }

  const tokenHash = await sha256(token);

  const node = await env.DB.prepare(`
    SELECT
      id,
      status,
      owner_token_hash,
      owner_pin_hash,
      owner_session_version,
      owner_failed_pin_attempts,
      owner_lockout_until
    FROM nodes
    WHERE owner_token_hash = ?
    LIMIT 1
  `)
    .bind(tokenHash)
    .first();

  if (!node) {
    return null;
  }

  if ((node.status || "").trim().toLowerCase() === "disabled") {
    return null;
  }

  return {
    id: node.id,
    tokenHash,
    ownerTokenHash: node.owner_token_hash,
    ownerPinHash: node.owner_pin_hash,
    ownerSessionVersion: Number(node.owner_session_version || 1),
    ownerFailedPinAttempts: Number(node.owner_failed_pin_attempts || 0),
    ownerLockoutUntil: node.owner_lockout_until
  };
}

async function getOwnerAuthStatus(request, env, token) {
  const auth = await getOwnerAuthRecord(env, token);

  if (!auth) {
    return {
      state: "invalid_token"
    };
  }

  if (auth.ownerLockoutUntil) {
    const lockTime = new Date(auth.ownerLockoutUntil).getTime();

    if (Number.isFinite(lockTime) && Date.now() < lockTime) {
      return {
        state: "locked",
        auth
      };
    }
  }

  if (!auth.ownerPinHash) {
    return {
      state: "pin_not_set",
      auth
    };
  }

  if (!env.OWNER_SESSION_SECRET) {
    return {
      state: "pin_required",
      auth
    };
  }

  const cookieValue = getCookieValue(request.headers.get("cookie"), OWNER_SESSION_COOKIE_NAME);
  const hasValidSession = await verifyOwnerSession(
    cookieValue,
    auth.id,
    auth.tokenHash,
    auth.ownerSessionVersion,
    env
  );

  return {
    state: hasValidSession ? "session_valid" : "pin_required",
    auth
  };
}

async function getOwnerSessionRecord(request, env) {
  if (!env.OWNER_SESSION_SECRET) {
    return null;
  }

  const cookieValue = getCookieValue(request.headers.get("cookie"), OWNER_SESSION_COOKIE_NAME);

  if (!cookieValue) {
    return null;
  }

  const parts = cookieValue.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const payloadText = base64UrlDecodeToString(parts[0]);

  if (!payloadText) {
    return null;
  }

  let payload;

  try {
    payload = JSON.parse(payloadText);
  } catch {
    return null;
  }

  if (!payload || typeof payload !== "object" || !payload.node_id) {
    return null;
  }

  const node = await env.DB.prepare(`
    SELECT
      id,
      owner_token_hash,
      owner_session_version,
      node_type,
      status,
      public_slug,
      public_identifier,
      profile_name,
      profile_image_url,
      public_message,
      memorial_name,
      birth_date,
      death_date,
      memorial_type,
      identity_kind,
      display_name_override,
      public_name_mode,
      person_first_name,
      person_middle_names,
      person_last_name,
      person_nickname,
      person_honorific,
      person_descriptor,
      show_person_middle_names,
      show_person_last_name,
      show_person_nickname,
      show_person_honorific,
      show_person_descriptor,
      prefer_person_nickname,
      animal_name,
      animal_registered_name,
      animal_nickname,
      animal_species,
      animal_breed,
      show_animal_registered_name,
      show_animal_nickname,
      show_animal_species,
      show_animal_breed,
      prefer_animal_nickname,
      short_epitaph,
      show_epitaph,
      memory_text,
      show_memory_text,
      life_story,
      show_life_story,
      show_identity_details,
      identity_details_position,
      hero_image_url,
      gallery_json,
      visibility_mode,
      published_at,
      phone,
      sms,
      email,
      whatsapp,
      preferred_contact,
      last_recovery_lat,
      last_recovery_lng,
      last_recovery_label,
      show_profile_name,
      show_profile_image,
      show_identifier,
      show_message,
      show_phone,
      show_sms,
      show_email,
      show_whatsapp,
      show_last_recovery_point,
      allow_anonymous_report,
      created_at,
      updated_at
    FROM nodes
    WHERE id = ?
    LIMIT 1
  `)
    .bind(payload.node_id)
    .first();

  if (!node) {
    return null;
  }

  const hasValidSession = await verifyOwnerSession(
    cookieValue,
    node.id,
    node.owner_token_hash,
    Number(node.owner_session_version || 1),
    env
  );

  if (!hasValidSession) {
    return null;
  }

  if ((node.status || "").trim().toLowerCase() === "disabled") {
    return null;
  }

  return node;
}

async function getOwnerSessionAuthState(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  return Response.json({
    state: "session_valid"
  });
}

async function getCollectionAuthRecord(env, token) {
  if (!token) {
    return null;
  }

  const tokenHash = await sha256(token);

  const collection = await env.DB.prepare(`
    SELECT
      id,
      status,
      access_token_hash
    FROM collections
    WHERE access_token_hash = ?
    LIMIT 1
  `)
    .bind(tokenHash)
    .first();

  if (!collection) {
    return null;
  }

  if ((collection.status || "").trim().toLowerCase() !== "active") {
    return null;
  }

  return {
    id: collection.id,
    tokenHash,
    accessTokenHash: collection.access_token_hash
  };
}

async function getCollectionSessionRecord(request, env) {
  if (!env.OWNER_SESSION_SECRET) {
    return null;
  }

  const cookieValue = getCookieValue(request.headers.get("cookie"), COLLECTION_SESSION_COOKIE_NAME);

  if (!cookieValue) {
    return null;
  }

  const parts = cookieValue.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const payloadText = base64UrlDecodeToString(parts[0]);

  if (!payloadText) {
    return null;
  }

  let payload;

  try {
    payload = JSON.parse(payloadText);
  } catch {
    return null;
  }

  if (!payload || typeof payload !== "object" || !payload.collection_id) {
    return null;
  }

  const collection = await env.DB.prepare(`
    SELECT
      id,
      status,
      access_token_hash,
      name,
      created_at,
      updated_at
    FROM collections
    WHERE id = ?
    LIMIT 1
  `)
    .bind(payload.collection_id)
    .first();

  if (!collection) {
    return null;
  }

  if ((collection.status || "").trim().toLowerCase() !== "active") {
    return null;
  }

  const hasValidSession = await verifyCollectionSession(
    cookieValue,
    collection.id,
    collection.access_token_hash,
    env
  );

  if (!hasValidSession) {
    return null;
  }

  return collection;
}

async function createCollectionSession(request, env, token) {
  const collection = await getCollectionAuthRecord(env, token);

  if (!collection) {
    return new Response("Collection token invalid", { status: 404 });
  }

  if (!env.OWNER_SESSION_SECRET) {
    return new Response("Collection session unavailable", { status: 503 });
  }

  const setCookie = await createCollectionSessionCookie(
    collection.id,
    collection.tokenHash,
    env
  );

  return new Response(JSON.stringify({
    state: "session_valid"
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": setCookie
    }
  });
}

async function getCollectionSessionAuthState(request, env) {
  const collection = await getCollectionSessionRecord(request, env);

  if (!collection) {
    return Response.json({
      state: "token_required"
    }, { status: 401 });
  }

  return Response.json({
    state: "session_valid",
    collection_name: collection.name
  });
}

async function getCollectionNodesFromSession(request, env) {
  const collection = await getCollectionSessionRecord(request, env);

  if (!collection) {
    return Response.json({
      state: "token_required"
    }, { status: 401 });
  }

  const rows = await env.DB.prepare(`
    SELECT
      n.public_slug,
      n.public_identifier,
      n.profile_name,
      n.status
    FROM collection_nodes cn
    INNER JOIN nodes n ON n.id = cn.node_id
    WHERE cn.collection_id = ?
    ORDER BY n.updated_at DESC, n.id ASC
  `)
    .bind(collection.id)
    .all();

  return Response.json(rows.results || []);
}

async function getActiveCollectionMembershipByNodeId(env, nodeId) {
  if (!nodeId) {
    return null;
  }

  const row = await env.DB.prepare(`
    SELECT
      c.id,
      c.name
    FROM collection_nodes cn
    INNER JOIN collections c
      ON c.id = cn.collection_id
    WHERE cn.node_id = ?
      AND c.status = 'active'
    ORDER BY cn.created_at DESC, c.created_at DESC
    LIMIT 1
  `)
    .bind(nodeId)
    .first();

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name
  };
}

async function buildOwnerResponse(env, node) {
  const collection = await getActiveCollectionMembershipByNodeId(env, node.id);
  const publicDisplayName = derivePublicDisplayName(node);

  return {
    status: node.status,
    public_slug: node.public_slug,
    public_identifier: node.public_identifier,
    profile_name: node.profile_name,
    profile_image_url: node.profile_image_url,
    public_message: node.public_message,
    memorial_name: node.memorial_name || "",
    public_display_name: publicDisplayName || "",
    birth_date: node.birth_date || "",
    death_date: node.death_date || "",
    memorial_type: node.memorial_type || "",
    identity_kind: node.identity_kind || "",
    display_name_override: node.display_name_override || "",
    public_name_mode: node.public_name_mode || "",
    person_first_name: node.person_first_name || "",
    person_middle_names: node.person_middle_names || "",
    person_last_name: node.person_last_name || "",
    person_nickname: node.person_nickname || "",
    person_honorific: node.person_honorific || "",
    person_descriptor: node.person_descriptor || "",
    show_person_middle_names: node.show_person_middle_names,
    show_person_last_name: node.show_person_last_name,
    show_person_nickname: node.show_person_nickname,
    show_person_honorific: node.show_person_honorific,
    show_person_descriptor: node.show_person_descriptor,
    prefer_person_nickname: node.prefer_person_nickname,
    animal_name: node.animal_name || "",
    animal_registered_name: node.animal_registered_name || "",
    animal_nickname: node.animal_nickname || "",
    animal_species: node.animal_species || "",
    animal_breed: node.animal_breed || "",
    show_animal_registered_name: node.show_animal_registered_name,
    show_animal_nickname: node.show_animal_nickname,
    show_animal_species: node.show_animal_species,
    show_animal_breed: node.show_animal_breed,
    prefer_animal_nickname: node.prefer_animal_nickname,
    short_epitaph: node.short_epitaph || "",
    show_epitaph: resolveVisibilityFlag(node.show_epitaph, 1),
    memory_text: node.memory_text || "",
    show_memory_text: resolveVisibilityFlag(node.show_memory_text, 1),
    life_story: node.life_story || "",
    show_life_story: resolveVisibilityFlag(node.show_life_story, 1),
    show_identity_details: resolveVisibilityFlag(node.show_identity_details, 0),
    identity_details_position: sanitizeIdentityDetailsPosition(node.identity_details_position, "below_name"),
    identity_details_text: deriveIdentityDetailsText(node) || "",
    hero_image_url: node.hero_image_url || "",
    gallery_json: node.gallery_json || "",
    visibility_mode: node.visibility_mode || "draft",
    published_at: node.published_at || "",
    phone: node.phone,
    sms: node.sms,
    email: node.email,
    whatsapp: node.whatsapp,
    preferred_contact: node.preferred_contact,
    last_recovery_label: node.last_recovery_label,
    show_phone: node.show_phone,
    show_sms: node.show_sms,
    show_email: node.show_email,
    show_whatsapp: node.show_whatsapp,
    show_last_recovery_point: node.show_last_recovery_point,
    allow_anonymous_report: node.allow_anonymous_report,
    collection
  };
}

async function logoutCollectionSession() {
  return new Response(JSON.stringify({
    ok: true
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": [
        `${COLLECTION_SESSION_COOKIE_NAME}=`,
        "Max-Age=0",
        "Path=/",
        "HttpOnly",
        "Secure",
        "SameSite=Lax"
      ].join("; ")
    }
  });
}

async function getOwnerNodeFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  return Response.json(await buildOwnerResponse(env, node));
}

async function logoutOwnerSession() {
  return new Response(JSON.stringify({
    ok: true
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": [
        `${OWNER_SESSION_COOKIE_NAME}=`,
        "Max-Age=0",
        "Path=/",
        "HttpOnly",
        "Secure",
        "SameSite=Lax"
      ].join("; ")
    }
  });
}

async function changeOwnerPin(request, env) {
  const sessionNode = await getOwnerSessionRecord(request, env);

  if (!sessionNode) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const currentPin = typeof body?.currentPin === "string" ? body.currentPin.trim() : "";
  const newPin = typeof body?.newPin === "string" ? body.newPin.trim() : "";

  if (!/^\d{4,6}$/.test(newPin)) {
    return Response.json({
      error: "invalid_pin_format"
    }, { status: 400 });
  }

  const pinRow = await env.DB.prepare(`
    SELECT
      owner_pin_hash,
      owner_failed_pin_attempts
    FROM nodes
    WHERE id = ?
    LIMIT 1
  `)
    .bind(sessionNode.id)
    .first();

  const isValidCurrentPin = await verifyOwnerPin(currentPin, pinRow?.owner_pin_hash);

  if (!isValidCurrentPin) {
    const failedAttempt = await registerFailedOwnerPinAttempt(env, {
      id: sessionNode.id,
      ownerFailedPinAttempts: Number(pinRow?.owner_failed_pin_attempts || 0)
    });

    if (failedAttempt.locked) {
      return Response.json({
        state: "locked"
      }, { status: 403 });
    }

    return Response.json({
      error: "invalid_current_pin"
    }, { status: 401 });
  }

  await clearOwnerPinFailures(env, sessionNode.id);

  const pinHash = await hashPinPBKDF2(newPin);
  const now = new Date().toISOString();
  const nextSessionVersion = Number(sessionNode.owner_session_version || 1) + 1;

  await env.DB.prepare(`
    UPDATE nodes
    SET
      owner_pin_hash = ?,
      owner_session_version = ?,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(
      pinHash,
      nextSessionVersion,
      now,
      sessionNode.id
    )
    .run();

  await insertNodeEvent(env, {
    nodeId: sessionNode.id,
    eventType: "pin_changed",
    actorType: "owner",
    actorRef: null,
    payload: null,
    createdAt: now
  });

  const setCookie = await createOwnerSessionCookie(
    sessionNode.id,
    sessionNode.owner_token_hash,
    nextSessionVersion,
    env
  );

  return new Response(JSON.stringify({
    ok: true
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": setCookie
    }
  });
}

async function createOwnerCollectionFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  let body = {};

  try {
    if (request.headers.get("content-type")?.includes("application/json")) {
      body = await request.json();
    }
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const activeMembership = await getActiveCollectionMembershipByNodeId(env, node.id);

  if (activeMembership) {
    return Response.json({
      state: "already_in_collection",
      error: "Node already belongs to an active collection"
    }, { status: 409 });
  }

  const name = sanitizeNullableString(body.name, null, 255);
  const collectionId = crypto.randomUUID();
  const accessToken = generateToken();
  const accessTokenHash = await sha256(accessToken);
  const now = new Date().toISOString();

  await env.DB.prepare(`
    INSERT INTO collections (
      id,
      status,
      name,
      access_token_hash,
      created_at,
      updated_at
    )
    VALUES (?, 'active', ?, ?, ?, ?)
  `)
    .bind(
      collectionId,
      name,
      accessTokenHash,
      now,
      now
    )
    .run();

  await env.DB.prepare(`
    INSERT INTO collection_nodes (
      collection_id,
      node_id,
      created_at
    )
    VALUES (?, ?, ?)
  `)
    .bind(
      collectionId,
      node.id,
      now
    )
    .run();

  return Response.json({
    ok: true,
    collection: {
      id: collectionId,
      name,
      status: "active"
    },
    access_token: accessToken
  });
}

async function joinOwnerCollectionFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const collectionToken =
    typeof body?.collectionToken === "string"
      ? body.collectionToken.trim()
      : "";

  if (!collectionToken) {
    return new Response("Collection token is required", { status: 400 });
  }

  const collection = await getCollectionAuthRecord(env, collectionToken);

  if (!collection) {
    return new Response("Collection token invalid", { status: 404 });
  }

  const existingMembership = await env.DB.prepare(`
    SELECT collection_id
    FROM collection_nodes
    WHERE collection_id = ?
      AND node_id = ?
    LIMIT 1
  `)
    .bind(collection.id, node.id)
    .first();

  if (existingMembership) {
    return Response.json({
      ok: true,
      state: "already_joined"
    });
  }

  const activeMembership = await getActiveCollectionMembershipByNodeId(env, node.id);

  if (activeMembership) {
    return Response.json({
      state: "already_in_collection",
      error: "Node already belongs to an active collection"
    }, { status: 409 });
  }

  await env.DB.prepare(`
    INSERT INTO collection_nodes (
      collection_id,
      node_id,
      created_at
    )
    VALUES (?, ?, ?)
  `)
    .bind(
      collection.id,
      node.id,
      new Date().toISOString()
    )
    .run();

  return Response.json({
    ok: true,
    state: "joined"
  });
}

async function leaveOwnerCollectionFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const collectionId =
    typeof body?.collection_id === "string"
      ? body.collection_id.trim()
      : "";

  if (!collectionId) {
    return new Response("Collection ID is required", { status: 400 });
  }

  const membership = await env.DB.prepare(`
    SELECT rowid
    FROM collection_nodes
    WHERE collection_id = ?
      AND node_id = ?
    LIMIT 1
  `)
    .bind(collectionId, node.id)
    .first();

  if (!membership) {
    return Response.json({
      error: "Membership not found"
    }, { status: 404 });
  }

  await env.DB.prepare(`
    DELETE FROM collection_nodes
    WHERE rowid = ?
  `)
    .bind(membership.rowid)
    .run();

  await insertNodeEvent(env, {
    nodeId: node.id,
    eventType: "NODE_LEFT_COLLECTION",
    actorType: "owner",
    actorRef: null,
    payload: {
      collection_id: collectionId
    },
    createdAt: new Date().toISOString()
  });

  return Response.json({
    ok: true,
    state: "left"
  });
}

async function openOwnerCollectionFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  const membership = await getActiveCollectionMembershipByNodeId(env, node.id);

  if (!membership) {
    return Response.json({
      error: "Active collection not found"
    }, { status: 404 });
  }

  const collection = await env.DB.prepare(`
    SELECT
      id,
      status,
      access_token_hash
    FROM collections
    WHERE id = ?
    LIMIT 1
  `)
    .bind(membership.id)
    .first();

  if (!collection || (collection.status || "").trim().toLowerCase() !== "active") {
    return Response.json({
      error: "Active collection not found"
    }, { status: 404 });
  }

  if (!env.OWNER_SESSION_SECRET) {
    return new Response("Collection session unavailable", { status: 503 });
  }

  const setCookie = await createCollectionSessionCookie(
    collection.id,
    collection.access_token_hash,
    env
  );

  return new Response(JSON.stringify({
    ok: true,
    state: "session_valid"
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": setCookie
    }
  });
}

async function reissueOwnerCollectionLinkFromSession(request, env) {
  const node = await getOwnerSessionRecord(request, env);

  if (!node) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  const membership = await getActiveCollectionMembershipByNodeId(env, node.id);

  if (!membership) {
    return Response.json({
      error: "Active collection not found"
    }, { status: 404 });
  }

  const collection = await env.DB.prepare(`
    SELECT
      id,
      status
    FROM collections
    WHERE id = ?
    LIMIT 1
  `)
    .bind(membership.id)
    .first();

  if (!collection || (collection.status || "").trim().toLowerCase() !== "active") {
    return Response.json({
      error: "Active collection not found"
    }, { status: 404 });
  }

  const accessToken = generateToken();
  const accessTokenHash = await sha256(accessToken);
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE collections
    SET
      access_token_hash = ?,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(accessTokenHash, now, collection.id)
    .run();

  return Response.json({
    ok: true,
    state: "reissued",
    collection: {
      id: collection.id
    },
    access_token: accessToken,
    access_url: `/c/${accessToken}`
  });
}

async function requireAuthorizedOwner(request, env, token) {
  const status = await getOwnerAuthStatus(request, env, token);

  if (status.state === "invalid_token") {
    return {
      response: new Response("Owner token invalid", { status: 404 })
    };
  }

  if (status.state === "locked") {
    return {
      response: Response.json({
        state: "locked"
      }, { status: 403 })
    };
  }

  if (status.state === "pin_not_set") {
    return {
      response: Response.json({
        state: "pin_not_set"
      }, { status: 401 })
    };
  }

  if (status.state === "pin_required") {
    return {
      response: Response.json({
        state: "pin_required"
      }, { status: 401 })
    };
  }

  return {
    auth: status.auth,
    tokenHash: status.auth.tokenHash,
    nodeId: status.auth.id
  };
}

async function getOwnerAuthState(request, env, token) {
  const status = await getOwnerAuthStatus(request, env, token);

  if (status.state === "invalid_token") {
    return new Response("Owner token invalid", { status: 404 });
  }

  return Response.json({
    state: status.state
  });
}

async function postOwnerAuthState(request, env, token) {
  return verifyOwnerPinAndIssueSession(request, env, token);
}

async function postOwnerVerifyPin(request, env, token) {
  return verifyOwnerPinAndIssueSession(request, env, token);
}

async function verifyOwnerPinAndIssueSession(request, env, token) {
  const status = await getOwnerAuthStatus(request, env, token);

  if (status.state === "invalid_token") {
    return new Response("Owner token invalid", { status: 404 });
  }

  if (status.state === "locked") {
    return Response.json({
      state: "locked"
    }, { status: 403 });
  }

  if (status.state === "pin_not_set") {
    return Response.json({
      state: "pin_not_set"
    });
  }

  if (status.state === "session_valid") {
    return Response.json({
      state: "session_valid"
    });
  }

  if (!env.OWNER_SESSION_SECRET) {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const pin = sanitizeRequiredString(body?.pin, 64);

  if (!pin) {
    const failedAttempt = await registerFailedOwnerPinAttempt(env, status.auth);

    if (failedAttempt.locked) {
      return Response.json({
        state: "locked"
      }, { status: 403 });
    }

    return Response.json({
      state: "invalid_pin"
    }, { status: 401 });
  }

  const isValidPin = await verifyOwnerPin(pin, status.auth.ownerPinHash);

  if (!isValidPin) {
    const failedAttempt = await registerFailedOwnerPinAttempt(env, status.auth);

    if (failedAttempt.locked) {
      return Response.json({
        state: "locked"
      }, { status: 403 });
    }

    return Response.json({
      state: "invalid_pin"
    }, { status: 401 });
  }

  await clearOwnerPinFailures(env, status.auth.id);

  const setCookie = await createOwnerSessionCookie(
    status.auth.id,
    status.auth.tokenHash,
    status.auth.ownerSessionVersion,
    env
  );

  return new Response(JSON.stringify({
    state: "session_valid"
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": setCookie
    }
  });
}

async function setOwnerPin(request, env, token) {
  const status = await getOwnerAuthStatus(request, env, token);

  if (status.state === "invalid_token") {
    return new Response("Owner token invalid", { status: 404 });
  }

  if (status.state === "locked") {
    return Response.json({
      state: "locked"
    }, { status: 403 });
  }

  if (status.state !== "pin_not_set") {
    return Response.json({
      state: "pin_required"
    }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const pin = typeof body?.pin === "string" ? body.pin.trim() : "";

  if (!/^\d{4,6}$/.test(pin)) {
    return Response.json({
      error: "invalid_pin_format"
    }, { status: 400 });
  }

  const pinHash = await hashPinPBKDF2(pin);
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      owner_pin_hash = ?,
      owner_pin_set_at = ?,
      owner_failed_pin_attempts = 0,
      owner_lockout_until = NULL,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(
      pinHash,
      now,
      now,
      status.auth.id
    )
    .run();

  return Response.json({
    state: "pin_required"
  });
}

async function registerFailedOwnerPinAttempt(env, auth) {
  const nextAttempts = Number(auth.ownerFailedPinAttempts || 0) + 1;
  const shouldLock = nextAttempts >= OWNER_PIN_MAX_ATTEMPTS;
  const now = new Date().toISOString();
  const lockoutUntil = shouldLock
    ? new Date(Date.now() + OWNER_PIN_LOCKOUT_SECONDS * 1000).toISOString()
    : null;

  await env.DB.prepare(`
    UPDATE nodes
    SET
      owner_failed_pin_attempts = ?,
      owner_lockout_until = ?,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(nextAttempts, lockoutUntil, now, auth.id)
    .run();

  return {
    attempts: nextAttempts,
    locked: shouldLock,
    lockoutUntil
  };
}

async function clearOwnerPinFailures(env, nodeId) {
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE nodes
    SET
      owner_failed_pin_attempts = 0,
      owner_lockout_until = NULL,
      updated_at = ?
    WHERE id = ?
  `)
    .bind(now, nodeId)
    .run();
}

function getOwnerRouteToken(path) {
  const parts = path.split("/").filter(Boolean);

  if (parts.length < 3) {
    return null;
  }

  if (parts[0] !== "api" || parts[1] !== "owner") {
    return null;
  }

  return parts[2] || null;
}

function isLegacyOwnerTokenPath(path) {
  const parts = path.split("/").filter(Boolean);

  if (parts.length < 3) {
    return false;
  }

  return parts[0] === "api" && parts[1] === "owner" && Boolean(parts[2]);
}

function getCollectionRouteToken(path) {
  const parts = path.split("/").filter(Boolean);

  if (parts.length < 4) {
    return null;
  }

  if (parts[0] !== "api" || parts[1] !== "collection") {
    return null;
  }

  return parts[2] || null;
}

function getOwnerPathToken(path) {
  const parts = path.split("/").filter(Boolean);

  if (parts.length < 2) {
    return null;
  }

  if (parts[0] !== "o") {
    return null;
  }

  return parts[1] || null;
}

function getCollectionPathToken(path) {
  const parts = path.split("/").filter(Boolean);

  if (parts.length < 2) {
    return null;
  }

  if (parts[0] !== "c") {
    return null;
  }

  return parts[1] || null;
}

function buildChangeSet(existing, next) {
  const fields = [
    "status",
    "profile_name",
    "profile_image_url",
    "public_message",
    "memorial_name",
    "birth_date",
    "death_date",
    "memorial_type",
    "identity_kind",
    "display_name_override",
    "public_name_mode",
    "person_first_name",
    "person_middle_names",
    "person_last_name",
    "person_nickname",
    "person_honorific",
    "person_descriptor",
    "show_person_middle_names",
    "show_person_last_name",
    "show_person_nickname",
    "show_person_honorific",
    "show_person_descriptor",
    "prefer_person_nickname",
    "animal_name",
    "animal_registered_name",
    "animal_nickname",
    "animal_species",
    "animal_breed",
    "show_animal_registered_name",
    "show_animal_nickname",
    "show_animal_species",
    "show_animal_breed",
    "prefer_animal_nickname",
    "short_epitaph",
    "show_epitaph",
    "memory_text",
    "show_memory_text",
    "life_story",
    "show_life_story",
    "show_identity_details",
    "identity_details_position",
    "hero_image_url",
    "gallery_json",
    "visibility_mode",
    "published_at",
    "phone",
    "sms",
    "email",
    "whatsapp",
    "preferred_contact",
    "last_recovery_lat",
    "last_recovery_lng",
    "last_recovery_label",
    "show_profile_name",
    "show_profile_image",
    "show_identifier",
    "show_message",
    "show_phone",
    "show_sms",
    "show_email",
    "show_whatsapp",
    "show_last_recovery_point",
    "allow_anonymous_report"
  ];

  const changes = {};

  for (const field of fields) {
    const before = normalizeCompareValue(existing[field]);
    const after = normalizeCompareValue(next[field]);

    if (before !== after) {
      changes[field] = {
        from: existing[field],
        to: next[field]
      };
    }
  }

  return changes;
}

function deriveOwnerUpdateEventType(changeSet) {
  const keys = Object.keys(changeSet);

  if (keys.length === 1 && keys[0] === "status") {
    return "STATUS_CHANGED";
  }

  if (
    keys.length > 0 &&
    keys.every((key) =>
      [
        "show_profile_name",
        "show_profile_image",
        "show_identifier",
        "show_message",
        "show_phone",
        "show_sms",
        "show_email",
        "show_whatsapp",
        "show_last_recovery_point",
        "allow_anonymous_report"
      ].includes(key)
    )
  ) {
    return "VISIBILITY_UPDATED";
  }

  if (
    keys.length > 0 &&
    keys.every((key) =>
      ["last_recovery_lat", "last_recovery_lng", "last_recovery_label"].includes(key)
    )
  ) {
    return "RECOVERY_LOCATION_UPDATED";
  }

  return "PROFILE_UPDATED";
}

async function generateUniqueSlug(env) {
  for (let i = 0; i < 10; i++) {
    const slug = generateSlug();

    const existing = await env.DB.prepare(`
      SELECT id
      FROM nodes
      WHERE public_slug = ?
      LIMIT 1
    `)
      .bind(slug)
      .first();

    if (!existing) {
      return slug;
    }
  }

  throw new Error("Failed to generate unique slug");
}

function generateSlug() {
  const part = Math.random().toString(36).substring(2, 8);
  return `node-${part}`;
}

function generateToken() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

function bytesToBase64Url(bytes) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function generateIdentifier() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";

  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return `ID#${id}`;
}

async function createOwnerSessionCookie(nodeId, tokenHash, sessionVersion, env) {
  const exp = Math.floor(Date.now() / 1000) + OWNER_SESSION_MAX_AGE_SECONDS;
  const payload = JSON.stringify({
    node_id: nodeId,
    token_hash: tokenHash,
    session_version: sessionVersion,
    exp
  });
  const encodedPayload = base64UrlEncodeString(payload);
  const signature = await signOwnerSessionPayload(encodedPayload, env.OWNER_SESSION_SECRET);

  return [
    `${OWNER_SESSION_COOKIE_NAME}=${encodedPayload}.${signature}`,
    `Max-Age=${OWNER_SESSION_MAX_AGE_SECONDS}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax"
  ].join("; ");
}

async function createCollectionSessionCookie(collectionId, tokenHash, env) {
  const exp = Math.floor(Date.now() / 1000) + COLLECTION_SESSION_MAX_AGE_SECONDS;
  const payload = JSON.stringify({
    collection_id: collectionId,
    token_hash: tokenHash,
    exp
  });
  const encodedPayload = base64UrlEncodeString(payload);
  const signature = await signOwnerSessionPayload(encodedPayload, env.OWNER_SESSION_SECRET);

  return [
    `${COLLECTION_SESSION_COOKIE_NAME}=${encodedPayload}.${signature}`,
    `Max-Age=${COLLECTION_SESSION_MAX_AGE_SECONDS}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax"
  ].join("; ");
}

async function verifyOwnerSession(cookieValue, nodeId, tokenHash, sessionVersion, env) {
  if (!cookieValue || !env.OWNER_SESSION_SECRET) {
    return false;
  }

  const parts = cookieValue.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [encodedPayload, providedSignature] = parts;
  const expectedSignature = await signOwnerSessionPayload(encodedPayload, env.OWNER_SESSION_SECRET);

  if (!timingSafeEqual(providedSignature, expectedSignature)) {
    return false;
  }

  const payloadText = base64UrlDecodeToString(encodedPayload);

  if (!payloadText) {
    return false;
  }

  let payload;

  try {
    payload = JSON.parse(payloadText);
  } catch {
    return false;
  }

  if (!payload || typeof payload !== "object") {
    return false;
  }

  if (payload.node_id !== nodeId) {
    return false;
  }

  if (payload.token_hash !== tokenHash) {
    return false;
  }

  if (!Number.isFinite(payload.session_version)) {
    return false;
  }

  if (payload.session_version !== sessionVersion) {
    return false;
  }

  if (!Number.isFinite(payload.exp)) {
    return false;
  }

  return Math.floor(Date.now() / 1000) < payload.exp;
}

async function verifyCollectionSession(cookieValue, collectionId, tokenHash, env) {
  if (!cookieValue || !env.OWNER_SESSION_SECRET) {
    return false;
  }

  const parts = cookieValue.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [encodedPayload, providedSignature] = parts;
  const expectedSignature = await signOwnerSessionPayload(encodedPayload, env.OWNER_SESSION_SECRET);

  if (!timingSafeEqual(providedSignature, expectedSignature)) {
    return false;
  }

  const payloadText = base64UrlDecodeToString(encodedPayload);

  if (!payloadText) {
    return false;
  }

  let payload;

  try {
    payload = JSON.parse(payloadText);
  } catch {
    return false;
  }

  if (!payload || typeof payload !== "object") {
    return false;
  }

  if (payload.collection_id !== collectionId) {
    return false;
  }

  if (payload.token_hash !== tokenHash) {
    return false;
  }

  if (!Number.isFinite(payload.exp)) {
    return false;
  }

  return Math.floor(Date.now() / 1000) < payload.exp;
}

async function signOwnerSessionPayload(encodedPayload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(encodedPayload)
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

async function verifyOwnerPin(pin, ownerPinHash) {
  if (!pin || !ownerPinHash) {
    return false;
  }

  return verifyPin(pin, ownerPinHash);
}

async function hashPinPBKDF2(pin) {
  const iterations = 100000;
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const derivedBytes = await derivePinPBKDF2Bytes(pin, saltBytes, iterations);

  return [
    "pbkdf2",
    String(iterations),
    bytesToHex(saltBytes),
    bytesToHex(derivedBytes)
  ].join("$");
}

async function verifyPin(pin, storedHash) {
  if (!pin || !storedHash) {
    return false;
  }

  const normalizedHash = String(storedHash).trim().toLowerCase();

  if (!normalizedHash.startsWith("pbkdf2$")) {
    return false;
  }

  const parts = normalizedHash.split("$");

  if (parts.length !== 4) {
    return false;
  }

  const iterations = Number(parts[1]);
  const saltHex = parts[2];
  const hashHex = parts[3];

  if (!Number.isInteger(iterations) || iterations <= 0) {
    return false;
  }

  const saltBytes = hexToBytes(saltHex);
  const expectedHashBytes = hexToBytes(hashHex);

  if (!saltBytes || !expectedHashBytes || expectedHashBytes.length !== 32) {
    return false;
  }

  const derivedBytes = await derivePinPBKDF2Bytes(pin, saltBytes, iterations);
  return timingSafeEqual(bytesToHex(derivedBytes), hashHex);
}

async function derivePinPBKDF2Bytes(pin, saltBytes, iterations) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pin),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltBytes,
      iterations
    },
    keyMaterial,
    32 * 8
  );

  return new Uint8Array(derivedBits);
}

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(hash));

  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getCookieValue(cookieHeader, name) {
  if (!cookieHeader || !name) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const part of cookies) {
    const [rawName, ...rawValueParts] = part.trim().split("=");

    if (rawName === name) {
      return rawValueParts.join("=") || null;
    }
  }

  return null;
}

function base64UrlEncodeString(value) {
  const bytes = new TextEncoder().encode(value);
  return bytesToBase64Url(bytes);
}

function base64UrlDecodeToString(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const normalized = value
    .replaceAll("-", "+")
    .replaceAll("_", "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));

  try {
    return atob(normalized + padding);
  } catch {
    return null;
  }
}

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;

  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

function bytesToHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  if (typeof hex !== "string" || hex.length === 0 || hex.length % 2 !== 0 || !/^[0-9a-f]+$/.test(hex)) {
    return null;
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.slice(i, i + 2), 16);
  }

  return bytes;
}

function sanitizeStatus(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "active" || normalized === "lost") {
    return normalized;
  }

  return fallback;
}

function sanitizeIdentityKind(value, fallback) {
  if (value === undefined) {
    return fallback;
  }

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "") {
    return null;
  }

  if (normalized === "human" || normalized === "animal" || normalized === "other") {
    return normalized;
  }

  return fallback;
}

function sanitizePreferredContact(value, fallback) {
  if (value === undefined) {
    return fallback;
  }

  if (value === null) {
    return "none";
  }

  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (
    normalized === "phone" ||
    normalized === "sms" ||
    normalized === "whatsapp" ||
    normalized === "email" ||
    normalized === "none"
  ) {
    return normalized;
  }

  return fallback;
}

function sanitizeNullableString(value, fallback, maxLength) {
  if (value === undefined) {
    return fallback;
  }

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  if (trimmed === "") {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function sanitizeRequiredString(value, maxLength) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (trimmed === "") {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function sanitizeBooleanLike(value, fallback) {
  if (value === undefined) {
    return fallback;
  }

  if (value === null) {
    return null;
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (value === 1 || value === "1" || value === "true") {
    return 1;
  }

  if (value === 0 || value === "0" || value === "false") {
    return 0;
  }

  return fallback;
}

function sanitizeIdentityDetailsPosition(value, fallback) {
  if (value === undefined) {
    return fallback || "below_name";
  }

  if (value === null) {
    return "below_name";
  }

  if (typeof value !== "string") {
    return fallback || "below_name";
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "") {
    return "below_name";
  }

  if (
    normalized === "hidden" ||
    normalized === "below_name" ||
    normalized === "above_epitaph" ||
    normalized === "memory_section"
  ) {
    return normalized;
  }

  return fallback || "below_name";
}

function normalizeCompareValue(value) {
  if (value === null || value === undefined) {
    return null;
  }

  return String(value);
}

function isTruthyDbValue(value) {
  return value === 1 || value === true || value === "1";
}

function resolveVisibilityFlag(value, fallback) {
  if (value === null || value === undefined) {
    return fallback === 1;
  }

  return isTruthyDbValue(value);
}

function resolvePublicPreferredContact(row) {
  const preferredContact = sanitizePreferredContact(row.preferred_contact, "none");

  if (preferredContact === "phone") {
    return resolveVisibilityFlag(row.show_phone, 0) && row.phone ? "phone" : "none";
  }

  if (preferredContact === "sms") {
    return resolveVisibilityFlag(row.show_sms, 0) && row.sms ? "sms" : "none";
  }

  if (preferredContact === "email") {
    return resolveVisibilityFlag(row.show_email, 0) && row.email ? "email" : "none";
  }

  if (preferredContact === "whatsapp") {
    return resolveVisibilityFlag(row.show_whatsapp, 0) && row.whatsapp ? "whatsapp" : "none";
  }

  return "none";
}

function safeParseJson(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractLocationCity(label) {
  if (!label || typeof label !== "string") {
    return "";
  }

  const parts = label
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return parts[parts.length - 1];
}

function extractLocationCountry(label) {
  if (!label || typeof label !== "string") {
    return "";
  }

  const lower = label.toLowerCase();

  if (lower.includes("finland")) {
    return "Finland";
  }

  if (lower.includes("suomi")) {
    return "Finland";
  }

  return "";
}

function getImageExtensionFromMimeType(mimeType) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/gif") return "gif";
  return "bin";
}

function getImageKeyFromUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") {
    return null;
  }

  if (!imageUrl.startsWith("/images/")) {
    return null;
  }

  const key = imageUrl.replace("/images/", "").trim();
  return key || null;
}

function derivePublicDisplayName(node) {
  const override = getTrimmedValue(node?.display_name_override);

  if (override) {
    return override;
  }

  const identityKind = getTrimmedValue(node?.identity_kind).toLowerCase();

  if (identityKind === "human") {
    return (
      deriveHumanPublicDisplayName(node) ||
      getTrimmedValue(node?.memorial_name) ||
      getTrimmedValue(node?.profile_name) ||
      null
    );
  }

  if (identityKind === "animal") {
    return (
      deriveAnimalPublicDisplayName(node) ||
      getTrimmedValue(node?.memorial_name) ||
      getTrimmedValue(node?.profile_name) ||
      null
    );
  }

  return getTrimmedValue(node?.memorial_name) || getTrimmedValue(node?.profile_name) || null;
}

function deriveHumanPublicDisplayName(node) {
  const firstName = getTrimmedValue(node?.person_first_name);
  const middleNames = resolveVisibilityFlag(node?.show_person_middle_names, 0)
    ? getTrimmedValue(node?.person_middle_names)
    : "";
  const lastName = resolveVisibilityFlag(node?.show_person_last_name, 0)
    ? getTrimmedValue(node?.person_last_name)
    : "";
  const nickname = getTrimmedValue(node?.person_nickname);
  const honorific = resolveVisibilityFlag(node?.show_person_honorific, 0)
    ? getTrimmedValue(node?.person_honorific)
    : "";

  const useNickname = resolveVisibilityFlag(node?.prefer_person_nickname, 0) && nickname;
  const baseName = useNickname ? nickname : (firstName || nickname);

  const parts = [honorific, baseName, middleNames, lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}

function deriveAnimalPublicDisplayName(node) {
  const nickname = getTrimmedValue(node?.animal_nickname);
  const animalName = getTrimmedValue(node?.animal_name);
  const registeredName = getTrimmedValue(node?.animal_registered_name);
  const publicNameMode = getTrimmedValue(node?.public_name_mode).toLowerCase();

  if (
    resolveVisibilityFlag(node?.show_animal_registered_name, 0) &&
    registeredName &&
    publicNameMode === "registered"
  ) {
    return registeredName;
  }

  const useNickname = resolveVisibilityFlag(node?.prefer_animal_nickname, 0) && nickname;
  const baseName = useNickname ? nickname : (animalName || nickname);

  return baseName || registeredName || null;
}

function deriveIdentityDetailsText(node) {
  const identityKind = getTrimmedValue(node?.identity_kind).toLowerCase();

  if (identityKind === "animal") {
    const parts = [
      getTrimmedValue(node?.animal_registered_name),
      getTrimmedValue(node?.animal_species),
      getTrimmedValue(node?.animal_breed)
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(" \u00b7 ") : null;
  }

  if (identityKind === "human") {
    const parts = [
      getTrimmedValue(node?.person_nickname),
      getTrimmedValue(node?.person_middle_names),
      getTrimmedValue(node?.person_honorific)
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(" \u00b7 ") : null;
  }

  return null;
}

function getTrimmedValue(value) {
  return typeof value === "string" ? value.trim() : "";
}
