#!/bin/sh
set -eu
for file in docs/attack-surface.yaml docs/attacker-notebook.yaml docs/secrets.yaml; do
  test -s "$file" || { echo "missing evidence file: $file" >&2; exit 1; }
done
grep -q '^  S01:' docs/attack-surface.yaml
grep -q '^    objective:' docs/attacker-notebook.yaml
echo 'Evidence files are present. This check does not run learner code.'
