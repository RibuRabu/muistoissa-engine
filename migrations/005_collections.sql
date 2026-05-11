CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'disabled',
  name TEXT,
  access_token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (status IN ('active', 'disabled'))
);

CREATE TABLE IF NOT EXISTS collection_nodes (
  collection_id TEXT NOT NULL,
  node_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (collection_id, node_id),
  FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
  FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_collection_nodes_node_id
ON collection_nodes(node_id);
