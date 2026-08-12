# DDB research landing page

Marketing and project landing page for [DDB: Source-Level Interactive Debugging for Distributed Applications](https://arxiv.org/abs/2607.06107).

The page is intentionally grounded in the paper, the [DDB implementation](https://github.com/USC-NSL-DDB/DDB), and the [project documentation](https://usc-nsl.gitbook.io/ddb). Evaluation numbers are labeled as paper results, and current prototype constraints are presented explicitly.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The development server opens at `http://localhost:3000`.

## Verification

```bash
npm test
npm run lint
```

To produce the GitHub Pages bundle locally:

```bash
BASE_PATH=/ddb-landing/ \
NEXT_PUBLIC_SITE_URL=https://usc-nsl-ddb.github.io/ddb-landing/ \
npm run build:pages
```

The static output is written to `out/`.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys every push to `main` using GitHub's official Pages actions. In the GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The workflow derives the project subpath and public URL from the repository name and owner, so forks deploy without source changes. If the site later moves to a custom domain, set `NEXT_PUBLIC_SITE_URL` to that canonical origin in the workflow.

## Content sources and maintenance

- Paper: <https://arxiv.org/abs/2607.06107>
- Documentation: <https://usc-nsl.gitbook.io/ddb>
- Implementation: <https://github.com/USC-NSL-DDB/DDB>
- Product image: Figure 3 from the authors' DDB paper, cropped for web presentation
- Project logo: official DDB GitHub organization avatar supplied by the project author

When updating a claim, include its paper section, documentation page, or implementation reference in the commit message or pull request description. Avoid presenting planned work as implemented capability.

## Social preview

`public/og.png` is the Open Graph card used for link unfurls. The canonical URL defaults to `https://usc-nsl-ddb.github.io/ddb-landing/` during local builds and is supplied automatically by the deployment workflow.
