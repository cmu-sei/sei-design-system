# Security Policy

## Supported Versions

Only the latest published release of `@cmu-sei/sei-design-system` receives security updates. Beta releases (e.g., `4.x.x-beta.*`) are pre-release builds and are **not** supported for security issues.

| Version | Supported |
|---|---|
| Latest stable (`4.x`) | Yes |
| Beta (`4.x.x-beta.*`) | No |
| Older major versions | No |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

To report a potential security vulnerability, navigate to the **Security** tab of this repository and click **Report a vulnerability**. This opens a private channel with the maintainers.

Include as much of the following information as possible to help us triage and resolve the issue quickly:

- A description of the vulnerability and its potential impact.
- The affected component(s) or file(s), if known.
- Steps to reproduce or a proof-of-concept (if safe to share).
- The version(s) of `@cmu-sei/sei-design-system` affected.
- Any suggested mitigations, if applicable.

We ask that you use responsible disclosure and allow us reasonable time to investigate and publish a fix before disclosing the issue publicly.

---

## Response Process

After receiving a report you can expect:

1. **Acknowledgment** confirming receipt of your report.
2. **Initial assessment** with a severity determination and next steps.
3. **Resolution and disclosure** — we will notify you when a fix is published and coordinate on any public disclosure.

Response times depend on the severity and complexity of the issue. We will keep you informed of progress throughout the process.

---

## Scope

This policy applies to security vulnerabilities within the `@cmu-sei/sei-design-system` library code and its published artifacts.

The following are generally **out of scope**:

- Vulnerabilities in third-party dependencies not introduced by this library (report those upstream).
- Theoretical vulnerabilities without a practical attack vector.
- Automated scanner output without supporting evidence of exploitability.
