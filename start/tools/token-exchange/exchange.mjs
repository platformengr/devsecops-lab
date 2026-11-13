import fs from 'node:fs';
import path from 'node:path';
const trust = JSON.parse(fs.readFileSync('infra/trust/publisher.json', 'utf8'));
const claimsFile = process.env.LAB_OIDC_CLAIMS || (process.env.RUNNER_TEMP && path.join(process.env.RUNNER_TEMP, 'claims.json'));
if (!claimsFile) {
  console.log('DENY: set LAB_OIDC_CLAIMS to a local JSON fixture; no token is read or exchanged.');
  process.exitCode = 1;
} else {
  const claims = JSON.parse(fs.readFileSync(claimsFile, 'utf8'));
  const subjectMatches = trust.subject.endsWith('*') ? String(claims.sub).startsWith(trust.subject.slice(0, -1)) : claims.sub === trust.subject;
  const allow = claims.iss === trust.issuer && claims.aud === trust.audience && subjectMatches;
  console.log(allow ? 'ALLOW' : 'DENY');
}
