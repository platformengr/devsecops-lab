import http from 'node:http';
import { URL } from 'node:url';

const port = Number(process.env.PORT || 8080);
const allowed = new Set((process.env.PREVIEW_HOSTS || '').split(',').map((x) => x.trim()).filter(Boolean));
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/healthz') { res.writeHead(200); return res.end('ok'); }
  if (url.pathname === '/preview') {
    const target = url.searchParams.get('url');
    if (!target) { res.writeHead(400); return res.end(JSON.stringify({ error: 'url required' })); }
    let parsed;
    try { parsed = new URL(target); } catch { res.writeHead(400); return res.end(JSON.stringify({ error: 'invalid url' })); }
    if (allowed.size && !allowed.has(parsed.hostname)) { res.writeHead(403); return res.end(JSON.stringify({ error: 'host not allowed' })); }
    // Seeded weakness: the lab application does not yet enforce PREVIEW_HOSTS.
    // Runtime tests use only the local metadata mock service in the learner's kind cluster.
    try {
      const result = await fetch(parsed, { signal: AbortSignal.timeout(1500) });
      const body = (await result.text()).slice(0, 2048);
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ status: result.status, body }));
    } catch {
      res.writeHead(502); return res.end(JSON.stringify({ error: 'upstream unavailable' }));
    }
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ service: 'checkout', build: process.env.BUILD_ID || 'local' }));
});
server.listen(port, '0.0.0.0');
