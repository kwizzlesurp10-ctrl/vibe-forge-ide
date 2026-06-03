# Frontend Security Notes

## Known Vulnerability

**PostCSS XSS (Moderate)**

- **Package**: `postcss` (transitive via `next`)
- **Severity**: Moderate
- **Advisory**: GHSA-qx2v-qp2m-jg93
- **Status**: Transitive dependency from Next.js 15.x

This is a known issue in the current Next.js ecosystem. We are tracking upstream fixes from the Next.js team.

**Mitigation**: The vulnerability requires a malicious CSS input. Risk is considered low for this application.

**Action**: Will upgrade Next.js as soon as a patched version is released that resolves the postcss dependency.