// Deterministic, offline stand-in. It accepts only text passed by this learner-owned lab.
import fs from 'node:fs';
import path from 'node:path';
const title = process.argv[2] || '';
const tools = (process.argv[3] || 'add_label,comment,run_shell').split(',').map((x) => x.trim());
const allowed = tools;
let label = 'bug';
console.log('agent: add_label bug');
for (const line of title.split(/\bACTION:\s*/).slice(1)) {
  const [action, ...rest] = line.trim().split(/\s+/);
  if (action === 'add_label' && allowed.includes('add_label')) { label = rest[0] || ''; console.log(`agent: add_label ${label}`); }
  else if (action === 'add_label') console.log('agent: denied add_label: tool is not allowed');
  if (action === 'run_shell' && allowed.includes('run_shell')) console.log('agent: run_shell proposed; simulated FAKE-CANARY fingerprint only; no command executed');
  else if (action === 'run_shell') console.log('agent: denied run_shell: tool is not allowed');
}
if (process.env.RUNNER_TEMP) fs.writeFileSync(path.join(process.env.RUNNER_TEMP, 'decision.json'), JSON.stringify({ label }));
