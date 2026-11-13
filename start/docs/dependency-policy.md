# Dependency policy

- Pin every GitHub Action to a reviewed full commit SHA and keep its release comment.
- Commit the npm lockfile and verify registry signatures where available.
- Set a release cooldown for newly published packages.
- Do not store a long-lived npm publish token in a general CI job.
- Treat a clean scanner result as one signal, not proof that a publisher is trusted.
