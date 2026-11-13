# Checkout delivery lab

This is a deliberately imperfect fixture. It contains no production credentials and must stay in a learner-owned public repository. Work through the DevSecOps pipeline course, then continue with the runtime course in this same repository.

## Evidence first

Before every test, write the objective, entry point, trust assumption, cheapest path, pivot and expected signal in `docs/attacker-notebook.yaml`. After a control, rerun the same test and add the evidence to `docs/attack-surface.yaml`.

Keep all tests bounded to this repository and local cluster. Never send a canary to an external endpoint. Never run unknown artifacts or install a package from a public registry during the exercises.

## Validate

Run `./scripts/validate.sh` to check the evidence file shapes. It does not execute app code, actions, packages, containers or Terraform.
