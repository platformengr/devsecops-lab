# DevSecOps lab

Reference repository for the PlatformEngr DevSecOps courses. Copy `start/` into a new public repository you own. The labs are restricted to that repository, a local kind cluster, a local registry and fake credentials. Never add a real credential.

The pipeline course makes the repo's workflow and image controls. The runtime course continues in the same repo, cluster and evidence register. The lab validator only reads files; it never runs learner scripts.

## Layout

- `start/`: learner-owned course repository template.
- `labs/`: bounded, offline fixtures for AI, registry and metadata exercises.
- `tools/token-exchange/`: deterministic OIDC claim verifier; it makes no network requests.
- `docs/sources.md`: incident source links and claims used in the course.
- `scripts/validate.sh`: checks the reference template's required evidence files.

## Safety

`DEPLOY_TOKEN` and the registry publish token used in exercises must be fake, disposable canaries. The metadata mock returns sample values that open no account. Do not target third-party systems, use real credentials, or enable public egress from the lab workloads.
