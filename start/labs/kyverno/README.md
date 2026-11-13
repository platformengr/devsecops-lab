# Kyverno image policy

Install the pinned Kyverno 1.20.0 release in your kind cluster, then apply `deploy/policy/verify-images.yaml`. Confirm the installed CRD with `kubectl explain imagevalidatingpolicy.spec` before applying. The reference policy uses `policies.kyverno.io/v1` and `ImageValidatingPolicy`; it does not use the deprecated `ClusterPolicy` verifyImages form.

Verify the exact Kyverno and cosign bundle compatibility on the versions you install. If the default cosign bundle is not accepted, use the compatibility flag documented by the pinned release and record the evidence.
