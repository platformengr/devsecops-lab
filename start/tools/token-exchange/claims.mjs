// In Actions, request a token for the lab audience, decode only its public claims and write those claims
// to the runner temp directory. The bearer token is never printed or persisted.
import fs from 'node:fs';
import path from 'node:path';
const endpoint = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
const bearer = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
if (!endpoint || !bearer) {
  console.log('No Actions OIDC endpoint is present. For a local test, set LAB_OIDC_CLAIMS to a fake claim fixture.');
} else {
  const sep = endpoint.includes('?') ? '&' : '?';
  const response = await fetch(`${endpoint}${sep}audience=sts.amazonaws.com`, { headers: { authorization: `bearer ${bearer}` } });
  if (!response.ok) throw new Error(`OIDC claim request failed: ${response.status}`);
  const data = await response.json();
  const payload = JSON.parse(Buffer.from(String(data.value).split('.')[1], 'base64url').toString('utf8'));
  const safe = { iss: payload.iss, aud: payload.aud, sub: payload.sub, ref: payload.ref, event_name: payload.event_name, environment: payload.environment };
  console.log(JSON.stringify(safe, null, 2));
  fs.writeFileSync(path.join(process.env.RUNNER_TEMP || '/tmp', 'claims.json'), JSON.stringify({ iss: safe.iss, aud: safe.aud, sub: safe.sub }));
}
